<template>
  <div id="staking">
    <Header
      show-append
      top-text="STAKING"
      top-text-center
      description="STAKE YOUR NEAR TOKENS WITH A VALIDATOR"
    ></Header>
    

    <section id="staking-header" class="d-flex flex-column" style="gap: 9px">
      <v-card class="btn-outlined d-flex flex-column">
        <span style="--fw: 700">patriciasilvab.near</span>

        <div class="space" style="margin-top: 4px;">
          <span style="--fw: 700; --fs: 12px">AVAILABLE BALANCE</span>
          <span style="--fs: 12px">0.94732 NEAR</span>
        </div>

        <div class="space">
          <span style="--fw: 500">Staked</span>
          <span>0 NEAR</span>
        </div>
      </v-card>

      <v-btn
        class="btn"
      >STAKE MY TOKENS</v-btn>
    </section>


    <section id="staking-tokens" class="d-flex flex-column">
      <aside
        v-for="(item, i) in dataTokens" :key="i"
        class="token-card"
      >
        <div class="d-flex" style="gap: 13px;">
          <v-img-load
            :src="require('@/assets/sources/logos/near-icon.svg')"
            sizes="40px"
            rounded="50%"
            cover
            class="flex-grow-0"
          />

          <div class="d-flex align-center">
            <h5 class="mb-0">{{ item.title }}</h5>
            <img src="@/assets/sources/icons/warning-blue.svg" alt="info">
          </div>
        </div>

        <div class="d-flex flex-column">
          <span>{{ item.amount }} NEAR</span>
          <span>${{ item.currency }}</span>
        </div>
      </aside>
    </section>


    <h1 class="mb-0">CURRENT</h1>
    <h1 style="direction: rtl;">VALIDATORS</h1>


    <v-card id="staking-stake" class="btn-outlined d-flex flex-column" style="gap: 12px;">
      <p class="mb-0">You are not currently staking with any validators</p>
      <v-btn
      class="btn-outlined"
      style="min-height: 34px;"
      >stake my tokens</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "StakingPage",
  layout: "background-layout",
  data() {
    return {
      dataTokens: [
        {
          title: "TOTAL AMOUNT STAKED",
          amount: 0,
          currency: 0,
        },
        {
          title: "REWARDS EARNED",
          amount: 0,
          currency: 0,
        },
      ]
    }
  }
}
</script>

<style src="@/assets/styles/pages/staking.scss" lang="scss"></style>
