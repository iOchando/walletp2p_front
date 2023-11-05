<template>
  <v-form ref="formEmail" v-model="validEmail">
  <div id="login" class="divcol center">
    <Header
      ref="header"
      :show-back-btn="false"
      top-text="EMPEZAR"
      description="INICIAR SESIÓN O REGÍSTRESE PARA UNIRSE A LA DIVERSIÓN"
      max-width="251px"
    />

    <div v-for="i in 3" :id="`login-decoration-${i}`" :key="i" />

    <section id="login-content">
        <v-text-field
          v-model="emailImput"
          solo label="email"
          style="--margin-message: 1px"
          :rules="requiredEmail"
        ></v-text-field>

        <v-btn
          class="btn"
          :disable="loading"
          :loading="loading"
          @click="onContinue()"
        >
          continuar
        </v-btn>


      <p class="p tcenter">o</p>

      <!--<v-btn
        class="btn-outlined"
        @click="onContinueGoogle()"
      >
        <img width="18px" src="~/assets/sources/logos/gmail.svg" alt="gmail logo" style="margin-right: 10px">
        <span>CONTINUE WITH GOOGLE</span>
      </v-btn> -->

      <!-- <v-btn
        id="googleButton"
        class="btn-outlined"
      >
        <img width="18px" src="~/assets/sources/logos/gmail.svg" alt="gmail logo" style="margin-right: 10px">
        <span>CONTINUE WITH GOOGLE</span>
      </v-btn> -->
      <v-btn
        class="btn-outlined"
        :loading="loading"
      >
        <span id="googleButton"></span>
      </v-btn>


      <v-btn
        class="btn-outlined"
        :disable="loading"
        :loading="loading"
        @click="onContinuePassphrase()"
      >
        CONTINUAR CON CONTRASEÑA
      </v-btn>


      <!--<v-btn
        class="btn-outlined"
        @click="prueba()"
      >
        Pruebas login
      </v-btn>-->
    </section>



    <Footer ref="footer">
      <span
        class="text tcenter"
        style="--fw: 700; --text: var(--text2); margin-top: 22px"
      >POLÍTICA DE PRIVACIDAD</span>
    </Footer>
  </div>
</v-form>
</template>

<script>
import axios from 'axios';
// import * as nearAPI from "near-api-js";
import jwtDecode from 'jwt-decode';
import utils from '~/services/utils';
import localStorageUser from '~/services/local-storage-user';

export default {
  name: "LoginPage",
  layout: "auth-layout",
  data() {
    return {
      loading: false,
      validEmail: false,
      requiredEmail: [(v) => !!v || "Campo requerido", (v) => /.+@.+/.test(v) || 'E-mail inválido'],
      emailImput: null,
    }
  },
  head() {
    const title = 'Get started';
    return {
      title,
    }
  },
  mounted() {    
    // localStorage.removeItem("auth");
    // initialize Google Sign in
    window.google.accounts.id.initialize({
        client_id: process.env.CLIEN_ID_GOOGLE,
        callback: this.handleCredentialResponse, // method to run after user clicks the Google sign in button
        context: 'signin'
      });

    // render button
    window.google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'CONTINUE WITH GOOGLE',
        shape: 'circle',
        logo_alignment: 'left',
        width: 330
      }
    );
    localStorage.removeItem("importEmailNickname")
    localStorage.removeItem("importEmail")
    localStorage.removeItem("seedPhraseLoginNew")
    localStorage.removeItem("seedPhraseLogin")
    localStorage.removeItem("seedPhrase")
    localStorage.removeItem("login")
    localStorage.removeItem("seedPhraseGenerate");

    /* if(this.$route.query.redirect !== undefined){
      localStorage.setItem("loginExternal", this.$route.query.redirect)
      console.log("paso login: ", localStorage.getItem("loginExternal"))
    } */
  },
  methods: {
    async onContinue() {
      if(this.$refs.formEmail.validate()) {
        this.loading = true
        await axios.post(process.env.URL_BACKEND +'/wallet/send-code',
        {email: this.emailImput}, {
          headers: {
            'accept': 'application/json',
          },
        }).then(() => {
          this.loading = false
          localStorage.setItem("email", this.emailImput);
          localStorage.setItem("login", true);
          
          this.$router.push(utils.routeAction(this.$route.query.action,"/verification"));
          // this.$router.push(this.localePath("/verification"))
        }).catch(() => {
          this.loading = false
        })
      }
    },

    /* onContinueGoogle() {
      window.google.accounts.id.initialize({
        client_id: process.env.CLIEN_ID_GOOGLE,
        callback: this.handleCredentialResponse, // method to run after user clicks the Google sign in button
        context: 'signin'
      })
      window.google.accounts.id.prompt()

      // this.$auth.loginWith('google', { params: { prompt: "select_account" } })
      // this.$auth.loginWith('google')
    }, */

    async handleCredentialResponse(response) {
      /*
      console.log(response)
      console.log("--------------------------------")
      console.log(response.credential)
      console.log("--------------------------------")
      const token = jwtDecode(response.credential)
      console.log(token)
      console.log(`ID: ${token.sub}`)
      console.log(`Full Name: ${token.name}`)
      console.log(`Given Name: ${token.given_name}`)
      console.log(`Family Name: ${token.family_name}`)
      console.log(`Image URL: ${token.picture}`)
      console.log(`Email: ${token.email}`)
      */

      await axios.post(process.env.URL_BACKEND +'/wallet/verify-google',
        {token: response.credential}, {
        headers: {
          'accept': 'application/json',
        },
      }).then((resp) => {
        const data = resp.data.data;

        this.loading = false

        localStorage.setItem("auth", true);

        const tokenGoogle = jwtDecode(response.credential)

        // agregando nueva cuenta
        localStorageUser.addNewAccount({
          _address: data.address,
          _publicKey: data.publicKey,
          _privateKey: data.secretKey,
          _email: tokenGoogle.email
        });
        
        // if(data.isExists) {
        this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
        // } else {
          // this.$router.push(this.localePath("/pick-username"))
        // }
      }).catch((error) => {
        console.log("error: ", error)
      })
    },

    onContinuePassphrase() {
      localStorage.setItem("login", true);
      this.$router.push(utils.routeAction(this.$route.query.action,"/passphrase"));
      // this.$router.push(this.localePath("/passphrase"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/login.scss" lang="scss" />
