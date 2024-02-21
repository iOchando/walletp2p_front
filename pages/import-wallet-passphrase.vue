<template>
  <v-form ref="form" v-model="valid">
  <div id="passphrase-login" class="divcol center">
    <Header
      ref="header"
      top-text="INGRESAR CON"
      bottom-text="PASSPHRASE"
      description="INICIA SESSIÓN CON TU FRASE CONTRASEÑA"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-login-content">
      <div ref="container" class="container-words" @scroll="onScroll">
        <v-text-field
          v-for="item in 12" :key="item"
          v-model="seedPhraseSplit[item]"
          :label="`enter word #${item}`" solo
          style="--margin-message: 1px"
          :rules="required"
        ></v-text-field>
      </div>


      <v-btn v-if="!scrollEnd" class="btn" @click="$refs.container.scrollTop += 100">
        <img width="10px" src="@/assets/sources/icons/scroll-down.svg" alt="scroll down">
      </v-btn>

      <v-btn v-else class="btn" :loading="loading" @click="onTap()">Continuar</v-btn>
    </section>
  </div>
  </v-form>
</template>

<script>
import axios from 'axios';
import { parseSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from "near-api-js";
import localStorageUser from '../services/local-storage-user';
// import utils from '~/services/utils';
const { KeyPair } = nearAPI;

export default {
  name: "PassphraseLoginPage",
  layout: "auth-layout",
  middleware: ["authenticated-create-import"],
  data() {
    return {
      scrollEnd: false,
      seedPhraseSplit: {},
      valid: false,
      required: [(v) => !!v || "Campo requerido"],
      loading: false,
    }
  },
  /* head() {
    const title = 'Passphrase login';
    return {
      title,
    }
  }, */
  methods: {
    onScroll(event) {
      const container = event.currentTarget
      this.scrollEnd = container.scrollTop + container.clientHeight >= (container.scrollHeight - 3)
    },
    async onTap(){
      this.loading = true;
      let seedPhrase = ""
      // const prub = ["swamp", "great", "sorry", "primary", "shoulder", "camera", "vague", "excuse", "uncle", "behind", "blast", "clerk"];
      for(let i = 0; i < 12; i++) {
        const word = this.seedPhraseSplit[(i+1).toString()];
        // const word = prub[i]
        if(word !== undefined && word.trim() !== '') {
          seedPhrase = seedPhrase + (i === 0 ? word : " " + word)
        } 
      }
      
      if(this.$refs.form.validate()) {
        const { secretKey } = await parseSeedPhrase(seedPhrase);
        const keyPairNew = KeyPair.fromString(secretKey);
        const publicKey = keyPairNew.publicKey.toString();
        let address = Buffer.from(keyPairNew.getPublicKey().data).toString("hex");

        /* await axios.get(process.env.URL_API_INDEXER + "/publicKey/" + publicKey +'/accounts')
          .then((response) => {
            if(response.data.length > 0) {
              address = response.data[0].toString()
            }
        }).catch((error) => {
          console.log(error)
        }) */

        await axios.get(process.env.URL_API_INDEXER + "/keys/" + publicKey )
          .then((response) => {
            if(response.data?.keys?.length > 0) {
              if(response.data?.keys[0]?.account_id) {
                address = response.data?.keys[0]?.account_id
              }
            }
        }).catch((error) => {
          console.log(error)
        })
        
        
        // agregando nueva cuenta
        localStorageUser.addNewAccount({
          _address: address,
          _publicKey: publicKey,
          _privateKey: secretKey
        })

        this.loading = false;
        
        localStorage.setItem("auth", true)
        
        // this.$router.push(this.localePath("/"))
        // this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
        this.$router.push({ path: sessionStorage.getItem("create-import-proccess")})
      }
      this.loading = false;
    },
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-login.scss" lang="scss" />
