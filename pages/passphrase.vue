<template>
  <div id="passphrase" class="divcol center">
    <Header
      ref="header"
      top-text="PASSPHRASE"
      bottom-text="SIGN UP"
      description="GENERATE AND SAFELY STORE A UNIQUE PASSPHRASE"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-content">
      <div class="grid">
        <div v-for="item in dataPassphrase" :key="item" class="btn-outlined">
          <span>{{item}}</span>
        </div>
      </div>

      <div class="space" style="gap: 15px">
        <v-btn class="btn" style="flex-grow: 1" @click="onContinue()">continue</v-btn>
        <v-btn
          class="btn-icon"
          style="--size: 45px"
          @click="fnCopie()"
          v-clipboard:copy="seedPhrase"
        >
          <v-icon v-if="copie">mdi-check</v-icon>
          <img v-if="!copie" width="23px" src="@/assets/sources/icons/copy.svg" alt="copy to clipboard">
        </v-btn>
      </div>
    </section>

    <Footer ref="footer">
      <template #content>
        <span class="text" style="--text: var(--text2)">ALREADY HAVE A PASSPHRASE?
          <a style="--fw: 700" @click="onSignIn()">SIGN IN</a>
        </span>
      </template>
    </Footer>
  </div>
</template>

<script>

import { generateSeedPhrase } from 'near-seed-phrase';

export default {
  name: "PassphrasePage",
  layout: "auth-layout",
  data() {
    return {
      dataPassphrase: [],
      seedPhrase: "",
      copie: false,
    }
  },
  head() {
    const title = 'Passphrase';
    return {
      title,
    }
  },
  mounted() {
    this.$store.commit('validSession')
    this.generatePhrase();
  },
  methods: {
    fnCopie() {
      this.copie = true;
      const timer = setInterval(() => {
        this.copie = false;
        clearInterval(timer)
      }, 1000*2);
      
    },

    onContinue() {
      this.$router.push(this.localePath("/passphrase-word"))
    },
    onSignIn() {
      this.$router.push(this.localePath("/passphrase-login"))
    },
    async generatePhrase() {
      const { seedPhrase } = await generateSeedPhrase();

      // this.$auth.$storage.setState("seedPhraseGenerate", seedPhrase);
      localStorage.setItem("seedPhraseGenerate", seedPhrase);
      // console.log(this.$auth.$storage.getState("seedPhraseGenerate"))
      
      this.seedPhrase = seedPhrase;
      this.dataPassphrase = seedPhrase.split(" ").map((item) => { return item });
      
    },
  }
};
</script>

<style src="~/assets/styles/pages/passphrase.scss" lang="scss" />
