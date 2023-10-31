<template>
  <v-form
    ref="formEnvio"
    v-model="validEnvio"
  >
    <div id="send-details" class="d-flex flex-column">
      <Header></Header>

      <div style="margin-top: 26px; height: 45px;" />


      <section class="d-flex flex-column" style="height: 248px;">
        <h2>{{ amount }} <span>NEAR</span></h2>
      </section>


      <section class="d-flex flex-column" style="margin-bottom: 43px;">
        <v-text-field
          v-model="accountNear"
          placeholder="ID DE CUENTA" solo
          style="--bg: var(--secondary); --p: 0 15px 0 23px"
          :error-messages="errorAccount"
          :success-messages="successAccount"
          :rules="required"
          required
        >
          <template #prepend-inner>
            <h5 class="mb-0" style="color: var(--primary)">ENVIAR A</h5>
          </template>
        </v-text-field>

        <aside class="d-flex" style="gap: 12px">
          <v-btn
            class="btn-outlined flex-grow-1"
            style="--bg: var(--secondary);" 
            :loading="envioLoading"
            @click="$router.go(-1)"
          >
            CANCELAR
          </v-btn>

          <v-btn 
            class="btn flex-grow-1"
            :loading="envioLoading"
            @click="SendNear()"
          >
            CONTINUAR
          </v-btn>
        </aside>
      </section>

      <h5 style="margin-bottom: 12px;">BENEFICIARIO COMÚN</h5>
      <section class="d-flex flex-column" style="gap: 12px;">
        <v-card
          v-for="(item, i) in commonPayee" :key="i"
          color="transparent"
          class="card-common-payee d-flex"
          style="gap: 13px;"
        >
          <v-img-load
            :src="item.img"
            :alt="`${item.name || item.email}'s avatar`"
            sizes="40px"
            cover
            class="flex-grow-0"
            @click="selectAccount(item.email)"
          />

          <div
            class="d-flex flex-column justify-center"
            @click="selectAccount(item.email)"
          >
            <span>{{ item.email }}</span>
            <span>{{ item.name }}</span>
          </div>
        </v-card>
      </section>
    </div>
  </v-form>
</template>

<script>
import * as nearAPI from "near-api-js";
import { configNear } from "@/services/nearConfig";
// import { configNear } from "@/services/nearConfig";
import walletUtils from '@/services/wallet';
const { keyStores, Account, Near, utils } = nearAPI;


export default {
  name: "SendDetailsPage",
  data() {
    return {
      validEnvio: true,
      amount: sessionStorage.getItem("send-amount"),
      accountNear: null,
      required: [(v) => !!v || "Campo requerido", (v) => this.verificarAccount(v) || "Account already exists" ],
      errorAccount: null,
      successAccount: null,
      envioLoading: false,
      commonPayee: [/*
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          email: "mariangelahdezp@gmail.com",
          name: "María Ángela Hernández",
        },
        {
          img: require('@/assets/sources/avatars/avatar-male.svg'),
          name: "arturoadelante.near",
        },
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          name: "patriciasilvab.near",
        },
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          email: "Miguel.marinan@gmail.com",
          name: "Miguel Marinan González",
        },
        {
          img: require('@/assets/sources/avatars/avatar-male.svg'),
          name: "danielaruiz.near",
        }, */
      ]
    }
  },
  head() {
    const title = 'Send details';
    return {
      title,
    }
  },
  mounted() {
    // localStorage.removeItem("common-beneficiary");
    this.recentBeneficiary();
  },

  methods: {
    selectAccount(wallet) {
      this.accountNear = wallet;
    },

    recentBeneficiary() {
      const result = localStorage.getItem("common-beneficiary");

      if(result) {
        const arreglo = JSON.parse(result).map(item => { return  {
            img: require('@/assets/sources/avatars/avatar-male.svg'),
            email: item.wallet,
            name: "",
            count: item.count,
          } 
        });
        
        arreglo.sort(function(a, b) {
          const textA = a.count;
          const textB = b.count;
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });

        this.commonPayee = arreglo.slice(0, 6);
      }
      

    },

    async verificarAccount(value) {
      // const accountInput = value + "." + process.env.Network;

      this.successAccount = null
      this.errorAccount = null

      const keyStore = new keyStores.InMemoryKeyStore()
      const near = new Near(configNear(keyStore))
      const account = new Account(near.connection, value)
      
      let response = false
      if(value) {
        await account.state()
          .then(() => {
            response = true
            this.successAccount = "La wallet es valida"
          }).catch(() => {
            response = false
            this.errorAccount = "la wallet no existe"
          })
      }
      
      return response
    
    },

    async SendNear() {
      if(this.$refs.formEnvio.validate()) {
        this.envioLoading = true;

        const account = await walletUtils.nearConnection();
        const result = await account.sendMoney(
          this.accountNear, // receiver account
          utils.format.parseNearAmount(this.amount).toString() // amount in yoctoNEAR
        );

        const sendResult = JSON.stringify({
          hash: !result?.transaction.hash ? result : result?.transaction.hash,
          hashUrl: process.env.ROUTER_EXPLORER_NEAR + 'es/txns/' + this.hash,
          alertType: result?.status?.SuccessValue === "" ? "success" : "error",
        })

        console.log(sendResult)
        sessionStorage.setItem("send-result", sendResult)
        
        let beneficiary = [];
        const commonBeneficiary = localStorage.getItem("common-beneficiary");
        if(commonBeneficiary) {
          beneficiary = JSON.parse(commonBeneficiary);
        }
        
        const isExistBeneficiary = beneficiary.find(item => item.wallet === this.accountNear);

        if(isExistBeneficiary) {
          beneficiary.find(item => item.wallet === this.accountNear).count += 1;
        } else {
          beneficiary.push({wallet: this.accountNear, count: 1});
        }

        localStorage.setItem("common-beneficiary", JSON.stringify(beneficiary))

        this.$refs.formEnvio.reset();
        this.envioLoading = false;

        this.$router.push({ path: "/" });

      }
    },


  },
}
</script>

<style src="@/assets/styles/pages/send-details.scss" lang="scss"></style>
