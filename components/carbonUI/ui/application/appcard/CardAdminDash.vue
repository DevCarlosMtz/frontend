<template>
  <v-card class="h-full d-flex flex-column" :to="{ name: routename }" >
    <div class="pa-3 flex-grow-1">
      <div class="d-flex align-center flex-column">
        <v-avatar size="150" rounded="0">
          <v-img :src="image" :alt="name" />
          <!-- <v-icon x-large>{{icon}}</v-icon> -->
        </v-avatar>
        <div class="text-center mt-2">
          <span class="font-weight-bold text-h5">{{ name }}</span>
          <div class="secondary--text text--lighten-1 text-caption">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    // icon: {
    //   type: String,
    //   default: ''
    // },
    image: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    routename:{
      type: String,
      default:'dashboard.inicio'
    }
  }
}
</script>
