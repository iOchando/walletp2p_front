<template>
  <div id="send-details" class="d-flex flex-column">
    <Header></Header>

    <div style="margin-top: 26px; height: 45px;" />


    <section class="d-flex flex-column" style="height: 248px;">
      <h2>0 <span>NEAR</span></h2>
    </section>


    <section class="d-flex flex-column" style="gap: 14px; margin-bottom: 43px;">
      <v-card
        class="btn-outlined space"
        style="--bg: var(--secondary); padding: 0 23px;"
      >
        <h5 class="mb-0" style="color: var(--primary)">SEND TO</h5>
        
        <span style="--fs: 12px; --ls: normal">ACCOUNT ID</span>
      </v-card>

      <aside class="d-flex" style="gap: 12px">
        <v-btn class="btn-outlined flex-grow-1" style="--bg: var(--secondary);" @click="$router.go(-1)">
          CANCEL
        </v-btn>

        <v-btn class="btn flex-grow-1">
          CONTINUE
        </v-btn>
      </aside>
    </section>

    <h5 style="margin-bottom: 12px;">COMMON PAYEE</h5>
    <section class="d-flex flex-column" style="gap: 12px;">
      <v-card
        v-for="(item, i) in commonPayee" :key="i"
        color="transparent"
        class="card-common-payee d-flex"
        style="gap: 13px;"
      >
        <v-img-load
          :src="item.img"
          :alt="`${item.name || item.email}'s avatar`"
          sizes="40px"
          cover
          class="flex-grow-0"
        />

        <div class="d-flex flex-column justify-center">
          <span>{{ item.email }}</span>
          <span>{{ item.name }}</span>
        </div>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "SendDetailsPage",
  data() {
    return {
      commonPayee: [
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          email: "mariangelahdezp@gmail.com",
          name: "María Ángela Hernández",
        },
        {
          img: require('@/assets/sources/avatars/avatar-male.svg'),
          name: "arturoadelante.near",
        },
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          name: "patriciasilvab.near",
        },
        {
          img: require('@/assets/sources/avatars/avatar-female.svg'),
          email: "Miguel.marinan@gmail.com",
          name: "Miguel Marinan González",
        },
        {
          img: require('@/assets/sources/avatars/avatar-male.svg'),
          name: "danielaruiz.near",
        },
      ]
    }
  },
  head() {
    const title = 'Send details';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/send-details.scss" lang="scss"></style>
