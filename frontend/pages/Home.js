import Layout from "../components/Layout";
import { Button } from "@chakra-ui/react";
import { cards } from "../constants/index";
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  const tokenId = `${window.wallet.accountId}-delight`;

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
      title: "Happy B-day Minji",
      description: "Thank you for visiting",
      media: cards.delight,
    },
    receiver_id: window.wallet.accountId,
  };
  const test = async () => {
    console.log(
      "hello",
      await window.contract.nftToken({
        token_id: tokenId,
      })
    );
  };
  test();
  const phtoCardMint = async () => {
    const mintRes = await window.contract.mintNFT(nftMetadata);
    console.log("mintRes", mintRes);
  };
  return (
    <Layout buttonText="포토카드 받기" buttonClickEvent={phtoCardMint}>
      {isSignedIn ? (
        `반가워요! ${window.wallet.accountId}`
      ) : (
        <Button onClick={() => window.wallet.signIn()}>로그인하기</Button>
      )}

      <Image width="100%" src={cards.delight} alt="Minji Birthday" />
    </Layout>
  );
};

export default Home;
