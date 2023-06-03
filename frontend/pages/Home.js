import { Button, Image, Flex, Box } from "@chakra-ui/react";
import { cards } from "../constants/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

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

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["test1"],
    queryFn: () =>
      axios
        .get("http://13.209.1.174:80/api/event/by-wallet/12345abcde") // 민팅전 정보 가져오기
        .then((res) => res.data),
    options: {
      refetchInterval: false,
    },
  });

  useEffect(() => {
    console.log("isLoading", isLoading, "isSuccess", isSuccess);
    console.log(data);
  }, [isLoading, isSuccess]);

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
