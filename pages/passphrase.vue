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
        <v-btn class="btn-icon" style="--size: 45px">
          <img width="23px" src="@/assets/sources/icons/copy.svg" alt="copy to clipboard">
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
export default {
  name: "PassphrasePage",
  layout: "auth-layout",
  data() {
    return {
      dataPassphrase: [
        "LAWSUIT", "FISH", "MEAD", "SINGULAR", "AIRPORT", "HEALTH", "CIDER", "CAR", "KOMBUCHA", "BEER", "RETIRE", "SEA",
      ],
    }
  },
  head() {
    const title = 'Passphrase';
    return {
      title,
    }
  },
  methods: {
    onContinue() {
      this.$router.push(this.localePath("/passphrase-word"))
    },
    onSignIn() {
      this.$router.push(this.localePath("/passphrase-login"))
    },
  }
};
</script>

<style src="~/assets/styles/pages/passphrase.scss" lang="scss" />
