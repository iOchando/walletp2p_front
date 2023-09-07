<template>
  <div id="verification" class="divcol center">
    <Header
      ref="header"
      top-text="otp"
      bottom-text="verification"
      description="ENTER THE VERIFICATION CODE WE JUST SENT ON YOUR EMAIL ADDRESS"
      max-width="279px"
      top-text-dir="rtl"
      top-text-indent="2.8ch"
      bottom-text-dir="ltr"
    />

    <section id="verification-content">
      <v-otp-input
        v-model="otp"
        :length="lengthOtp"
        type="number"
        @change="error=null"
      ></v-otp-input>
      <span :v-show="error" style="color: red;">{{error}}</span>
      
      <div v-show="minutes > 0" class="space">
        <span class="text">resend code in</span>

        <span
          class="text"
          style="--text: #F20C0C; --fw: 700"
        >{{minutes}}:{{seconds}}</span>
      </div>

      <div v-show="minutes <= 0" class="space">
        <a
          :disabled="disabledResend"
          @click="resendCode()"
        ><span class="text" style="color: blue !important;" >resend code</span></a>
      </div>

      <v-btn
        class="btn"
        :disabled="!isActive"
        :loading="loading"
        @click="onVerify()"
      >
        verify
      </v-btn>
    </section>

    <Footer ref="footer">
      <template #content>
        <span class="text" style="--text: var(--text2)">NEED HELP? 
          <a style="--fw: 700" href="#" target="_blank">SUPPORT</a>
        </span>
      </template>
    </Footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "VerificationPage",
  layout: "auth-layout",
  data() {
    return {
      loading: false,
      lengthOtp: 4,
      otp: "",
      error: null,
      minutes: 5,
      seconds: 0,
      disabledResend: false,
    }
  },
  head() {
    const title = 'OTP Verification';
    return {
      title,
    }
  },
  computed: {
    isActive () {
      return this.otp.length === this.lengthOtp && this.minutes > 0
    },
  },
  mounted() {
    this.$store.commit('validSession')
    this.initCounter();
  },
  methods: {
    timer() {
      if(this.minutes === 0) {
        this.seconds = 0;
        return
      }
      if(this.seconds === 0) {
        this.minutes--;
        this.seconds = 60;
      } else {
        this.seconds--;
      }
    },
    initCounter() {
      setInterval(this.timer, 1000);
    },

    async resendCode() {
      this.disabledResend = true
        await axios.post(process.env.URL_BACKEND +'/wallet/send-code', 
        {email: localStorage.getItem("email")}, {
          headers: {
            'accept': 'application/json',
          },
        }).then(() => {
          this.minutes = 5
          this.disabledResend = false
        }).catch(() => {
          this.disabledResend = false
        })
    },

    async onVerify() {
      this.loading = true;
      this.error = null;
      
      let route = "email-wallet-import"
      let params = {email: localStorage.getItem("email"), code: this.otp.toString()}
      const importWalletNickname = localStorage.getItem("importEmailNickname")
      if(importWalletNickname !== undefined && importWalletNickname !== null) {
        route = "email-create-nickname"
        params = {email: localStorage.getItem("email"), code: this.otp.toString(), nickname: importWalletNickname }
      }

      await axios.post(process.env.URL_BACKEND +'/wallet/'+route, params
      ).then((response) => {
        const data = response.data.data;

        if(localStorage.getItem("importEmailNickname") !== undefined && localStorage.getItem("importEmailNickname") !== null) {          
          const list = localStorage.getItem("listUser")
          if(list !== undefined && list !== null) {
            const user = new Map(JSON.parse(list))
            user.delete(localStorage.getItem("address"))
            
            const userMapStr = JSON.stringify(Array.from(user.entries()));
            localStorage.setItem("listUser", userMapStr);
          }
        }
        
        this.loading = false

        localStorage.setItem("address", data.address);
        localStorage.setItem("publicKey", data.publicKey);
        localStorage.setItem("privateKey", data.secretKey);
        

        const dataUser = {
          address: data.address.toString(),
          publicKey: data.publicKey.toString(),
          privateKey: data.secretKey.toString()
        };

        let user = new Map();
        if(localStorage.getItem("listUser") !== undefined && localStorage.getItem("listUser") !== null) {
          const list = localStorage.getItem("listUser")
          user = new Map(JSON.parse(list))
        }
        user.set(data.address.toString(), dataUser)
        const userMapStr = JSON.stringify(Array.from(user.entries()));
        localStorage.setItem("listUser", userMapStr);

        console.log(data)

        if(data.isExists) {
          localStorage.setItem("auth", true)
          this.$router.push(this.localePath("/"))
        } else {
          localStorage.setItem("importEmail", true)
          this.$router.push(this.localePath("/pick-username"))
        }
      }).catch((error) => {
        this.error = error.response.data
        this.loading = false
      })
    },
  }
};
</script>

<style src="~/assets/styles/pages/verification.scss" lang="scss" />
