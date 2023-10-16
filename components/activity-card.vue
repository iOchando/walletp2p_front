<template>
  <div id="activity-card">
    <div style="display: flex; gap: var(--gap)">
      <img :src="matchingType.icon" :alt="`${type} icon`">

      <div class="divcol">
        <span>{{matchingType.title}}{{coin ? ` ${coin}` : ''}}</span>
        <span>{{matchingType.text}} 
          <span style="--fw: 700">{{account}}</span>
        </span>
      </div>
    </div>

    <div class="divcol">
      <span style="color: var(--primary)">{{amount}} {{coin}}</span>
      <span style="text-align: right">{{date}} atrás</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",
  props: {
    type: {
      type: String,
      default: undefined
    },
    account: {
      type: String,
      default: undefined
    },
    coin: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    amount: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      types: {
        "receive": {
          icon: require("@/assets/sources/icons/icon-recieved.svg"),
          title: "received",
          text: "From",
        },
        "sent": {
          icon: require("@/assets/sources/icons/icon-sent.svg"),
          title: "send",
          text: "From",
        },
        "access": {
          icon: require("@/assets/sources/icons/icon-access-key.svg"),
          title: "access key",
          text: "For",
        },
        "account": {
          icon: require("@/assets/sources/icons/icon-new-account.svg"),
          title: "new account created",
          text: "Account",
        },
      }
    }
  },
  computed: {
    matchingType() {
      return this.types[this.type]
    }
  },
};
</script>

<style lang="scss">
#activity-card {
  --gap: 13px;

  display: flex;
  justify-content: space-between;
  gap: var(--gap);

  .divcol {
    justify-content: center;
  }

  img {
    --size: 40px;
    width: var(--size) !important;
    height: var(--size) !important;
    object-fit: cover;
  }

  span:first-of-type:not(span > span) {
    --fw: 700;
    color: var(--text2);
    font-family: var(--font2) !important;
    font-size: 12px !important;
    line-height: 1;
    text-transform: uppercase;
  }

  span + span {
    --fw: 500;
    color: var(--text2);
    font-family: var(--font2) !important;
    line-height: 1;
    font-size: 10px !important;
  }
}
</style>
