<template>
  <v-form ref="form" v-model="valid">
  <div id="passphrase-login" class="divcol center">
    <Header
      ref="header"
      top-text="FRASE DE CONTRASEÑA"
      bottom-text="ACCESO"
      description="INICIA SESIÓN CON TU CONTRASEÑA EXCLUSIVA"
      max-width="284px"
      top-text-dir="rtl"
      bottom-text-dir="ltr"
    />

    <section id="passphrase-login-content">
      <div ref="container" class="container-words" @scroll="onScroll">
        <v-text-field
          v-for="item in 12" :key="item"
          v-model="seedPhraseSplit[item]"
          :label="`enter word #${item}`" solo
          style="--margin-message: 1px"
          :rules="required"
        ></v-text-field>
      </div>


      <v-btn v-if="!scrollEnd" class="btn" @click="$refs.container.scrollTop += 100">
        <img width="10px" src="@/assets/sources/icons/scroll-down.svg" alt="scroll down">
      </v-btn>

      <v-btn v-else class="btn" @click="onTap()">Continuar</v-btn>
    </section>
  </div>
  </v-form>
</template>

<script>
import utils from '~/services/utils';

export default {
  name: "PassphraseLoginPage",
  layout: "auth-layout",
  middleware: ["authenticated-process-login"],
  data() {
    return {
      scrollEnd: false,
      seedPhraseSplit: {},
      valid: false,
      required: [(v) => !!v || "Campo requerido"],
    }
  },
  head() {
    const title = 'Passphrase login';
    return {
      title,
    }
  },
  created() {
    localStorage.setItem("login", true);
  },
  mounted() {
    // this.$store.commit('validSession')
  },
  methods: {
    onScroll(event) {
      const container = event.currentTarget
      this.scrollEnd = container.scrollTop + container.clientHeight >= (container.scrollHeight - 3)
    },
    onTap(){
      let seedPhrase = ""
      for(let i = 0; i < 12; i++) {
        const word = this.seedPhraseSplit[(i+1).toString()];
        console.log(i+1, word)
        if(word !== undefined && word.trim() !== '') {
          seedPhrase = seedPhrase + (i === 0 ? word : " " + word)
        } 
      }
      
      if(this.$refs.form.validate()) {
        localStorage.setItem("seedPhraseGenerate", seedPhrase);
        localStorage.setItem("seedPhraseLogin", true);
        // this.$router.push(this.localePath("/passphrase-word"))
        this.$router.push(utils.routeAction(this.$route.query.action,"/passphrase-word"));
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/passphrase-login.scss" lang="scss" />
