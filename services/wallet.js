import axios from 'axios';
import * as nearAPI from "near-api-js";
import Big from 'big.js';
import utils from './utils';
import { configNear } from "@/services/nearConfig";
import localStorageUser from '~/services/local-storage-user';
const { connect } = nearAPI;



const formatTokenAmount = (value, decimals = 18, precision = 2) => value && Big(value).div(Big(10).pow(decimals)).toFixed(precision);
const parseTokenAmount = (value, decimals = 18) => value && Big(value).times(Big(10).pow(decimals)).toFixed();

function shortenAddress(address) {
  const addresFinal = address === undefined ? "" : address.length > 25 ? address.substring(0,9)+"..."+address.substring((address.length - process.env.Network.length - 7), address.length) : address;
  return addresFinal
}

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

function getBalance(_address) {
  const address = !_address ? localStorageUser.getCurrentAccount().address : _address
  console.log("address: ", address)
  const params = {
    account_id: address,
    finality: "optimistic",
    request_type: "view_account"
  }
  return  utils.executeQueryRpc("query", params).then(async item => {
    const amount = item?.data?.result?.amount ? Number(item.data.result.amount) : 0;
    const storageUsage = item?.data?.result?.storage_usage ? Number(item.data.result.storage_usage) : 0;

    const balanceWallet = amount / 1000000000000000000000000;
    const reservedStorage = storageUsage / 100000;
    const reservedTransaction = amount !== 0 ? 0.05 : 0;
    const balanceAvalible = balanceWallet - reservedStorage - reservedTransaction;
    let _price = 0;

    await axios.post(process.env.URL_APIP_PRICE,
      {fiat: "USD", crypto: "NEAR"})
    .then((response) => {
      _price = Number(response.data[0].value);
    })

    return { 
      near: balanceAvalible,
      usd: balanceAvalible * _price,
      price: _price,
      wallet: balanceWallet,
      storage: reservedStorage,
      transaction: reservedTransaction
    }
    
    
  })
}

function getPrice(fiat, crypto) {
  const _fiat = !fiat ? "USD" : fiat;
  const _crypto = !crypto ? "NEAR" : crypto;
  
  return axios.post(process.env.URL_APIP_PRICE,
    {fiat: _fiat, crypto: _crypto})
  .then((response) => {
    return response.data[0].value

  }).catch((error) => {
    return error
  })
}

async function nearConnection() {
  const { address, privateKey } = localStorageUser.getCurrentAccount();

  const { keyStores, KeyPair } = nearAPI;
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY = privateKey;
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey(process.env.Network, address, keyPair);
  const nearConnection = await connect(configNear(myKeyStore));
  const account = await nearConnection.account(address);
  return account

  
}


export default {
  formatTokenAmount,
  parseTokenAmount,
  shortenAddress,
  executeQueryRpc,
  getBalance,
  getPrice,
  nearConnection,
}