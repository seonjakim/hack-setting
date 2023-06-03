import { Button, Image, Flex, Box } from "@chakra-ui/react";
import { cards } from "../constants/index";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import loadingAnimation from "../assets/svg/loading.svg";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState(cards.minji);
  const [keyformClicked, setKeyformClicked] = useState();

  const tokenId = `${window.wallet.accountId}-${"1"}`;

  const directToGallery = async () => {
    const createdToken = await window.contract.nftToken({
      token_id: tokenId,
    });
    console.log("success", createdToken);
    if (createdToken !== null) {
      navigate("/gallery");
    }
  };

  useEffect(() => {
    directToGallery();
  }, []);

  const photoCardMint = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `http://13.209.1.174:80/api/event/by-id/${1}/${window.wallet.accountId}`
    );

    console.log(res.data.data);

    setCardImageUrl(
      `https://nftstorage.link/ipfs/${res.data.data.nftImageCid}`
    );

    const nftMetadata = {
      token_id: tokenId,
      metadata: {
        title: "POKATIKA",
        description: "HAPPY BIRTHDAY!",
        media: `https://nftstorage.link/ipfs/${res.data.data.nftImageCid}`,
      },
      receiver_id: window.wallet.accountId,
    };

    const result = await window.contract.mintNFT(nftMetadata);

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
