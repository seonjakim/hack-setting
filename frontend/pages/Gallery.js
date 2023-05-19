import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Image, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  const [nftList, setNftList] = useState([]);
  useEffect(() => {
    window.contract
      .nftTokensForOwner({
        accountId: window.wallet.accountId,
        fromIndex: 0,
        limit: 10,
      })
      .then((res) => setNftList(res));
  }, []);
  return (
    <Layout>
      <Box display="grid" gap="16px">
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
