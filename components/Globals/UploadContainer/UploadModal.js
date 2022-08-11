import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import React, { useCallback, useContext, useEffect, useState } from "react";
import _ from "lodash";
import MemeUploadIntStep from "./MemeUploadIntStep";
import MemeUploadFinalStep from "./MemeUploadFinalStep";
import imageCompression from "browser-image-compression";
import {
  getDownloadURL,
  ref as storageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../helpers/firebase/config";
import axios from "axios";
import { UserContext } from "../../../contexts/user.context";

const INIT_FORM = "init";
const FINALIZE_FORM = "final";
const MODAL_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"];

const UploadModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const [readableImages, setReadableImages] = useState([]);
  const [formError, setFormError] = useState("");
  const [formStep, setFormStep] = useState(INIT_FORM);
  const methods = useForm({
    defaultValues: {
      meme_images: [],
      desciption: "",
      title: "",
    },
  });

  const meme_images = useWatch({
    control: methods.control,
    name: "meme_images",
  });

  useEffect(() => {
    if (meme_images.length >= 0) {
      let images = [];
      for (const meme_image of meme_images) {
        images.push({
          imageUrl: URL.createObjectURL(meme_image),
          name: meme_image.name,
          size: meme_image.size,
          type: meme_image.type,
          id: _.uniqueId(),
        });
      }
      setReadableImages(images);
    }

    return function cleanup() {
      setFormStep(INIT_FORM);
    };
  }, [meme_images]);

  const uploadFile = useCallback((file) => {
    return new Promise(async (resolve, reject) => {
      if (!file) reject();

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1080,
        // 1920
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);

        const storageRef = storageReference(
          storage,
          `meme-images/${compressedFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on(
          "state_changed",
          (snap_shot) => {},
          (err) => reject(err),
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url);
            });
          }
        );

        // await uploadToServer(compressedFile); // write your own logic
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const handleImageDeletion = (selectedImage) => {
    const filteredList = readableImages.filter(
      (image) => selectedImage.id !== image.id
    );

    setReadableImages(filteredList);
    // methods.setValue("meme_images", filteredList);
  };

  const onSubmit = async (data) => {
    delete data.meme_images;
    delete user.profile;
    delete user.display_name;
    delete user.state;

    await axios.post("/api/upload-meme", { meme_data: data, user: user });

    onClose();
  };

  const handleFormStep = async () => {
    if (readableImages?.length) {
      setFormStep(FINALIZE_FORM);

      let allPromises = [];

      if (readableImages?.length) {
        for (const meme_image of meme_images) {
          for (const image of readableImages) {
            if (
              meme_image.size === image.size &&
              image.name === meme_image.name
            ) {
              allPromises.push(uploadFile(meme_image));
            }
          }
        }
      }

      const uploadedUrls = await Promise.all(allPromises);

      if (uploadedUrls?.length) {
        methods.setValue("meme_images_url", uploadedUrls);
      }
    } else {
      setFormError("Select an image");
    }

    if (formStep === FINALIZE_FORM) {
      methods.handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={MODAL_SIZES}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {formStep === INIT_FORM
                  ? "Upload Images"
                  : formStep === FINALIZE_FORM
                  ? "Add Details"
                  : null}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {formStep === INIT_FORM ? (
                  <MemeUploadIntStep
                    readableImages={readableImages}
                    handleImageDeletion={handleImageDeletion}
                  />
                ) : formStep === FINALIZE_FORM ? (
                  <MemeUploadFinalStep />
                ) : null}
                {/* <Box mt={4}></Box>
                  <Progress
                    hasStripe
                    value={
                      formStep === INIT_FORM
                        ? 50
                        : formStep === FINALIZE_FORM
                        ? 100
                        : 0
                    }
                    transition="all"
                    transitionDelay={"40000ms"}
                    isAnimated
                  /> */}
                {!readableImages?.length && formError ? (
                  <Text
                    align={"center"}
                    textTransform="uppercase"
                    fontSize={14}
                    color="red.300"
                  >
                    {formError}
                  </Text>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  mr={3}
                  width={"50%"}
                  border="2px"
                  borderColor={"teal"}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  onClick={handleFormStep}
                  // onClick={methods.handleSubmit(onSubmit)}
                  type="submit"
                  width={"50%"}
                  colorScheme="teal"
                >
                  {formStep === INIT_FORM ? "Next" : "Finish"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      </FormProvider>
    </>
  );
};

export default UploadModal;
