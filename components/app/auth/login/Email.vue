<template>
  <v-text-field
    placeholder="Correo electrónico"
    persistent-placeholder
    prepend-inner-icon="mdi-email"
    type="email"
    outlined
    required
    v-model="vModelValue"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Email',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null
    },
  }
}
</script>
