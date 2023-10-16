<template>
  <v-form ref="form" v-model="valid">
  <div id="pick-username" class="divcol center">
    <Header
      ref="header"
      top-text="ESCOGE UN"
      bottom-text="NOMBRE DE USUARIO"
      description="ESTA SERÁ SU DIRECCIÓN LEGIBLE DE BILLETERA"
      max-width="283px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
      bottom-text-indent="1.6ch"
    />

    <section id="pick-username-content">
      <v-text-field
        v-model="accountNear"
        label="usuario / billetera" solo
        style="--margin-message: 1px"
        :error-messages="errorAccount"
        :success-messages="successAccount"
        :suffix="network"
        :rules="required"
        @keyup="verificarAccount(accountNear)"
      ></v-text-field>
      <!--<p>The following wallet </p>
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
      <p>must have <strong>0.5</strong> NEAR available, to be able to assign a name</p>-->
      <v-btn :loading="loading" class="btn" @click="onCreateName()">registrarse</v-btn>
      <v-btn :loading="loading" class="btn-outlined mt-5" @click="onSignUp()">saltar</v-btn>

      <article class="btn-outlined">
        <img width="36px" src="@/assets/sources/icons/warning.svg" alt="warning icon">

        <p class="p">
          <span>NOTA:</span> Su nombre de usuario servirá como dirección de su billetera, lo que permitirá transferencias fluidas con solo presionar unas pocas teclas.
        </p>
      </article>
    </section>

    <Footer ref="footer">
      <span class="text" style="--text: var(--text2)">¿NECESITAS AYUDA?
        <a style="--fw: 700" href="#" target="_blank">SOPORTE</a>
      </span>
    </Footer>

  </div>
</v-form>
</template>

<script>
import axios from 'axios'
import * as nearAPI from "near-api-js";
import localStorageUser from '../services/local-storage-user';
import { configNear } from "@/services/nearConfig";
import { ALERT_TYPE } from '~/plugins/dictionary';
import utils from '~/services/utils';
const { keyStores, Account, Near } = nearAPI;



export default {
  name: "PickUsernamePage",
  layout: "auth-layout",
  data() {
    return {
      valid:false,
      address: "",
      accountNear: null,
      required: [(v) => !!v || "Campo requerido"],
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
    this.$store.commit('validSession')
    this.address = localStorageUser.getCurrentAccount().address; // this.$auth.$storage.getState("address") ?? " ";
    this.network = "."+process.env.Network
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
      this.$router.push(this.localePath(utils.routeLogin(this.$route.query.action)));
    },
    async verificarAccount(value) {
      const accountInput = value + "." + process.env.Network;
      console.log(accountInput)

      const keyStore = new keyStores.InMemoryKeyStore()
      const near = new Near(configNear(keyStore))
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
      
      return response
      // console.log(response)
      // console.log(this.errorAccount)
    
    },

    async onCreateName() {
      try {
        this.loading = true;
        if(!this.$refs.form.validate() || this.errorAccount != null) {
          this.loading = false;
          return
        }
        const newAccount = this.accountNear + this.network;

        if(localStorage.getItem("importEmail") !== undefined && localStorage.getItem("importEmail") !== null) {
          await axios.post(process.env.URL_BACKEND +'/wallet/send-code',
          {email: localStorage.getItem("email")}, {
            headers: {
              'accept': 'application/json',
            },
          }).then(() => {
            localStorage.setItem("importEmailNickname", newAccount)
            this.loading = false;
            // this.$router.push(this.localePath("/verification"))
            this.$router.push(utils.routeAction(this.$route.query.action,"/verification"));
          }).catch(() => {
            throw new Error ("Failed to send the code")
          })
          
            
          this.$router.push(this.localePath("/verification"))
        } else {
          await axios.post(process.env.URL_BACKEND +'/wallet/create-nickname',
          {nickname: newAccount}, {
            headers: {
              'accept': 'application/json',
            },
          }).then((response) => {
            const data = response.data.data;
            
            // remover cuenta antigua para poder agregar nueva cuenta con nicname
            localStorageUser.removeAccount(localStorageUser.getCurrentAccount().address)

            // agregando nueva cuenta con nicname
            localStorageUser.addNewAccount({
              _address: data.address,
              _publicKey: data.publicKey,
              _privateKey: data.secretKey
            })

            localStorage.setItem("seedPhrase", data.seedPhrase);

            /*
            const list = localStorage.getItem("listUser")
            if(list !== undefined && list !== null) {
              const user = new Map(JSON.parse(list))
              user.delete(localStorage.getItem("address"))
              
              const userMapStr = JSON.stringify(Array.from(user.entries()));
              localStorage.setItem("listUser", userMapStr);
            }

            localStorage.setItem("address", data.address);
            localStorage.setItem("publicKey", data.publicKey);
            localStorage.setItem("privateKey", data.secretKey);
            
            const dataUser = {
              address: data.address,
              publicKey: data.publicKey,
              privateKey: data.secretKey
            };

            let user = new Map();
            if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
              const list = localStorage.getItem("listUser")
              user = new Map(JSON.parse(list))
            }
            user.set(data.address, dataUser)

            const userMapStr = JSON.stringify(Array.from(user.entries()));

            localStorage.setItem("listUser", userMapStr);
            localStorage.setItem("seedPhrase", data.seedPhrase); */
            this.loading = false;

            // this.$router.push(this.localePath("/passphrase-new"))
            this.$router.push(utils.routeAction(this.$route.query.action,"/passphrase-new"));

          }).catch((error) => {
            throw new Error ("Error create nickname: " + error)
          })


          
          /*
          const privateKey = localStorage.getItem("privateKey"); // this.$auth.$storage.getState("privateKey");
          const address =  localStorage.getItem("address"); // this.$auth.$storage.getState("address");
          

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
            localStorage.setItem("seedPhrase", seedPhrase);

            localStorage.setItem("address", newAccount);
            localStorage.setItem("publicKey", publicKey);
            localStorage.setItem("privateKey", keyPairNew.secretKey);
            
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
          */
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
