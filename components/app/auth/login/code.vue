<template>
  <v-otp-input placeholder="*" length="8" persistent-placeholder prepend-inner-icon="mdi-email" outlined
    v-model="vModelValue" :error-messages="error" :class="error ? 'mb-5' : ''" />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'code',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null
    },
  }
}
</script>
