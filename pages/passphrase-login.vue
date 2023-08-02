<template>
  <div id="passphrase-login" class="divcol center">
    <Header
      ref="header"
      top-text="PASSPHRASE"
      bottom-text="LOG IN"
      description="SECURELY LOG IN WITH YOUR EXCLUSIVE PASSPHRASE"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-login-content">
      <div class="container-words">
        <v-text-field
          v-for="item in 12" :key="item"
          :label="`enter word #${item}`" solo
          style="--margin-message: 1px"
        ></v-text-field>
      </div>

      <v-btn class="btn" @click="onTap()">
        <img width="10px" src="../assets/sources/icons/scroll-down.svg" alt="scroll down">
      </v-btn>
    </section>
  </div>
</template>

<script>
export default {
  name: "PassphraseLoginPage",
  layout: "auth-layout",
  data() {
    return {
    }
  },
  head() {
    const title = 'Passphrase login';
    return {
      title,
    }
  },
  methods: {
    onTap() {
      this.$router.push(this.localePath("/pick-username"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-login.scss" lang="scss" />
