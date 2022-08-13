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
import _, { isEmpty } from "lodash";
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
import Link from "next/link";
import { MemePostsContext } from "../../../contexts/memePosts.context";

const INIT_FORM = "init";
const FINALIZE_FORM = "final";
const MODAL_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"];

const UploadModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const { fetchMemes } = useContext(MemePostsContext);
  const [readableImages, setReadableImages] = useState([]);
  const [isDataUploading, setIsDataUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formStep, setFormStep] = useState(INIT_FORM);
  const methods = useForm({
    defaultValues: {
      meme_images: [],
      description: "",
      meme_caption: "",
      meme_images_url: [],
      // title: "",
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
          (err) => {
            console.log(`err is `, err);
            reject(err);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve({ url: url, alt: file.name });
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
    setIsDataUploading(true);
    delete data.meme_images;
    delete user.profile;
    delete user.state;

    await axios
      .post("/api/upload-meme", { meme_data: data, user: user })
      .then((response) => {
        setIsDataUploading(false);
        if (response.data.success) {
          fetchMemes();
        }
      })
      .catch((error) => setIsDataUploading(false));

    onClose();
  };

  const handleFormStep = async () => {
    if (formStep === FINALIZE_FORM) {
      methods.handleSubmit(onSubmit)();
    }

    if (readableImages?.length) {
      setIsDataUploading(true);
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
      setIsDataUploading(false);

      if (uploadedUrls?.length) {
        methods.setValue("meme_images_url", uploadedUrls);
      }
    } else {
      setFormError("Select an image");
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
              {!isEmpty(user) ? (
                <>
                  <ModalHeader>
                    {formStep === INIT_FORM
                      ? "Upload Images (Step 1 / 2)"
                      : formStep === FINALIZE_FORM
                      ? "Add Details (Step 2 / 2)"
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
                  <ModalFooter gap={3}>
                    <Button
                      variant="ghost"
                      colorScheme="teal"
                      fontWeight={[500]}
                      fontSize={[14, 16]}
                      width={"50%"}
                      border="2px"
                      borderColor={"teal"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={handleFormStep}
                      type="submit"
                      width={"50%"}
                      colorScheme="teal"
                      fontWeight={[500]}
                      fontSize={[14, 16]}
                      isDisabled={isDataUploading}
                      loadingText={
                        !methods.watch("meme_images_url")?.length
                          ? "Uploading Images"
                          : "Publishing..."
                      }
                      isLoading={formStep === FINALIZE_FORM && isDataUploading}
                    >
                      {formStep === INIT_FORM ? "Next" : "Finish"}
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader>Add an account before proceeding.</ModalHeader>
                  <ModalCloseButton />
                  <ModalFooter gap={3}>
                    <Link href="/login">
                      <Button
                        border="2px"
                        borderColor={"teal"}
                        variant="ghost"
                        color={"teal"}
                        width={"50%"}
                        fontWeight={[500]}
                        fontSize={[14, 16]}
                      >
                        LOG IN
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button
                        fontWeight={[500]}
                        fontSize={[14, 16]}
                        colorScheme="teal"
                        width={"50%"}
                      >
                        SIGN UP
                      </Button>
                    </Link>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </FormProvider>
    </>
  );
};

export default UploadModal;
