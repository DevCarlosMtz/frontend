<template>
  <Layout1 is-demo>
    <h1 class="text-h4">Dashboard</h1>
    <v-divider class="my-2"></v-divider>
    <AppCard3Demo class="pa-0 mb-1" />
    <AppCard6Demo class="pa-0 mb-2" />
    <UserTable class="mb-2" />
    <AppCard1Demo class="pa-0" />
  </Layout1>
</template>

<script>
import UserTable from '~/components/carbonUI/examples/UserTable'
import Layout1 from '~/components/carbonUI/ui/application/layout/Layout1'
import AppCard1Demo from '~/components/carbonUI/ui/application/appcard/AppCard1Demo'
import AppCard3Demo from '~/components/carbonUI/ui/application/appcard/AppCard3Demo'
import AppCard6Demo from '~/components/carbonUI/ui/application/appcard/AppCard6Demo'

export default {
  components: {
    UserTable,
    Layout1,
    AppCard1Demo,
    AppCard3Demo,
    AppCard6Demo
  }
}
</script>
