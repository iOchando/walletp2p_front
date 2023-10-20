<template>
  <div id="home" class="divcol center">
    <Header show-append>
      <template #prepend>
        <nuxt-link :to="localePath('/')">
          <img src="@/assets/sources/logos/logo.svg" alt="logo" style="--w: 34px">
        </nuxt-link>
      </template>
    </Header>

    <section id="section-available" style="padding-top: 23px;">
      <div class="space" style="gap: 10px">
        <!--<v-btn
          class="btn-outlined"
          style="--bg: var(--secondary); flex: 1 1"
          @click="sheet=true"
        >
          BALANCES
        </v-btn>

        <v-btn
          class="btn"
          style="flex: 1 1"
          @click="sheet=true"
        >
          COLECCIONABLES
        </v-btn>-->
      </div>

      <aside class="container-available">
        <h1 class="p">
          <span style="--fw: 400">$</span>{{ balance }}
          <span class="currency">USD</span>
        </h1>

        <div class="divcol center" style="margin-top: 25px;">
          <h3 class="p">SALDO DISPONIBLE</h3>
          <img src="../assets/sources/icons/warning-blue.svg" alt="warning icon" style="--w: 25px; --h: 25px; margin-top: 6px">
        </div>
      </aside>

      <aside class="container-btns">
        <div v-for="(item, i) in dataBtns" :key="i">
          <v-btn class="btn-icon" @click="item.action">
            <img :src="item.icon" :alt="item.text">
          </v-btn>

          <span class="text">{{item.text}}</span>
        </div>
      </aside>
    </section>


    <section id="section-explore">
      <div id="section-explore-content">
        <v-btn
          class="btn-outlined"
          @click="openExplorer()"
        >
        explorar <span data-inner>near</span>
        </v-btn>

        <!--<v-btn
          class="btn"
          to="/explore"
        >
        explorar apps
        </v-btn>-->

        <article class="btn-outlined">
          ¡Gana, acuña y juega! Descubre el ecosistema de aplicaciones NEAR
        </article>

        <img src="@/assets/sources/images/background-explore.svg" alt="explore background">
      </div>
    </section>


    <section id="section-recent-activity">
      <div id="section-recent-activity__wrapper">
        <h1 class="p">actividad <br>reciente</h1>

        <div class="divcol" style="gap: 20px">
          <ActivityCard
            v-for="(item, i) in dataActivity" :key="i"
            :type="item.type"
            :account="item.account"
            :coin="item.coin"
            :amount="item.amount"
            :date="item.date"
          />
        </div>

        <v-btn
          :href="linkExplorer" target="_blank"
          class="btn"
        >
          ver todos
        </v-btn>
      </div>
    </section>


    <div class="text-center">
      <v-bottom-sheet
        v-model="sheet"
        inset
      >
        <v-sheet
          class="text-center"
          height="200px"
        >
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
          >
            cerrar
          </v-btn>
          <div class="my-3" style="font-size:20px; font-weight: 900;">
            Esta opción estará disponible próximamente
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>



    <v-row justify="center">
    <v-dialog
      v-model="transfer"
      scrollable
      width="400"
    >
      <v-card class="rounded-xl">
        <v-card-title>Enviar</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 230px;">
          <div class="mt-8">
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
          </div>
          <div class="mt-5">
            Balance: {{ balance_near }} NEAR
            <v-text-field
              v-model="amount"
              label="" solo
              style="--margin-message: 1px"
              suffix="NEAR"

            ></v-text-field>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pt-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn
            class="btn-outlined"
            width="100"
            style="--bg: var(--secondary); --b-color: var(--primary); --c: var(--primary)"
            variant="text"
            @click="transfer = false"
          >
            Cerrar
          </v-btn>
          
          <v-btn 
            class="btn"
            width="100"
            @click="transfer = false"
          >
            Enviar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-row justify="center">
    <v-dialog
      v-model="revived"
      scrollable
      width="400"
    >
      <v-card class="rounded-xl">
        <v-card-title>Recibir</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-row
            class="mt-3"
            justify="center"
          >
            <p>
              <vue-qr :text="address" :logoSrc="logoWallet" qid="addressQr"></vue-qr>
            </p>
            <p>
              <span class="mr-4">Dirección: <strong>{{ address }}</strong></span>
              <v-btn
                class="btn-icon"
                v-clipboard:copy="address"
              >
                <img src="@/assets/sources/icons/copy.svg" alt="copy to clipboard">
              </v-btn>
            </p>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pt-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn
            class="btn-outlined"
            width="100"
            style="--bg: var(--secondary); --b-color: var(--primary); --c: var(--primary)"
            variant="text"
            @click="revived = false"
          >
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>



    
  </div>
</template>


<script>
import axios from 'axios';
import * as nearAPI from "near-api-js";
import VueQr from 'vue-qr'
import logoWallet from "~/assets/sources/logos/logo.svg";
import { configNear } from "@/services/nearConfig";
// import { configNear } from "@/services/nearConfig";
import walletUtils from '@/services/wallet';
const { keyStores, Account, Near, utils } = nearAPI;


export default {
  name: "HomePage",
  components: {VueQr},
  data() {
    return {
      network: process.env.Network,
      logoWallet,
      required: [(v) => !!v || "Campo requerido"],
      errorAccount: null,
      successAccount: null,
      linkExplorer: "",
      sheet: false,
      transfer: false,
      revived: false,
      balance: "0.00",
      balance_near: 0.00,
      address: "",
      dataBtns: [
        {
          icon: require("@/assets/sources/icons/arrow-up.svg"),
          text: "enviar",
          action: () => {this.transfer = true;},
        },
        {
          icon: require("@/assets/sources/icons/arrow-down.svg"),
          text: "recibir",
          action: () => {this.revived = true;},
        },
        /* {
          icon: require("@/assets/sources/icons/plus.svg"),
          text: "recargar",
          action: () => {this.sheet = true;},
        },
        {
          icon: require("@/assets/sources/icons/swap.svg"),
          text: "cambiar",
          action: () => {this.sheet = true;},
        }, */
      ],
      dataActivity: [],
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  mounted() {
    this.address = localStorage.getItem("address");

    localStorage.removeItem("importEmailNickname");
    localStorage.removeItem("importEmail");
    localStorage.removeItem("seedPhraseLoginNew");
    localStorage.removeItem("seedPhraseLogin");
    localStorage.removeItem("seedPhrase");
    localStorage.removeItem("login");
    localStorage.removeItem("seedPhraseGenerate");
    localStorage.removeItem("token");
    
    if(!localStorage.removeItem("login") === undefined || !localStorage.getItem("privateKey") === undefined) {
      this.$router.push(this.localePath("/login"))
    }
    
    /* if(localStorage.getItem("loginExternal") !== undefined && localStorage.getItem("loginExternal") !== null) {
      const ruta = localStorage.getItem("loginExternal");
      const json = JSON.stringify({
        wallet: this.address,
        cretaDate: new Date()
      })
      const token = btoa(json)
      localStorage.removeItem("loginExternal");
      location.replace(ruta+"?token="+token);
    } */
    
    this.linkExplorer = process.env.URL_EXPLORER + this.address
    this.getBalance()
    this.recentActivity()
    setInterval(() => {
      this.getBalance()
      this.recentActivity()
    }, 1000*10); // se ejecuta cada 10 segundos
    // eliminando variables de inicio de session
  },
  methods: {
    openExplorer() {
      window.open(process.env.ROUTER_EXPLORER_NEAR, 'self')
    },

    async getBalance() {
      let balance = 0.00;
      let balanceNear = 0.00;

      const { near, usd } = await walletUtils.getBalance();

      if(near) {
        balance = usd;
        balanceNear = near;
      }

      this.balance = balance.toFixed(2);
      this.balance_near = balanceNear.toFixed(5);

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
    
    },

    async recentActivity() {
      const wallet = this.address;
      await axios.get(process.env.URL_API_INDEXER + "/account/" + wallet +'/activity')
      .then((response) => {
        const data = response.data;
        
        const dataActivity = data.map((items) => {
          let typeParam = "";
          let amountParam = "";
          let coinParam = "";
          let accountParam = "";

          switch (items.action_kind.toString()) {
            case "TRANSFER":
              typeParam = items.signer_id === wallet ? "sent" : "receive";
              accountParam = items.signer_id === wallet ? items.receiver_id : items.signer_id;
              amountParam = (items.signer_id === wallet ? "-" : "+")+Number(utils.format.formatNearAmount(items.args.deposit)).toFixed(2);
              coinParam = "NEAR"
              break;
            case "CREATE_ACCOUNT":
              typeParam = "account";
              accountParam = items.receiver_id
              break;
            case "ADD_KEY":
              typeParam = "access";
              accountParam = items.receiver_id
              break;
          }


          const res = {
            type: typeParam,
            account: accountParam,
            coin: coinParam,
            amount: amountParam,
            date: "1d",
          }

          return res
        })

        this.dataActivity = dataActivity.slice(0, 9);

        /* if(this.dataActivity.length >= 10) {
          this.dataActivity.pop()
        } */

      })
    }
  }
};
</script>

<style src="~/assets/styles/pages/index.scss" lang="scss" />
