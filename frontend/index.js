import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import { ChakraProvider } from "@chakra-ui/react";
import { Contract } from "./near-interface";
import { Wallet } from "./near-wallet";
import Gallery from "./pages/Gallery";
import NftDetail from "./pages/NftDetail";
const wallet = new Wallet({
  createAccessKeyFor: "nft_test_front.testnet",
});

// Abstract the logic of interacting with the contract to simplify your project
const contract = new Contract({
  contractId: "nft_test_front.testnet",
  walletToUse: wallet,
});

const theme = {
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
      },
      button: {
        "_active, _hover": {
          background: "inherit",
        },
      },
    },
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

const root = createRoot(document.getElementById("root"));
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  window.wallet = wallet;
  window.contract = contract;
  window.isSignedIn = isSignedIn;
  root.render(
    <BrowserRouter basename="https://seonjakim.github.io/pokatika/">
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<NftDetail />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};
