<template>
  <div id="passphrase-word" class="divcol center">
    <Header
      ref="header"
      top-text="PASSPHRASE"
      bottom-text="SIGN UP"
      description="ENTER THE FOLLOWING WORD FROM YOUR RECOVERY PHRASE TO COMPLETE THE SETUP PROCESS"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-word-content">
      <v-text-field
        label="enter word #12" solo
        style="--margin-message: 1px"
      ></v-text-field>

      <v-btn class="btn" @click="onVerify()">verify</v-btn>

      <v-btn class="btn-outlined" @click="$router.go(-1)">go back</v-btn>
    </section>
  </div>
</template>

<script>
export default {
  name: "PassphraseWordPage",
  layout: "auth-layout",
  data() {
    return {
    }
  },
  head() {
    const title = 'Passphrase word';
    return {
      title,
    }
  },
  methods: {
    onVerify() {
      this.$router.push(this.localePath("/verification"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-word.scss" lang="scss" />
