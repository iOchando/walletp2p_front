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
      <div ref="container" class="container-words" @scroll="onScroll">
        <v-text-field
          v-for="item in 12" :key="item"
          :label="`enter word #${item}`" solo
          style="--margin-message: 1px"
        ></v-text-field>
      </div>


      <v-btn v-if="!scrollEnd" class="btn" @click="$refs.container.scrollTop += 100">
        <img width="10px" src="@/assets/sources/icons/scroll-down.svg" alt="scroll down">
      </v-btn>

      <v-btn v-else class="btn" @click="onTap()">Continue</v-btn>
    </section>
  </div>
</template>

<script>

export default {
  name: "PassphraseLoginPage",
  layout: "auth-layout",
  data() {
    return {
      scrollEnd: false,
    }
  },
  head() {
    const title = 'Passphrase login';
    return {
      title,
    }
  },
  methods: {
    onScroll(event) {
      const container = event.currentTarget
      this.scrollEnd = container.scrollTop + container.clientHeight === container.scrollHeight
    },
    onTap() {
      this.$router.push(this.localePath("/verification"))
    }
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-login.scss" lang="scss" />
