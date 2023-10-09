<template>
  <div id="connect-with-near" class="d-flex flex-column">
    <Header
      top-text="CONNECT"
      top-text-dir="rtl"
      bottom-text="WITH NEAR"
      bottom-text-dir="ltr"
      description="AN APPLICATION IS REQUESTING LIMITED ACCESS TO YOUR NEAR ACCOUNT. SELECT THE ACCOUNT YOU WISH TO CONNECT."
    ></Header>

    <v-btn
      class="btn-outlined mx-auto mt-2 mb-6"
      style="--bg: var(--secondary); --h: 34px"
    >
      <img src="@/assets/sources/icons/language-blue.svg">
      <h5 class="mb-0">app.nea--ramper.com</h5>
    </v-btn>


    <v-card class="btn-outlined d-flex flex-column" style="gap: 14px;">
      <div class="v-card__wrapper d-flex flex-column" style="gap: 14px;">
        <WalletCard
          v-for="(item, i) in dataWallets" :key="i"
          :wallet="item.wallet"
          :pass="item.pass"
          collapsed
          :active="i == 0"
          :disabled="i != 0"
          :show="i == 0"
          clickable
          @click="selectAccount(item.wallet)"
        />
      </div>

      <v-btn
        class="btn-outlined"
        style="--b-color: var(--primary); --bg: var(--secondary); --c: var(--primary); margin-right: calc(var(--p-inside) + var(--p-outside));"
        @click="$router.push({path: '/login', query: {action: 'connect-with-near'} })"
      >
        IMPORT A DIFFERENT ACCOUNT
      </v-btn>
    </v-card>

    <aside class="d-flex justify-space-between mt-6" style="gap: 12px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary)">
        CANCEL
      </v-btn>

      <v-btn class="btn flex-grow-1">
        NEXT
      </v-btn>
    </aside>
  </div>
</template>

<script>
import utils from '../services/utils';
import localStorageUser from '~/services/local-storage-user';


export default {
  name: "ConnectWithNear",
  layout: "default-variant",
  data() {
    return {
      dataWallets: []
    }
  },
  head() {
    const title = 'Connect with NEAR';
    return {
      utils,
      title,
    }
  },
  mounted() {
    this.execute();
    
    if(this.$route.query.token){
      const token = window.atob(this.$route.query.token)
      console.log(token)
      const tokenJSON = JSON.stringify(token);
      localStorage.setItem("token", tokenJSON)
      console.log("paso login: ", localStorage.getItem("token"))
    }
    const arrayRes = localStorageUser.getAccounts();
    const arrayMap = arrayRes.map(item => {
      return {
        wallet: item[0],
        pass: "******"
      }
    });
    const currentAccount = localStorageUser.getCurrentAccount();
    this.selectAccount(currentAccount.address, arrayMap);
    

  },
  methods: {
    selectAccount(address, array){
      const list = array === undefined ? this.dataWallets : array;

      const arrayRet = [];
      let indexCount = 1;
      for(let index = 0; index < list.length; index++) {
        if(list[index].wallet === address) {
          arrayRet[0] = list[index];
        } else {
          arrayRet[indexCount] = list[index];
          indexCount += 1;
        }
      }

      this.dataWallets = arrayRet;
    },
    execute() {
      if(localStorage.getItem("loginExternal") !== undefined && localStorage.getItem("loginExternal") !== null) {
        const ruta = localStorage.getItem("loginExternal");
        const json = JSON.stringify({
          wallet: this.address,
          cretaDate: new Date()
        })
        const token = btoa(json)
        localStorage.removeItem("loginExternal");
        location.replace(ruta+"?token="+token);
      } 
    }
  }
}
</script>

<style src="@/assets/styles/pages/connect-with-near.scss" lang="scss"></style>
