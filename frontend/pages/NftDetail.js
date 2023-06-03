import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Image, Heading, Box, Skeleton, Flex } from "@chakra-ui/react";
import UserIcon from "../assets/user.svg";
import CalendarIcon from "../assets/calendar.svg";
import LocationIcon from "../assets/location.svg";

const NftDetail = () => {
  const [nftInfo, setNftInfo] = useState(null);
  const { id } = useParams();

  const getNftDetail = async (tries) => {
    // error state 정의해줘야 함
    if (tries >= 2) return "Sorry for the error";
    const res = await window.contract.nftToken({
      token_id: id,
    });
    if (res === null) getNftDetail(tries++);
    setNftInfo(res);
  };

  useEffect(() => {
    getNftDetail(0);
  }, []);

  const mockData = {
    eventTitle: "new jeans debut 100 days",
    date: "23.05.25 - 23.05.31",
    address: "26, Yeongdong-daero 96-gil, Gangnam-gu, Seoul",
  };

  if (!nftInfo) return null;

  return (
    <Layout buttonText="목록으로 돌아가기">
      <Box
        display="grid"
        gap="24px"
        borderBottom="4px dotted #eee"
        padding="0 24px 24px 24px"
        justifyContent="center"
        width="100%"
      >
        <Heading as="h1" fontSize="34px" fontWeight="800">
          {mockData.eventTitle.toUpperCase()}
          <br />
          {nftInfo && `@Crytotraveler`}
        </Heading>
        <Image
          width="100%"
          src={nftInfo.metadata.media}
          alt={nftInfo.metadata.title}
        />
      </Box>
      <Box color="#CDCDCD" fontSize="15px" padding="24px">
        <Flex gap="8px">
          <img src={UserIcon} alt="user" />
          {`Owned by @Crytotraveler`}
        </Flex>
        <Flex gap="8px">
          <img src={CalendarIcon} alt="calendar" />
          {mockData.date}
        </Flex>
        <Flex gap="8px" alignItems="start">
          <Image paddingTop="4px" src={LocationIcon} alt="location" />
          {mockData.address}
        </Flex>
      </Box>
    </Layout>
  );
};

export default NftDetail;
