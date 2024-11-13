<template>
  <v-text-field
    :label="label"
    prepend-inner-icon="mdi-key"
    outlined
    v-model="vModelValue"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    @click:append="showPasswordComputed = !showPasswordComputed"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :required="required"
  />
</template>

<script>
import vModelForComponentMixin from '~/mixins/vModelForComponent.mixin'

export default {
  name: 'InputPassword',
  mixins: [vModelForComponentMixin],
  props: {
    label: {
      type: String,
      default: 'Contraseña'
    },
    error: {
      type: Array,
      default: null,
    },
    required: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'on'
    }
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
