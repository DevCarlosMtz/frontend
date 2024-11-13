<template>
  <v-text-field
    :label="label"
    :prepend-inner-icon="prependInnerIcon"
    type="number"
    step="any"
    outlined
    :required="required"
    v-model="vModelValue"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'InputNumber',
  mixins: [vModelForComponent],
  props: {
    prependInnerIcon: {
      type: String,
      default: 'mdi-numeric',
    },
    label: {
      type: String,
      default: 'Label',
    },
    error: {
      type: Array,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
