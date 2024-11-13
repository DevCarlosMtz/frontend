<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <DialogAlert />
    <DialogLoader />
  </v-app>
</template>

<style scoped>
div[data-app='true'] {
  background: url('assets/images/office.jpg') no-repeat !important;
  background-size: cover !important;
}
</style>

<script>
import DialogAlert from '~/components/vuex/DialogAlert.vue'
import DialogLoader from '~/components/vuex/DialogLoader.vue'

export default {
  components: {
    DialogAlert,
    DialogLoader,
  },
}
</script>
