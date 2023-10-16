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
        <v-btn
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
        </v-btn>
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
          @click="sheet=true"
        >
        explorar <span data-inner>near</span>
        </v-btn>

        <v-btn
          class="btn"
          to="/explore"
        >
        explorar apps
        </v-btn>

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
  </div>
</template>


<script>
import axios from 'axios';
import * as nearAPI from "near-api-js";
import { configNear } from "@/services/nearConfig";
const { connect, keyStores, KeyPair, utils } = nearAPI;

export default {
  name: "HomePage",
  data() {
    return {
      linkExplorer: "",
      sheet: false,
      balance: "0.00",
      address: "",
      dataBtns: [
        {
          icon: require("@/assets/sources/icons/arrow-up.svg"),
          text: "enviar",
          action: () => {this.sheet = true;},
        },
        {
          icon: require("@/assets/sources/icons/arrow-down.svg"),
          text: "recibir",
          action: () => {this.sheet = true;},
        },
        {
          icon: require("@/assets/sources/icons/plus.svg"),
          text: "recargar",
          action: () => {this.sheet = true;},
        },
        {
          icon: require("@/assets/sources/icons/swap.svg"),
          text: "cambiar",
          action: () => {this.sheet = true;},
        },
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
    
    this.linkExplorer = process.env.URL_EXPLORER + "/accounts/" + this.address
    this.getBalance()
    this.recentActivity()
    setInterval(() => {
      this.getBalance()
      this.recentActivity()
    }, 1000*10); // se ejecuta cada 10 segundos
    // eliminando variables de inicio de session
    console.log("address: ", this.address)
  },
  methods: {
    async getBalance() {
      let balance = 0
      const privateKey = localStorage.getItem("privateKey");

      const myKeyStore = new keyStores.InMemoryKeyStore();
      const PRIVATE_KEY = privateKey;
      // creates a public / private key pair using the provided private key
      const keyPair = KeyPair.fromString(PRIVATE_KEY);
      // adds the keyPair you created to keyStore
      await myKeyStore.setKey(process.env.Network, this.address, keyPair);
      
      const nearConnection = await connect(configNear(myKeyStore));
      const account = await nearConnection.account(this.address);

      const result = await account.getAccountBalance();

      balance = Number(utils.format.formatNearAmount(result.available));
      
      await axios.post(process.env.URL_APIP_PRICE,
        {fiat: "USD", crypto: "NEAR"})
      .then((response) => {
        const balanceNear = isNaN(balance) ? 0 : balance
        this.balance = (balanceNear * response.data[0].value).toFixed(2)
      }).catch((error) => {
        console.log("error balane: ", error)
      })

    },

    async recentActivity() {
      const wallet = this.address;
      await axios.get(process.env.URL_API_INDEXER + "/account/" + wallet +'/activity')
      .then((response) => {
        const data = response.data;

        this.dataActivity = data.map((items) => {
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

        if(this.dataActivity.length >= 10) {
          this.dataActivity.pop()
        }

      })
    }
  }
};
</script>

<style src="~/assets/styles/pages/index.scss" lang="scss" />
