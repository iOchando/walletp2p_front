<template>
  <div id="home" class="divcol center">
    <section id="section-available">
      <div class="space" style="gap: 10px">
        <v-btn class="btn-outlined" style="--bg: var(--secondary); flex: 1 1">BALANCES</v-btn>

        <v-btn class="btn" style="flex: 1 1">COLLECTIBLES</v-btn>
      </div>

      <aside class="container-available">
        <h1 class="p" style="--currency: 'USD'">
          <span style="--fw: 400">$</span>1.32
        </h1>

        <div class="divcol center" style="margin-top: 25px;">
          <h3 class="p">AVAILABLE BALANCE</h3>
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
        <v-btn class="btn-outlined">
          explore <span data-inner>near</span>
        </v-btn>

        <v-btn class="btn">explore apps</v-btn>

        <article class="btn-outlined">
          Earn, mint, and play! Discover the ecosystem of NEAR applications
        </article>

        <img src="@/assets/sources/images/background-explore.svg" alt="explore background" width="295px">
      </div>
    </section>


    <section id="section-recent-activity">
      <h1 class="p">recent <br>activity</h1>

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

      <v-btn class="btn">view all</v-btn>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      dataBtns: [
        {
          icon: require("@/assets/sources/icons/arrow-up.svg"),
          text: "send",
          action: () => {},
        },
        {
          icon: require("@/assets/sources/icons/arrow-down.svg"),
          text: "receive",
          action: () => {},
        },
        {
          icon: require("@/assets/sources/icons/plus.svg"),
          text: "top up",
          action: () => {},
        },
        {
          icon: require("@/assets/sources/icons/swap.svg"),
          text: "swap",
          action: () => {},
        },
      ],
      dataActivity: [
        {
          type: "receive",
          coin: "NEAR",
          amount: "1",
          date: "1d",
        },
        {
          type: "access",
          account: "patriciasilvab.near",
          coin: "NEAR",
          amount: "1",
          date: "1d",
        },
        {
          type: "account",
          account: "patriciasilvab.near",
          coin: "NEAR",
          amount: "1",
          date: "1d",
        },
        {
          type: "receive",
          coin: "NEAR",
          amount: "1",
          date: "1d",
        },
      ],
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/pages/index.scss" lang="scss" />
