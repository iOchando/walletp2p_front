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
      :show-back-btn="showBackBtn"
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
import axios from 'axios';
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
      showBackBtn: true,
    }
  },
  head() {
    const title = 'Passphrase word';
    return {
      title,
    }
  },
  mounted() {
    this.$store.commit('validSession')
    this.phraseNumber = Math.floor(Math.random() * 12)
    // console.log(this.$auth.$storage.getState("seedPhraseGenerate"))
    if(localStorage.getItem("seedPhraseLoginNew") !== undefined && localStorage.getItem("seedPhraseLoginNew") !== null) {
      this.showBackBtn = false
    }
  },
  methods: {
    async onVerify() {
      this.error = null;
      this.loading = true;
      const seedPhrase = localStorage.getItem("seedPhraseGenerate").split(" ").map((item) => { return item });

      if(this.seedPhraseWord === seedPhrase[this.phraseNumber]) {
        if(localStorage.getItem("seedPhraseLoginNew") !== undefined && localStorage.getItem("seedPhraseLoginNew") !== null) {
          this.loading = false
          localStorage.setItem("auth", true)
          localStorage.removeItem("seedPhraseLogin")
          this.$router.push(this.localePath("/"))
        } else {


          const { secretKey, publicKey } = await parseSeedPhrase(localStorage.getItem("seedPhraseGenerate"));
          const keyPairNew = KeyPair.fromString(secretKey);
          let address = Buffer.from(keyPairNew.getPublicKey().data).toString("hex");

          await axios.get(process.env.URL_API_INDEXER + "/publicKey/" + publicKey +'/accounts')
            .then((response) => {
              if(response.data.length > 0) {
                address = response.data[0].toString()
              }
          })
          
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
            localStorage.removeItem("seedPhraseLogin")
            this.$router.push(this.localePath("/"))
          } else {
            this.$router.push(this.localePath("/pick-username"))
          }

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
