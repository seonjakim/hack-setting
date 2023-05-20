import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from "react";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import HamburgerIcon from "../assets/menu-white.svg";
import BookOpenIcon from "../assets/book-open.svg";
import GiftIcon from "../assets/gift.svg";
import UsersWhiteIcon from "../assets/users-white.svg";
import EmptyAvartaIcon from "../assets/empty-avarta.png";
import ChevronLeftIcon from "../assets/chevron-left.svg";
import { Flex, Box, Image, UnorderedList, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../assets/logo.png";
import SearchIcon from "../assets/search.svg";
import BellIcon from "../assets/bell.svg";
import CloseIcon from "../assets/close.svg";
import { MENU_LIST } from "../constants";

const MenuButton = ({
  isOpen = false,
  buttonText = "이벤트",
  imgSrc = GiftIcon,
  clickEvent,
}) => {
  return (
    <Button
      backgroundColor="#224FC3"
      borderRadius="50%"
      height={isOpen ? "65px" : "100%"}
      width="70px"
      display="flex"
      flexDirection="column"
      gap="4px"
      color="#fff"
      fontSize="12px"
      fontWeight="500"
      onClick={clickEvent}
    >
      <Image src={imgSrc} alt="event" />
      {isOpen && <span>{buttonText}</span>}
    </Button>
  );
};

const MenuList = ({ title = "", list = [], setIsOpen }) => {
  const navigate = useNavigate();
  const listClickHandler = (link) => {
    if (link === undefined) return;
    navigate(link);
    setIsOpen((prev) => !prev);
  };
  return (
    <Flex
      flexDirection="column"
      fontSize="13px"
      color="#898989"
      gap="16px"
      padding="24px"
      fontWeight="500"
    >
      {title}
      <UnorderedList
        fontSize="18px"
        fontWeight="700"
        color="#000"
        listStyleType="none"
        margin="0"
        display="grid"
        gap="16px"
      >
        {list.map((menu) => (
          <ListItem
            onClick={() => listClickHandler(menu.link)}
            key={menu.title}
          >
            {menu.title}
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
};
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentPath = (path) => {
    return window.location.pathname.indexOf(path) !== -1;
  };
  return (
    <div>
      <Box height="60px">
        <Flex
          position="fixed"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="#fff"
          height="60px"
          padding="0 16px"
        >
          <Button
            backgroundColor="transparent"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={LogoIcon} alt="logo" />
          </Button>
          <Flex gap="8px">
            <Button backgroundColor="transparent">
              <Image src={SearchIcon} alt="search icon" />
            </Button>
            <Button backgroundColor="transparent">
              <Image src={BellIcon} alt="bell icon" />
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box padding="0 0 100px">{children}</Box>
      <Box
        position="fixed"
        bottom="16px"
        left="50%"
        transform="translateX(-50%)"
        backgroundColor="#224FC3"
        height="60px"
        width="343px"
        borderRadius="20px"
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        padding="0 24px"
      >
        <MenuButton isOpen={false} imgSrc={GiftIcon} buttonText="이벤트" />
        <MenuButton
          isOpen={isCurrentPath("gallery")}
          imgSrc={BookOpenIcon}
          buttonText="내 컬렉션"
        />
        <MenuButton
          isOpen={false}
          imgSrc={UsersWhiteIcon}
          buttonText="커뮤니티"
        />
        <MenuButton
          isOpen={isOpen}
          imgSrc={HamburgerIcon}
          buttonText="메뉴"
          clickEvent={() => setIsOpen(() => true)}
        />
      </Box>
      <Box
        width="100vw"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.4)"
        position="fixed"
        top={isOpen ? "0" : "100%"}
        transition="all 0.4s ease-out"
      >
        <Box
          width="100vw"
          height="calc(100% - 60px)"
          backgroundColor="#fff"
          position="absolute"
          bottom="0"
          overflow="auto"
          transitionDelay="1s"
          borderRadius="12px 12px 0 0"
        >
          <Image
            display={isOpen ? "block" : "none"}
            position="fixed"
            right="24px"
            top="84px"
            src={CloseIcon}
            alt="close"
            onClick={() => setIsOpen(() => false)}
          />
          <Flex
            flexDirection="column"
            alignItems="center"
            gap="16px"
            padding="54px 0"
            backgroundColor="#f8faff"
          >
            <Image src={EmptyAvartaIcon} alt="empty avarta" />
            <Button
              height="fit-content"
              display="flex"
              gap="4px"
              backgroundColor="transparent"
              fontSize="16px"
              fontWeight="510"
            >
              @Crytotraveler
              <Image src={ChevronLeftIcon} />
            </Button>
            <Button
              fontSize="14px"
              color="#898989"
              height="fit-content"
              padding="4px 8px"
              backgroundColor="#f2f2f2"
            >
              {window.wallet.accountId}
            </Button>
          </Flex>
          <Box>
            <MenuList
              title="활동하기"
              list={MENU_LIST["활동하기"]}
              setIsOpen={setIsOpen}
            />
            <MenuList
              title="관리하기"
              list={MENU_LIST["관리하기"]}
              setIsOpen={setIsOpen}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
