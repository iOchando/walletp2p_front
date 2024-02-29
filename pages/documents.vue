<template>
  <div id="documents">
    <Header
      show-append
      top-text="NFTS"
      top-text-dir="ltr"
      bottom-text="DOCUMENTOS"
      bottom-text-dir="rtl"
      hide-profile
      style="margin-bottom: 70px;"
    ></Header>
    

    <aside v-for="(collection, i) in collections" :key="i" class="collection" style="gap: 9px">
      <h6 class="mb-6">COLECCIÓN: {{ collection.name }}</h6>
      <span v-if="collection.items.length">{{ collection.items.length }}</span>

      <div>
        <v-img-load
          v-for="(item, i2) in collection.items" :key="i2"
          :src="item"
          rounded="50%"
          border="2px solid white"
          class="pointer"
          @click="$router.push({path: 'document-details', query: { id: i2 }})"
        ></v-img-load>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "DocumentsPage",
  layout: "default-variant",
  data() {
    return {
      collections: [
        {
          name: "APES",
          items: [
            require('@/assets/sources/avatars/avatar-female.svg'),
            require('@/assets/sources/avatars/avatar-female.svg'),
            require('@/assets/sources/avatars/avatar-female.svg'),
          ]
        },
        {
          name: "APES2",
          items: [
            require('@/assets/sources/avatars/avatar-female.svg'),
            require('@/assets/sources/avatars/avatar-female.svg'),
            require('@/assets/sources/avatars/avatar-female.svg'),
          ]
        }
      ]
    }
  },
  head() {
    const title = 'Documentos';
    return {
      title,
    }
  },
}
</script>

<style src="@/assets/styles/pages/documents.scss" lang="scss"></style>
