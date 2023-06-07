import { useEffect } from "react";
import axios from "axios";

const Init = () => {
  const getKeyponAccount = async () => {
    const res = await axios.get("http://localhost:3000/");
    if (res.status == 200) {
      window.open(res.data.result, "_self");
    }
  };

  useEffect(() => {
    getKeyponAccount();
  }, []);
  return <div>주소 계정을 생성 중입니다. 잠시만 기다려주세요.</div>;
};

export default Init;
