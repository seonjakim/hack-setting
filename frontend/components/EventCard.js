import styled from "@emotion/styled";
import BookmarkIcon from "../assets/svg/bookmark_fill.svg";
import BookmarkIconEmpty from "../assets/svg/bookmark_empty.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EventCard = ({ event }) => {
  const { eventTitle, eventImage, date, address, bookmark, eventId } = event;
  const navigate = useNavigate();
  // TODO: use server data
  const [isBookmarked, setIsBookmarked] = useState(bookmark);

  if (!event) return;

  const onClickEventCardHandler = (id, e) => {
    if (!id && id !== 0) return;
    navigate(`/event/${id}`);
  };

  const onClickBookmarkHandler = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <CardContainer onClick={() => onClickEventCardHandler(eventId)}>
      <EventImage src={eventImage} alt={eventTitle} />
      <ContentContainer>
        <EventContent>
          <Title>{eventTitle}</Title>
          <Date>{date}</Date>
          <Address>{address}</Address>
        </EventContent>
        <BookmarkWrapper onClick={onClickBookmarkHandler}>
          <img
            src={isBookmarked ? BookmarkIcon : BookmarkIconEmpty}
            alt="bookmark"
          />
        </BookmarkWrapper>
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  // TODO: change px to rem or em
  width: 343px;
  height: 296px;
  background-color: white;
  border-radius: 10px;
`;

const EventImage = styled.img`
  width: 100%;
  // TODO: change px to rem or em
  height: 200px;
  border-radius: 10px 10px 0px 0px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
`;

const EventContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const Date = styled.div`
  font-family: "SF Pro";
  font-weight: 400;
  font-size: 13px;
  color: #898989;
`;
const Address = styled.div`
  font-weight: 400;
  font-size: 13px;
  color: #898989;
`;

const BookmarkWrapper = styled.div`
  padding: 3px 5px 0 0;
`;

export default EventCard;
