<template>
  <div id="passphrase-word" class="divcol center">
    <Header
      ref="header"
      top-text="PASSPHRASE"
      bottom-text="SIGN UP"
      description="ENTER THE FOLLOWING WORD FROM YOUR RECOVERY PHRASE TO COMPLETE THE SETUP PROCESS"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-word-content">
      <v-text-field
        v-model="seedPhraseWord"
        :label="'enter word #' + (phraseNumber+1) " solo
        style="--margin-message: 1px"
        :error-messages="error"
      ></v-text-field>

      <v-btn
        class="btn"
        :disable="loading"
        :loading="loading"
        @click="onVerify()"
      >
        verify
      </v-btn>

      <v-btn class="btn-outlined" @click="$router.go(-1)">go back</v-btn>
    </section>
  </div>
</template>

<script>

import { parseSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from "near-api-js";
const { KeyPair } = nearAPI;

export default {
  name: "PassphraseWordPage",
  layout: "auth-layout",
  data() {
    return {
      loading: false,
      error: null,
      phraseNumber: 0,
      seedPhraseWord: null,
    }
  },
  head() {
    const title = 'Passphrase word';
    return {
      title,
    }
  },
  mounted() {
    this.phraseNumber = Math.floor(Math.random() * 12)
    // console.log(this.$auth.$storage.getState("seedPhraseGenerate"))
    localStorage.removeItem("auth");
  },
  methods: {
    async onVerify() {
      this.error = null;
      this.loading = true;
      const seedPhrase = localStorage.getItem("seedPhraseGenerate").split(" ").map((item) => { return item });

      if(this.seedPhraseWord === seedPhrase[this.phraseNumber]) {
        const { secretKey, publicKey } = await parseSeedPhrase(localStorage.getItem("seedPhraseGenerate"));
        const keyPair = KeyPair.fromString(secretKey);
        const address = Buffer.from(keyPair.getPublicKey().data).toString("hex");
        
        /* this.$auth.$storage.setState("address", address)
        this.$auth.$storage.setState("publicKey", publicKey)
        this.$auth.$storage.setState("privateKey", secretKey) */

        localStorage.setItem("address", address);
        localStorage.setItem("publicKey", publicKey);
        localStorage.setItem("privateKey", secretKey);
        
        const dataUser = {
          address: address.toString(),
          publicKey: publicKey.toString(),
          privateKey: secretKey
        };

        let user = new Map();
        if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
          const list = localStorage.getItem("listUser")
          user = new Map(JSON.parse(list))
        }
        user.set(address.toString(), dataUser)
        const userMapStr = JSON.stringify(Array.from(user.entries()));
        localStorage.setItem("listUser", userMapStr);

        /* const list = localStorage.getItem("listUser")
        const map = new Map(JSON.parse(list))
        
        console.log(map)
        console.log(map.get(address.toString())) */
        
        // console.log(localStorage.getItem("privateKey") )
        
        this.loading = false
        
        if(localStorage.getItem("seedPhraseLogin") !== undefined && localStorage.getItem("seedPhraseLogin") !== null) {
          localStorage.setItem("auth", true)
          this.$router.push(this.localePath("/"))
        } else {
          this.$router.push(this.localePath("/pick-username"))
        }
      } else {
        this.loading = false;
        this.error = "incorrect word";
      }
      
    }
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-word.scss" lang="scss" />
