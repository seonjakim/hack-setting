import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import { eventMockData } from "../store/mockdata";
import styled from "@emotion/styled";
import { useState } from "react";
import dropdown from "../assets/svg/dropdown.svg";

const Event = () => {
  const slideMenu = [
    { id: 0, title: "전체" },
    { id: 1, title: "생일카페" },
    { id: 3, title: "단체관람" },
    { id: 4, title: "커뮤니티" },
    { id: 5, title: "서포트" },
  ];
  const [currentMenuId, setCurrentMenuId] = useState(0);

  const onClickMenuHandler = (id) => {
    console.log(id);
  };

  if (!eventMockData) return;

  return (
    <Layout>
      <SlideMenuWrapper>
        {slideMenu.map((menu) => (
          <TitleWrapper>
            <MenuTitle
              primary={currentMenuId === menu.id}
              onClick={() => onClickMenuHandler(menu.id)}
              key={menu.id}
            >
              {menu.title}
            </MenuTitle>
          </TitleWrapper>
        ))}
      </SlideMenuWrapper>

      <FilterWrapper>
        <FilterTitle>최신순</FilterTitle>
        <img src={dropdown} alt="drop down" />
      </FilterWrapper>

      {currentMenuId === 0 && (
        <EventContainer>
          {eventMockData.map((event) => (
            <EventCard event={event} key={event.eventId} />
          ))}
        </EventContainer>
      )}
    </Layout>
  );
};

const SlideMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #ececec;
  overflow: scroll;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  min-width: 80px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuTitle = styled.button`
  font-size: 15px;
  font-weight: 500;
  padding: 12px;
  color: ${(props) => (props.primary ? "#121212" : "#9b9b9b")};
  ${(props) => props.primary && "border-bottom: 2px solid #121212;"};
`;

const FilterWrapper = styled.div`
  background-color: white;
  height: 48px;
  display: flex;
  padding: 0 16px;
  gap: 6px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
`;

const EventContainer = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #f2f2f2;
`;

export default Event;
