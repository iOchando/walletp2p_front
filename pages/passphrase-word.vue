<template>
  <div id="passphrase-word" class="divcol center">
    <Header
      ref="header"
      top-text="FRASE DE CONTRASEÑA"
      bottom-text="REGISTRARSE"
      description="INGRESE LA SIGUIENTE PALABRA DE SU FRASE DE RECUPERACIÓN PARA COMPLETAR EL PROCESO DE CONFIGURACIÓN"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
      :show-prepend="showPrepend"
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
        verificar
      </v-btn>

      <v-btn class="btn-outlined" @click="$router.go(-1)">atrás</v-btn>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { parseSeedPhrase } from 'near-seed-phrase';
import * as nearAPI from "near-api-js";
import localStorageUser from '../services/local-storage-user';
import utils from '~/services/utils';
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
      showPrepend: true,
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
      this.showPrepend = false
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
          // this.$router.push(this.localePath("/"))
          this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
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
          
          // agregando nueva cuenta
          localStorageUser.addNewAccount({
            _address: address,
            _publicKey: publicKey,
            _privateKey: secretKey
          })

          
          this.loading = false
          
          if(localStorage.getItem("seedPhraseLogin") !== undefined && localStorage.getItem("seedPhraseLogin") !== null) {
            localStorage.setItem("auth", true)
            localStorage.removeItem("seedPhraseLogin")

            // this.$router.push(this.localePath("/"))
            this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
          } else {
            // this.$router.push(this.localePath("/pick-username"))
            this.$router.push(utils.routeAction(this.$route.query.action,"/pick-username"));
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
