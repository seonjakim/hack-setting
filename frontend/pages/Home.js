import { Button, Image, Flex, Box } from "@chakra-ui/react";
import { cards } from "../constants/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import loadingAnimation from "../assets/svg/loading.svg";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState(cards.minji);
  const [keyformClicked, setKeyformClicked] = useState();
  const [eventInfo, setEventInfo] = useState(null);
  const tokenId = eventInfo
    ? `${eventInfo.eventTitle}#${window.wallet.accountId}`
    : `${window.wallet.accountId}-${"1"}`;

  const directToGallery = async () => {
    const createdToken = await window.contract.nftToken({
      token_id: tokenId,
    });
    if (createdToken !== null) {
      navigate("/gallery");
    }
  };

  const getEventApiHandler = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `http://13.209.1.174:80/api/event/by-id/1/${window.wallet.accountId}`
      );
      if (res.status === 200) {
        setEventInfo(res.data.data);
        setCardImageUrl(
          `https://nftstorage.link/ipfs/${res.data.data.nftImageCid}`
        );
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getEventApiHandler();
  }, []);
  useEffect(() => {
    directToGallery();
  }, [eventInfo]);

  const photoCardMint = async () => {
    setIsLoading(true);
    const nftMetadata = {
      token_id: tokenId,
      metadata: {
        title: `${eventInfo.eventTitle}#${eventInfo.count}`,
        description: "HAPPY BIRTHDAY!",
        media: `https://nftstorage.link/ipfs/${eventInfo.nftImageCid}`,
      },
      receiver_id: window.wallet.accountId,
    };

    const result = await window.contract.mintNFT(nftMetadata);
    console.log("NFT result", result);
    if (result) {
      setIsLoading(false);
      directToGallery();
    }
  };

  if (!window.isSignedIn) {
    const onClickKeypomHander = () => {
      navigate(
        "/#v2.keypom.testnet/67UgmoYdkxT9TRZHP98zUgKi6CBrT57cT3hhy3gb2o24dFjWYsEPySGr8tY5pHggvpqf5mNJNPnK1TARQoyH3mmx"
      );
      window.location.reload();
      keyformClicked = true;
      setKeyformClicked(true);
    };

    return (
      <Flex
        flexDirection="column"
        padding="0 24px"
        gap="60px"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box width="100%">
          <Image width="100%" src={cardImageUrl} alt="Minji Birthday" />
        </Box>

        <Button
          backgroundColor="#121212"
          color="white"
          width="100%"
          height="60px"
          borderRadius="60px"
          fontSize="16px"
          fontWeight="700"
          visibility={keyformClicked && "hidden"}
          onClick={onClickKeypomHander}
        >
          계정 만들고 포토카드 받기
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      padding="0 24px"
      gap="60px"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Image width="100%" src={cardImageUrl} alt="Minji Birthday" />

      <Button
        backgroundColor="#121212"
        color="white"
        width="100%"
        height="60px"
        borderRadius="60px"
        fontSize="16px"
        fontWeight="700"
        onClick={photoCardMint}
        isDisabled={isLoading}
      >
        {isLoading ? (
          <img src={loadingAnimation} alt="loading" />
        ) : (
          "포토카드 받기"
        )}
      </Button>
    </Flex>
  );
};

export default Home;
