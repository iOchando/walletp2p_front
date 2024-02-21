<template>
  <div id="index" class="divcol center">


    <home-page v-if="viewPage=='home'"></home-page>
    
    <create-import v-if="viewPage=='create-import'"></create-import>

  
  </div>
  
</template>


<script>
// import axios from 'axios';
// import * as nearAPI from "near-api-js";
import HomePage from './home.vue';
import CreateImport from './create-import.vue';
// import logoWallet from "~/assets/sources/logos/logo.svg";
// import { configNear } from "@/services/nearConfig";
// import walletUtils from '@/services/wallet';
// const { utils } = nearAPI;



export default {
  name: "IndexPage",
  components:{
    'home-page': HomePage,
    'create-import': CreateImport
  },
  layout: "auth-layout",
  // middleware: ["authenticated"],
  data() {
    return {
      viewPage: "home"
    }
  },
  
  created() {
//    sessionStorage.getItem("create-import-proccess")
    if (!localStorage.getItem('auth')) {
      this.viewPage = "create-import"
    }
  }
  
};
</script>
