// // React
// import { createRoot } from 'react-dom/client';
// import App from './App';

// // NEAR
// import { Wallet } from './near-wallet';

// const CONTRACT_ADDRESS = process.env.CONTRACT_NAME

// // When creating the wallet you can optionally ask to create an access key
// // Having the key enables to call non-payable methods without interrupting the user to sign
// const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript

// // Setup on page load
// window.onload = async () => {
//   const isSignedIn = await wallet.startUp()

//   root.render(
//     <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />
//   );
// }

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import { ChakraProvider } from "@chakra-ui/react";
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

const root = createRoot(document.getElementById("root"));
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  root.render(
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route
            path="/"
            element={<Home isSignedIn={isSignedIn} wallet={wallet} />}
          />
          <Route path="/event" element={<Event />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};
