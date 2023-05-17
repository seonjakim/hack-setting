import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import { Contract } from "./near-interface";
import { Wallet } from "./near-wallet";
const wallet = new Wallet({
  createAccessKeyFor: "nft-frontend-simple-mint.blockhead.testnet",
});

// Abstract the logic of interacting with the contract to simplify your project
const contract = new Contract({
  contractId: "nft-frontend-simple-mint.blockhead.testnet",
  walletToUse: wallet,
});

// React Bootstrap css
// import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports

// Custom Components
// import MintingTool from "./Components/MintingTool";
// import InfoBubble from "./Components/InfoBubble";

// assets
import Logo from "./assets/logo-white.svg";
const BN = require("bn.js");

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);

  // useEffect(() => {
  //   const receivedNFT = async () => {
  //     console.log(
  //       await window.contract.check_token({
  //         id: `${window.accountId}-go-team-token`,
  //       })
  //     );
  //     if (window.accountId !== "") {
  //       console.log(
  //         await window.contract.check_token({
  //           id: `${window.accountId}-go-team-token`,
  //         })
  //       );

  //       setuserHasNFT(
  //         await window.contract.check_token({
  //           id: `${window.accountId}-go-team-token`,
  //         })
  //       );
  //     }
  //   };
  //   receivedNFT();
  // }, []);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const test = async () => {
    const res = await wallet.startUp();
    console.log("res", res);
    return res;
  };
  useEffect(() => {
    setIsSignedIn(test());
  }, []);

  console.log("window", window);
  const mintNFT = async () => {
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-go-team-test-test`,
        metadata: {
          title: "My Non Fungible Team Token",
          description: "The Team Most Certainly Goes :)",
          media:
            "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );
  };
  return (
    <React.Fragment>
      {" "}
      <div>
        <span href="#home">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          NEAR Protocol
        </span>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        {/* <Nav className="me-auto"></Nav> */}
        <div>
          <button onClick={() => wallet.signIn()}>
            {isSignedIn ? wallet.accountId : "Login"}
            버튼
          </button>{" "}
        </div>
        {/* </Navbar.Collapse> */}
      </div>
      <div style={{ marginTop: "3vh" }}>
        {" "}
        <div>
          <p>
            Hello! We are going to mint an NFT and have it appear in your
            wallet! Sign in, mint your nft and head over to{" "}
            <a href="https://wallet.testnet.near.org/">
              wallet.testnet.near.org
            </a>{" "}
            to see your new "Go Team" NFT!
          </p>
        </div>
        <div style={{ marginTop: "3vh" }}>
          {/* <MintingTool userNFTStatus={userHasNFT} /> */}
          <button onClick={() => contract.mintNFT()}>mintNfT</button>
        </div>
      </div>
    </React.Fragment>
  );
}
