import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { isEmpty } from "lodash";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const bg = useColorModeValue("#fff", "#000");
  return (
    <ChevronRightIcon
      onClick={onClick}
      bg={bg}
      borderRadius="full"
      shadow="2xl"
      h={5}
      w={5}
      cursor="pointer"
      style={{
        position: "absolute",
        top: "50%",
        right: "-2%",
        transform: `translateY(-50%)`,
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  const bg = useColorModeValue("#fff", "#000");

  return (
    <ChevronLeftIcon
      onClick={onClick}
      bg={bg}
      borderRadius="full"
      shadow="2xl"
      h={5}
      w={5}
      cursor="pointer"
      style={{
        position: "absolute",
        top: "50%",
        left: "-1%",
        transform: `translateY(-50%)`,
        zIndex: "1000",
      }}
    />
  );
}

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export const toggleLikeAction = (meme, user) => {
  const action = "like";
  if (meme?.liked_by?.length) {
    const isLikeExists = meme.liked_by.find(
      (item) => item.auth_id === user.auth_id
    );

    if (!isEmpty(isLikeExists)) {
      return { action: "unlike" };
    } else {
      return { action: "like" };
    }
  }

  return { action: action };
};
