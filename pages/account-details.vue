<template>
  <div id="account-details">
    <Header
      show-append
      top-text="DETALLES DE"
      bottom-text="LA CUENTA"
    ></Header>


    <!-- details -->
    <section id="account-details-detail" class="d-flex flex-column" style="gap: 15px;">
      <div class="space">
        <h5 class="mb-0">ID DE BILLETERA</h5>

        <div class="d-flex" style="gap: 12px;">
          <span class="center">{{ account_id.address }}</span>

          <v-btn
            class="btn-icon"
            style="--size: 29px"
            @click="fnCopie()"
            v-clipboard:copy="account_id.address"
          >
            <v-icon v-if="copie">mdi-check</v-icon>
            <img v-if="!copie" src="@/assets/sources/icons/copy.svg" alt="copy to clipboard" style="--w: 15px">
          </v-btn>
        </div>
      </div>

      <div class="jspace">
        <h5 class="mb-0">balance de billetera</h5>

        <div class="d-flex flex-column tend">
          <span>{{ balanceWallet.near }} NEAR</span>
          <span>${{ balanceWallet.usd }}</span>
        </div>
      </div>

      <v-card class="btn-outlined">
        <aside v-for="(value, key, i) in details" :key="i" class="space">
          <div class="center">
            <h5 class="mb-0 min-width-span">{{ key }}</h5>
            <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
          </div>

          <div class="d-flex flex-column tend">
            <span>{{ value.amount }} NEAR</span>
            <span>&lt; ${{ value.currency }}</span>
          </div>
        </aside>
      </v-card>
    </section>


    <!--<h1 class="mb-0" style="direction: rtl;">seguridad y</h1>
    <h1 style="margin-bottom: 22px;">recuperación</h1>


    <h5
      class="acenter"
      style="margin-bottom: 19px; gap: 5px;"
    >
      Más seguro (recomendado)
      <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
    </h5>


    <v-card
      class="btn-outlined d-flex align-center justify-space-between"
      style="--br: 20px; padding: 22px 17px; gap: 19px; background-color: var(--secondary) !important; margin-bottom: 41px;"
    >
      <div class="d-flex flex-column" style="gap: 5px; max-width: 126px;">
        <h5 class="mb-0">billetera de hardware de libro mayor</h5>

        <p class="mb-0">Mejore la seguridad de su cuenta utilizando una billetera de hardware.</p>
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="color: #fff !important;">HABILITAR</span>
      </v-btn>
    </v-card>-->


    <!--<v-card
      class="btn-outlined d-flex align-center justify-space-between"
      style="--br: 20px; padding: 22px 17px; gap: 19px; background-color: var(--secondary) !important; margin-bottom: 27px;"
    >
      <div class="d-flex" style="gap: 5px;">
        <div class="d-flex flex-column" style="max-width: 126px;">
          <h5 class="mb-0">enviar frase</h5>

          <p class="mb-0">Habilitar jul 19 2023</p>
        </div>

        <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="color: #fff !important;">DESACTIVADO</span>
      </v-btn>
    </v-card>-->


    <div class="d-flex flex-column" style="gap: 15px;">
      <!--<v-btn
        class="btn-outlined"
        style="--b-color: var(--primary); --bg: var(--secondary)"
      >
        <span style="color: var(--primary) !important;">exportar clave privada local</span>
      </v-btn>-->

      <v-btn
        class="btn"
        @click="logout()"
      >
        eliminar cuenta de la billetera
      </v-btn>
    </div>
  </div>
</template>

<script>
import utils from '@/services/utils';
import localStorageUser from '~/services/local-storage-user';
import walletUtils from '@/services/wallet';

export default {
  name: "AccountDetails",
  layout: "default",
  data() {
    return {
      copie: false,
      account_id: localStorageUser.getCurrentAccount(),
      details: {
        'reservado para almacenamiento': {
          amount: "0",
          currency: "0"
        },
        'reservado para transacciones': {
          amount: "0",
          currency: "0"
        },
        'Saldo disponible': {
          amount: "0",
          currency: "0"
        },
      },
      balanceWallet: { near: 0, usd: 0 },
    }
  },

  mounted() {
    this.loadDetailsAccount();
    
  },

  methods: {
    logout() {
      localStorageUser.removeAccountWallet();
    },

    fnCopie() {
      this.copie = true;
      const timer = setInterval(() => {
        this.copie = false;
        clearInterval(timer)
      }, 1000);
      
    },

    async loadDetailsAccount() {
      const params = {
        account_id: this.account_id.address,
        finality: "optimistic",
        request_type: "view_account"
      }
      await utils.executeQueryRpc("query", params).then(async item => {
        await walletUtils.getBalance().then(items => {
          this.balanceWallet = {
            near: (Number(item.data.result.amount) / 1000000000000000000000000).toFixed(5),
            usd: (Number(Number(item.data.result.amount) / 1000000000000000000000000) * items.price).toFixed(2)
          };

          this.details = {
            'reservado para almacenamiento': {
              amount: (Number(item.data.result.storage_usage) / 100000).toFixed(5),
              currency: (Number(Number(item.data.result.storage_usage) / 100000) * items.price).toFixed(2)
            },
            'reservado para transacciones': {
              amount: "0.05",
              currency: (0.05 * items.price).toFixed(2)
            },
          'Saldo disponible': {
              amount: Number(items.near).toFixed(5),
              currency: items.usd
            }
          }
        })
      })

      
    }
  },
}
</script>

<style src="@/assets/styles/pages/account-details.scss" lang="scss"></style>
