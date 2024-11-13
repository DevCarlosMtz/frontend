<template>
  <v-card class="h-full d-flex flex-column">
    <div class="pa-3 flex-grow-1">
      <div class="d-flex align-center flex-column">
        <v-avatar size="150" rounded="0">
          <v-img :src="image" :alt="name" />
          <!-- <v-icon x-large>{{icon}}</v-icon> -->
        </v-avatar>
        <div class="text-center mt-2">
          <span class="font-weight-bold text-h5">{{ name }}</span>
          <div class="secondary--text text--lighten-1 text-caption">
            {{ title }} - {{ porcentaje }}
          </div>
        </div>
        <v-chip v-if="role" small color="accent" class="font-weight-bold mt-2">{{ role }}</v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    // icon: {
    //   type: String,
    //   default: ''
    // },
    name: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    porcentaje: {
      type: Number,
      default: 0
    },
    // phone: {
    //   type: String,
    //   default: ''
    // },
    // email: {
    //   type: String,
    //   default: ''
    // }
  }
}
</script>
