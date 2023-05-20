import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Image, Box, Select, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ChevronBottomIcon from "../assets/chevron-bottom.svg";
import TwoColumnListIcon from "../assets/two-column-list.svg";
import OneColumnListIcon from "../assets/one-column-list.svg";
const Gallery = () => {
  const navigate = useNavigate();
  const [nftList, setNftList] = useState([]);
  const [isOneColumnView, setIsOneColumnView] = useState(false);
  useEffect(() => {
    window.contract
      .nftTokensForOwner({
        accountId: window.wallet.accountId,
        fromIndex: 0,
        limit: 10,
      })
      .then((res) => setNftList(res));
  }, []);
  // TODO:
  // metatransaction
  // create account
  // https://awesomenear.com/keypom

  return (
    <Layout>
      <Box height="48px">
        <Flex
          justifyContent="space-between"
          position="fixed"
          width="100%"
          height="48px"
          top="60px"
          backgroundColor="#fff"
          padding="0 20px 0 0"
        >
          <Flex>
            <Button
              onClick={() => setIsOneColumnView((prev) => !prev)}
              backgroundColor="transparent"
              colorScheme="transparent"
              padding="0 8px"
            >
              {isOneColumnView ? (
                <Image src={TwoColumnListIcon} />
              ) : (
                <Image src={OneColumnListIcon} />
              )}
            </Button>
          </Flex>
          <Select
            fontSize="14px"
            fontWeight="400"
            width="fit-content"
            border="none"
          >
            <option>최신순</option>
          </Select>
        </Flex>
      </Box>
      <Box
        display="grid"
        gap="16px"
        gridTemplateColumns={isOneColumnView ? "1fr" : "1fr 1fr"}
      >
        {nftList.reverse().map((nft) => (
          <div
            key={nft.token_id}
            onClick={() => navigate(`/gallery/${nft.token_id}`)}
          >
            <Image
              width="100%"
              src={nft.metadata.media}
              alt={nft.metadata.title}
            />
          </div>
        ))}
      </Box>
    </Layout>
  );
};

export default Gallery;
