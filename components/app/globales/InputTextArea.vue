<template>
  <v-textarea :label="label" :prepend-inner-icon="prependInnerIcon" type="text" outlined v-model="vModelValue"
    :error-messages="error" :class="error ? 'mb-5' : ''" rows="3" :rules="[rules.max(200)]" counter="200" />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'InputText',
  mixins: [vModelForComponent],
  props: {
    prependInnerIcon: {
      type: String,
      default: 'mdi-abjad-hebrew',
    },
    label: {
      type: String,
      default: 'Label',
    },
    error: {
      type: Array,
      default: null,
    },

  },
  data: () => ({
    rules: {
      min: len => v => (v || '').length >= len || `Numero de caracteres minimo, ${len}`,
      max: len => v => (v || '').length <= len || `Numero de caracteres maximo, ${len}`,
    },
  })
}
</script>
