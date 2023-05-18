/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from "near-api-js";
const BN = require("bn.js");

export class Contract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async checkToken() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_beneficiary",
    });
  }

  async latestDonations() {
    const number_of_donors = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "number_of_donors",
    });
    const min = number_of_donors > 10 ? number_of_donors - 9 : 0;

    let donations = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_donations",
      args: { from_index: min.toString(), limit: number_of_donors },
    });

    donations.forEach((elem) => {
      elem.total_amount = utils.format.formatNearAmount(elem.total_amount);
    });

    return donations;
  }

  async getDonationFromTransaction(txhash) {
    let donation_amount = await this.wallet.getTransactionResult(txhash);
    return utils.format.formatNearAmount(donation_amount);
  }

  async mintNFT() {
    const options = {
      token_id: `${this.contractId}-go-ahead-1`,
      metadata: {
        title: "please",
        description: "Tplease work",
        media:
          "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      },
      receiver_id: this.wallet.accountId,
    };
    // let deposit = utils.format.parseNearAmount(amount.toString());
    let deposit = utils.format.parseNearAmount("1");

    let response = await this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_mint",
      args: options,
      deposit,
    });
    return response;
  }
}
