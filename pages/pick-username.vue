<template>
  <v-form ref="form" v-model="valid">
  <div id="pick-username" class="divcol center">
    <Header
      ref="header"
      top-text="PICK A"
      bottom-text="USERNAME"
      description="THIS WILL BE YOUR LEGIBLE WALLET ADDRESS"
      max-width="283px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
      bottom-text-indent="1.6ch"
    />

    <section id="pick-username-content">
      <v-text-field
        v-model="accountNear"
        label="username / wallet" solo
        style="--margin-message: 1px"
        :error-messages="errorAccount"
        :success-messages="successAccount"
        :suffix="network"
        :rules="required"
        @keyup="verificarAccount(accountNear)"
      ></v-text-field>
      <p>The following wallet </p>
      <p> 
        <strong>{{ address.substring(0, 20) }} ... {{ address.substring(20, 37) }}</strong> 
        <v-btn
          class="btn-icon"
          style="--size: 35px"
          @click="fnCopie()"
          v-clipboard:copy="address"
        >
          <v-icon v-if="copie">mdi-check</v-icon>
          <img v-if="!copie" width="20px" src="@/assets/sources/icons/copy.svg" alt="copy to clipboard">
        </v-btn>
      </p>
      <p>must have <strong>0.5</strong> NEAR available, to be able to assign a name</p>
      <v-btn :loading="loading" class="btn" @click="onCreateName()">sign up</v-btn>
      <v-btn :loading="loading" class="btn-outlined mt-5" @click="onSignUp()">Skip</v-btn>

      <article class="btn-outlined">
        <img width="36px" src="@/assets/sources/icons/warning.svg" alt="warning icon">

        <p class="p">
          <span>NOTE:</span> Your username will serve as your wallet address, allowing seamless transfers with just a few keystrokes.
        </p>
      </article>
    </section>

    <Footer ref="footer">
      <template #content>
        <span class="text" style="--text: var(--text2)">NEED HELP? 
          <a style="--fw: 700" href="#" target="_blank">SUPPORT</a>
        </span>
      </template>
    </Footer>

  </div>
</v-form>
</template>

<script>

import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/nearConfig";
import { ALERT_TYPE } from '~/plugins/dictionary';
const { connect, keyStores, KeyPair, Account, Near } = nearAPI;
const { generateSeedPhrase } = require('near-seed-phrase');


export default {
  name: "PickUsernamePage",
  layout: "auth-layout",
  data() {
    return {
      valid:false,
      address: "",
      accountNear: null,
      required: [(v) => !!v || "Field required"],
      copie: false,
      errorAccount: null,
      successAccount: null,
      network: "",
      loading: false,
    }
  },
  head() {
    const title = 'Pick a username';
    return {
      title,
    }
  },
  mounted() {
    this.address = localStorage.getItem("address"); // this.$auth.$storage.getState("address") ?? " ";
    this.network = "."+process.env.Network
  },
  methods: {
    /* async pru(){
      await axios.get('https://testnet-api.kitwallet.app/publicKey/ed25519:3Q2hUgzX1XnPHVgeJkiLjkAqjocL94SFbSum99GamnZk/accounts', {
        headers: {
            'X-requestor': 'near'
          },
        },
      )
      .then((response) => {
        console.log("cuenta 1: ", response)
        console.log("cuenta 2: ", response.data)
        console.log("cuenta 3: ", response.data[0])
      }).catch((error) => {
        console.log("cuenta error: ", error)
      })
    }, */

    fnCopie() {
      this.copie = true;
      const timer = setInterval(() => {
        this.copie = false;
        clearInterval(timer)
      }, 1000*2);
      
    },
    onSignUp() {
      localStorage.setItem("auth", true)
      this.$router.push(this.localePath("/"))
    },
    async verificarAccount(value) {
      const accountInput = value + "." + process.env.Network;
      console.log(accountInput)

      const keyStore = new keyStores.InMemoryKeyStore()
      const near = new Near(CONFIG(keyStore))
      const account = new Account(near.connection, accountInput)
      
      let response = null
      await account.state()
          .then(() => {
            response = true
            this.successAccount = null
            this.errorAccount = "Account already exists"
          }).catch(() => {
            response = false
            this.successAccount = "This account is valid"
            this.errorAccount = null
          })

      console.log(response)
      console.log(this.errorAccount)
      

    },

    async onCreateName() {
      try {
        this.loading = true;
        if(!this.$refs.form.validate() || this.errorAccount != null) {
          this.loading = false;
          return
        }


        const privateKey = localStorage.getItem("privateKey"); // this.$auth.$storage.getState("privateKey");
        const address =  localStorage.getItem("address"); // this.$auth.$storage.getState("address");
        const newAccount = this.accountNear + this.network;

        // creates a public / private key pair using the provided private key
        // adds the keyPair you created to keyStore
        const myKeyStore = new keyStores.InMemoryKeyStore();
        const keyPairOld = KeyPair.fromString(privateKey);
        await myKeyStore.setKey(process.env.Network, address, keyPairOld);

        const nearConnection = await connect(CONFIG(myKeyStore));
        const account = await nearConnection.account(address);
        
        
        // const creatorAccount = await nearConnection.account(address);
        const {seedPhrase, secretKey} = generateSeedPhrase();
        const keyPairNew = KeyPair.fromString(secretKey);;// KeyPair.fromRandom("ed25519");
        const publicKey = keyPairNew.publicKey.toString();
        await myKeyStore.setKey(process.env.Network, newAccount, keyPairNew);


        const response2 = await account.functionCall({
          contractId: process.env.Network,
          methodName: "create_account",
          args: {
            new_account_id: newAccount,
            new_public_key: publicKey,
          },
          gas: "300000000000000",
          attachedDeposit: "500000000000000000000000",
        });

        if(response2.receipts_outcome[1].outcome.status.Failure === undefined) {
          console.log("cuenta creada")
          localStorage.setItem("address", newAccount);
          localStorage.setItem("publicKey", publicKey);
          localStorage.setItem("privateKey", keyPairNew.secretKey);
          localStorage.setItem("seedPhrase", seedPhrase);
          
          const dataUser = {
            address: newAccount,
            publicKey: publicKey.toString(),
            privateKey: keyPairNew.secretKey
          };

          let user = new Map();
          if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
            const list = localStorage.getItem("listUser")
            user = new Map(JSON.parse(list))
          }
          user.set(address.toString(), dataUser)
          const userMapStr = JSON.stringify(Array.from(user.entries()));
          localStorage.setItem("listUser", userMapStr);

          this.$router.push(this.localePath("/passphrase-new"))

        } else {
          this.$alert(ALERT_TYPE.ERROR, {
            title: "Error",
            desc: response2.receipts_outcome[1].outcome.status.Failure.toString(),
            timeout: 1000*60

          })
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error)
        this.$alert(ALERT_TYPE.ERROR, {
          title: "Error",
          desc: error.toString(),
          timeout: 1000*60

        })
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/pick-username.scss" lang="scss" />
