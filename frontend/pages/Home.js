import { Button, Image, Flex, Box } from "@chakra-ui/react";
import { cards } from "../constants/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const tokenId = `${window.wallet.accountId}-${new Date()}`;

  const directToGallery = async () => {
    const createdToken = await window.contract.nftToken({
      token_id: tokenId,
    });
    if (createdToken !== null) {
      navigate("/gallery");
    }
  };

  useEffect(() => {
    directToGallery();
  }, []);

  const nftMetadata = {
    token_id: tokenId,
    metadata: {
      title: "POKATIKA",
      description: "HAPPY BIRTHDAY!",
      media: cards.minji,
    },
    receiver_id: window.wallet.accountId,
  };

  const photoCardMint = async () => {
    const mintRes = await window.contract.mintNFT(nftMetadata);
    console.log("mintRes", mintRes);
  };

  if (!window.isSignedIn) {
    return (
      <Flex
        flexDirection="column"
        padding="0 24px"
        gap="60px"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box width="100%" filter="blur(8px)">
          <Image width="100%" src={cards.minji} alt="Minji Birthday" />
        </Box>
        <Button
          backgroundColor="#121212"
          color="white"
          width="100%"
          height="60px"
          borderRadius="60px"
          fontSize="16px"
          fontWeight="700"
          onClick={() => window.wallet.signIn()}
        >
          월렛 연결하기
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
      <Image width="100%" src={cards.minji} alt="Minji Birthday" />
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
        포토카드 받기
      </Button>
    </Flex>
  );
};

export default Home;
