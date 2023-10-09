<template>
  <div id="limited-permissions" class="d-flex flex-column">
    <Header
      top-text="CONNECT"
      top-text-center
    ></Header>

    <v-btn
      class="btn-outlined mx-auto"
      style="--bg: var(--secondary); --h: 34px; margin-block: 20px 19px;"
    >
      <h5 class="mb-0">app.nea--ramper.com</h5>
    </v-btn>

    <p class="mb-0" style="--fw: 400">
      only connect to sites that you trust. once connected, 
      <a href="" target="_blank">app.p2pwallet.com</a> will have 
      <b style="font-weight: 700 !important">limited permissions</b>:
    </p>


    <ul class="d-flex flex-column" style="margin-block: 33px; gap: 10px;">
      <li v-for="(item, i) in checks" :key="i" :class="{ unchecked: !item.check }">
        <span>{{ item.text }}</span>
      </li>
    </ul>


    <v-card
      min-height="45"
      class="btn-outlined justify-space-between align-center flex-wrap"
      style="margin-bottom: 12px; padding-right: 15px;"
    >
      <label>CONTRACT</label>

      <a href="" target="_blank" class="center tend ml-auto" style="gap: 8px;">
        sputnik-p2p.near
        <img src="@/assets/sources/icons/link.svg" alt="link to contract">
      </a>
    </v-card>

    <v-card class="btn-outlined flex-column" style="padding-block: 15px;">
      <div class="d-flex space" style="margin-bottom: 8px;">
        <label>NETWORK FEE ALLOWARE</label>
        <span
          class="tcenter"
          style="--c: #7C7B7F; --fw: 700; --ls: normal; text-align: right; font-size: 12px;"
        >0.25 NEAR</span>
      </div>

      <p class="mb-0" style="--fw: 500">
        The application will begiven permission to spend up to 
        <b style="font-weight: 700 !important">0.25 NEAR</b> 
        towards network fees incurred during use.
      </p>
    </v-card>


    <aside class="d-flex justify-space-between mt-6" style="gap: 12px;">
      <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary)">
        CANCEL
      </v-btn>

      <v-btn
        class="btn flex-grow-1"
        @click="connect()"
      >
        CONNECT
      </v-btn>
    </aside>
  </div>
</template>

<script>
import utils from '../services/utils';
import localStorageUser from '~/services/local-storage-user';


export default {
  name: "LimitedPermissions",
  layout: "default-variant",
  data() {
    return {
      checks: [
        { text: "View  the address of your permited account", check: true },
        { text: "View  the balance of your permited account", check: true },
        { text: "Call methods on the smart contract on behalf of your permited account", check: true },
        { text: "This does not allow the app to transfer tokens", check: false },
      ],
      domain: null,
      contract: null,
      address: sessionStorage.getItem("connectAppAddressSelect"),
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
    const token = sessionStorage.getItem("token");
    const tokenJSON = JSON.parse(token);
    this.domain = tokenJSON.domain;
    this.contract = tokenJSON.contract;
  },
  methods: {
    connect(){
      if (!this.address || !this.contract || this.domain) return

      

      console.log(this.address)
      console.log(this.contract)
      console.log(this.domain)

      /* localStorageUser.addApp({
          _address: address, 
          _contract: token.contrcat, 
          _domain: token.domain
      }); */

      
      console.log(localStorageUser.getAccount(this.address));
    }
  }
}
</script>

<style src="@/assets/styles/pages/limited-permissions.scss" lang="scss"></style>
