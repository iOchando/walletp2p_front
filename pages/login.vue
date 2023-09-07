<template>
  <v-form ref="formEmail" v-model="validEmail">
  <div id="login" class="divcol center">
    <Header
      ref="header"
      :show-back-btn="false"
      top-text="GET"
      bottom-text="STARTED"
      description="SIGN IN OR REGISTER TO JOIN THE FUN"
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
          continue
        </v-btn>


      <p class="p tcenter">or</p>

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
      >
        <span id="googleButton"></span>
      </v-btn>


      <v-btn
        class="btn-outlined"
        :disable="loading"
        :loading="loading"
        @click="onContinuePassphrase()"
      >
        CONTINUE WITH PASSPHRASE
      </v-btn>


      <!--<v-btn
        class="btn-outlined"
        @click="prueba()"
      >
        Pruebas login
      </v-btn>-->
    </section>



    <Footer ref="footer">
      <template #content>
          <span
            class="text tcenter"
            style="--fw: 700; --text: var(--text2); margin-top: 22px"
          >PRIVACY POLICY</span>
      </template>
    </Footer>
  </div>
</v-form>
</template>

<script>
import axios from 'axios';
// import * as nearAPI from "near-api-js";
import jwtDecode from 'jwt-decode'

export default {
  name: "LoginPage",
  layout: "auth-layout",
  data() {
    return {
      loading: false,
      validEmail: false,
      requiredEmail: [(v) => !!v || "Field required", (v) => /.+@.+/.test(v) || 'E-mail must be valid'],
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
  },
  methods: {
    prueba() {
      console.log("paso 1")
      function receiver(event) {
        console.log("paso 2 - ", event.origin)
          if (event.origin === 'http://localhost:8004/') {
              // if (event.data == 'Hello B') {
                  event.source.postMessage('Hello A, how are you?', event.origin);
             /* }
              else {
                  console.log(event.data);
              } */
          }
      }
      console.log("paso 3")
      window.addEventListener('message', receiver, false);
      console.log("paso 4")
      
      /* console.log("paso 1");
      parent.postMessage("prueba el resultado", "http://localhost:8004/")
      console.log("paso 2") */
      /* window.addEventListener("message", function(event) {
        console.log("paso 2");
        if (event.origin !== 'http://localhost:8000') {
          // algo de un dominio desconocido, ignorémoslo
          console.log( "Recibí: " + event.origin + " - " + event.data );
          return;
        }

        console.log( "Recibí: " + event.origin + " - " + event.data );

        // puedes enviar un mensaje usando event.source.postMessage(...)
        event.source.postMessage("prueba el resultado", "http://localhost:8004")
      }); */
      // window.postMessage("prueba el resultado", "http://localhost:8004/")
      // window.alert('fgff');
      // window.close()
    },
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
          this.$router.push(this.localePath("/verification"))
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

      await axios.post(process.env.URL_BACKEND +'/wallet/verify-google',
        {token: response.credential}, {
        headers: {
          'accept': 'application/json',
        },
      }).then((response) => {
        const data = response.data.data;

        this.loading = false

        localStorage.setItem("address", data.address);
        localStorage.setItem("publicKey", data.publicKey);
        localStorage.setItem("privateKey", data.secretKey);
        localStorage.setItem("auth", true)

        const dataUser = {
          address: data.address.toString(),
          publicKey: data.publicKey.toString(),
          privateKey: data.secretKey.toString()
        };

        let user = new Map();
        if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
          const list = localStorage.getItem("listUser")
          user = new Map(JSON.parse(list))
        }
        user.set(data.address.toString(), dataUser)
        const userMapStr = JSON.stringify(Array.from(user.entries()));
        localStorage.setItem("listUser", userMapStr);

        // if(data.isExists) {
          this.$router.push(this.localePath("/"))
        // } else {
          this.$router.push(this.localePath("/pick-username"))
        // }
      }).catch((error) => {
        console.log("error: ", error)
      })
      // call your backend API here

      // the token can be accessed as: response.credential
    },

    onContinuePassphrase() {
      localStorage.setItem("login", true);
      this.$router.push(this.localePath("/passphrase"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/login.scss" lang="scss" />
