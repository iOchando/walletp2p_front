<template>
  <v-form ref="formValidate" v-model="validForm">
  <div id="passphrase-word" class="divcol center">
    <Header
      ref="header"
      top-text=""
      bottom-text="INGRESO CON PRIVATEKEY"
      description="INGRESE SU PRIVATEKEY"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-word-content">
      <v-textarea
        v-model="privatekeyInput"
        label="COLOQUE AQUÍ SU PRIVATEKEY" solo
        style="--margin-message: 1px"
        :rules="required"
      ></v-textarea>

      <v-btn
        class="btn"
        :disable="loading"
        :loading="loading"
        @click="onVerify()"
      >
        INGRESAR
      </v-btn>

      <v-btn class="btn-outlined" @click="$router.go(-1)">VOLVER</v-btn>
    </section>
  </div>
  </v-form>
</template>

<script>
import axios from 'axios';
// import { parseSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from "near-api-js";
import localStorageUser from '../services/local-storage-user';
import utils from '~/services/utils';
const { KeyPair } = nearAPI;

export default {
  name: "PassphraseWordPage",
  layout: "auth-layout",
  data() {
    return {
      validForm: false,
      loading: false,
      error: null,
      required: [(v) => !!v || "Es requerido"],
      phraseNumber: 0,
      privatekeyInput: null,
    }
  },
  head() {
    const title = 'Passphrase word';
    return {
      title,
    }
  },
  created() {
    this.$store.commit('validSession');
  },
  mounted() {
    // this.$store.commit('validSession')
    // this.phraseNumber = Math.floor(Math.random() * 12)
    // console.log(this.$auth.$storage.getState("seedPhraseGenerate"))
  },
  methods: {
    async onVerify() {
      if(this.$refs.formValidate.validate()) {
        this.error = null;
        this.loading = true;
      //  const seedPhrase = localStorage.getItem("seedPhraseGenerate").split(" ").map((item) => { return item });

        // const { secretKey, publicKey } = await parseSeedPhrase(localStorage.getItem("seedPhraseGenerate"));
        
        const secretKey = this.privatekeyInput;
        const keyPairNew = KeyPair.fromString(secretKey);
        const publicKey = keyPairNew.publicKey.toString();
        let implicitAccountId = Buffer.from(keyPairNew.getPublicKey().data).toString("hex");
        
        await axios.get(process.env.URL_API_INDEXER + "/publicKey/" + publicKey +'/accounts')
          .then((response) => {
            if(response.data.length > 0) {
              implicitAccountId = response.data[0].toString()
            }
        })

        await axios.get(process.env.URL_API_INDEXER2 + "/keys/" + publicKey )
          .then((response) => {
            if(response.data?.keys?.length > 0) {
              if(response.data?.keys[0]?.account_id) {
                implicitAccountId = response.data?.keys[0]?.account_id
              }
            }
        })
        
        // agregando nueva cuenta
        localStorageUser.addNewAccount({
          _address: implicitAccountId,
          _publicKey: publicKey,
          _privateKey: secretKey
        })

        localStorage.setItem("auth", true)
        this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
          
        /* } else {
          this.loading = false;
          this.error = "incorrect word";
        } */
      }
      
    }
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-word.scss" lang="scss" />
