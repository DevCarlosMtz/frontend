<template>
  <v-app>
    <v-main>
      <Layout>
        <nuxt />
      </Layout>
      <DialogAlert />
      <DialogLoader />
    </v-main>
  </v-app>
</template>

<script>
import Layout from '~/components/carbonUI/ui/application/layout/Layout3.vue'
import DialogAlert from '~/components/vuex/DialogAlert.vue'
import DialogLoader from '~/components/vuex/DialogLoader.vue'

export default {
  components: {
    Layout,
    DialogAlert,
    DialogLoader,
  },
}
</script>
