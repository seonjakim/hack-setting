import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import { useParams } from "react-router-dom";
import { eventMockData } from "../store/mockdata";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const EventDetail = () => {
  const { id } = useParams();

  const [currentMenuId, setCurrentMenuId] = useState(0);

  const eventData = eventMockData.filter(
    (event) => event.eventId === Number(id)
  )[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout hideBottomMenu={true}>
      <Container>
        <EventCard event={eventData} />
        <DescrptionContainer>
          <DesTitleWrapper>
            <Title primary={currentMenuId === 0}>상세정보</Title>
            <Title primary={currentMenuId === 1}>공지사항</Title>
          </DesTitleWrapper>
          {eventData.detailData.desImg.map((imgLink, idx) => (
            <img src={imgLink} key={idx} alt="des img"></img>
          ))}
        </DescrptionContainer>
      </Container>
      <ApplyButton>이벤트 신청하기</ApplyButton>
    </Layout>
  );
};

const Container = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescrptionContainer = styled.div`
  margin-top: 16px;
`;

const DesTitleWrapper = styled.div`
  width: 100%;
  height: 48px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  height: 100%;
  min-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => (props.primary ? "#121212" : "#9b9b9b")};
  ${(props) => props.primary && "border-bottom: 2px solid #121212;"};
`;

const ApplyButton = styled.button`
  position: fixed;
  width: 343px;
  height: 60px;
  left: calc(50% - 343px / 2);
  bottom: 16px;
  background: #121212;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;

export default EventDetail;
