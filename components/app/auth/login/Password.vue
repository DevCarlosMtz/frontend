<template>
  <v-text-field
    placeholder="Contraseña"
    prepend-inner-icon="mdi-key"
    outlined
    v-model="vModelValue"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    @click:append="showPasswordComputed = !showPasswordComputed"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
  />
</template>

<script>
import vModelForComponentMixin from '~/mixins/vModelForComponent.mixin'

export default {
  name: 'Password',
  mixins: [vModelForComponentMixin],
  props: {
    error: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    showPassword: false
  }),
  computed: {
    showPasswordComputed: {
      get() {
        return this.showPassword
      },
      set(value) {
        this.showPassword = value
      },
    },
  },
}
</script>
