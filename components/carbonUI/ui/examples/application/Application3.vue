<template>
  <Layout3 is-demo>
    <h1 class="text-h4">Dashboard</h1>
    <v-divider class="my-2"></v-divider>
    <AppCard7Demo class="pa-0 mb-2" />
    <UserTable />
  </Layout3>
</template>

<script>
import UserTable from '~/components/carbonUI/examples/UserTable'
import Layout3 from '~/components/carbonUI/ui/application/layout/Layout3'
import AppCard7Demo from '~/components/carbonUI/ui/application/appcard/AppCard7Demo'

export default {
  components: {
    Layout3,
    UserTable,
    AppCard7Demo
  }
}
</script>
