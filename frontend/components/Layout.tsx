import { ReactNode } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import HamburgerIcon from "../assets/menu.svg";
import ListIcon from "../assets/list.svg";
import { Flex, Box } from "@chakra-ui/react";
type Props = {
  children: ReactNode;
  type?: string;
  buttonText?: string;
};
const Layout = ({ type = "default", children, buttonText }: Props) => {
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        {/* <HamburgerIcon /> */}
        <Button padding="32px 24px" backgroundColor="transparent">
          <img src={HamburgerIcon} alt="menu" />
        </Button>
        <span>collection</span>
        <Button padding="32px 24px" backgroundColor="transparent">
          <img src={ListIcon} alt="list" />
        </Button>
      </Flex>
      <Box padding=" 16px">{children}</Box>
      {buttonText && (
        <Button
          position="fixed"
          bottom="56px"
          width="80%"
          left="50%"
          transform="translateX(-50%)"
          borderRadius="60px"
          backgroundColor="#1B1B1B"
          color="white"
          height="60px"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Layout;
