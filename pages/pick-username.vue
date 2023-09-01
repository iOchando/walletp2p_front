<template>
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
      <p>must have <strong>0.00001</strong> NEAR available, to be able to assign a name</p>
      <v-btn class="btn" @click="onCreateName()">sign up</v-btn>
      <v-btn class="btn-outlined mt-5" @click="onSignUp()">Skip</v-btn>

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
</template>

<script>

import * as nearAPI from "near-api-js";
import { CONFIG } from "@/services/nearConfig";
const { connect, keyStores, KeyPair } = nearAPI;

export default {
  name: "PickUsernamePage",
  layout: "auth-layout",
  data() {
    return {
      address: "",
      accountNear: null,
      copie: false,
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
  },
  methods: {
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
    async onCreateName() {
      try {
        console.log(this.accountNear)
        if(this.accountNear === null || this.accountNear === "") {
          
          throw new Error ("debe introducir un accountId")
        }

        const privateKey = localStorage.getItem("privateKey"); // this.$auth.$storage.getState("privateKey");
        const address =  localStorage.getItem("address"); // this.$auth.$storage.getState("address");
        const publicKey2 = localStorage.getItem("publicKey"); // this.$auth.$storage.getState("privateKey");

        console.log(privateKey)
        console.log(publicKey2)

        const myKeyStore = new keyStores.InMemoryKeyStore();
        const PRIVATE_KEY = privateKey; // privateKey.toString().replace('ed25519:', '');
        console.log("privateKey: ", PRIVATE_KEY)
        // creates a public / private key pair using the provided private key
        const keyPair = KeyPair.fromString(PRIVATE_KEY);
        // adds the keyPair you created to keyStore
        await myKeyStore.setKey(process.env.Network, address, keyPair);

        const nearConnection = await connect(CONFIG(myKeyStore));
        const account = await nearConnection.account(address);
        // await account.addKey(publicKey2);
        
        
        // const creatorAccount = await nearConnection.account(address);
        const keyPair2 = KeyPair.fromRandom("ed25519");
        const publicKey = keyPair.publicKey.toString();
        console.log(this.accountNear, " -- ", keyPair2)
        await myKeyStore.setKey("testnet", this.accountNear, keyPair2);

        /* const response2 = await account.functionCall({
          contractId: "testnet",
          methodName: "create_account",
          args: {
            new_account_id: this.accountNear,
            new_public_key: publicKey,
          },
          gas: "300000000000000",
          attachedDeposit: "10000000000000000000",
        }); */



        
        const response2 = await account.createAccount(
          this.accountNear, // new account name
          publicKey, // public key for new account
          "10000000000000000000" // initial balance for new account in yoctoNEAR
        );

        console.log(response2)
        
        console.log("cuenta creada")
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/pick-username.scss" lang="scss" />
