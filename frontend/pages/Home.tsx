import Layout from "../components/Layout";
import { Button } from "@chakra-ui/react";
type Props = {
  isSignedIn: boolean;
  wallet: any;
};
const Home = ({ isSignedIn, wallet }: Props) => {
  return (
    <Layout buttonText="포토카드 받기">
      {isSignedIn ? (
        `반가워요! ${wallet.accountId}`
      ) : (
        <Button onClick={() => wallet.signIn()}>로그인하기</Button>
      )}
    </Layout>
  );
};

export default Home;
