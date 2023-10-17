import axios from 'axios';
import * as nearAPI from "near-api-js";
import { configNear } from "@/services/nearConfig";
import localStorageUser from '~/services/local-storage-user';
const { connect, keyStores, KeyPair, utils } = nearAPI;


function executeQueryRpc(_method, _params) {
  const json = {
    "jsonrpc": "2.0",
    "id": "dontcare",
    "method": _method,
    "params": _params
  };

  console.log("params rpc: ", json);

  return axios.post(process.env.ROUTER_RPC,
    json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
}

async function getBalance() {
  let balance = 0
  const privateKey = localStorage.getItem("privateKey");

  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY = privateKey;
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey(process.env.Network, localStorageUser.getCurrentAccount().address, keyPair);
  
  const nearConnection = await connect(configNear(myKeyStore));
  const account = await nearConnection.account(localStorageUser.getCurrentAccount().address);

  const result = await account.getAccountBalance();

  balance = Number(utils.format.formatNearAmount(result.available));
  
  return axios.post(process.env.URL_APIP_PRICE,
    {fiat: "USD", crypto: "NEAR"})
  .then((response) => {
    const balanceNear = isNaN(balance) ? 0 : balance
    const balanceUsd = (balanceNear * response.data[0].value).toFixed(2)

    return { near: balanceNear, usd: balanceUsd, price: response.data[0].value }

  }).catch((error) => {
    return error
  })


}

export default {
  executeQueryRpc,
  getBalance,
}