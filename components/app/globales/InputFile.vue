<template>
  <v-file-input
    v-model="vModelValue"
    :label="label"
    :prepend-icon="prependIcon"
    :required="required"
    :multiple="multiple"
    :error-messages="error"
    class="mt-n3"
    :class="error ? 'mb-5' : ''"
    chips
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'InputFile',
  mixins: [vModelForComponent],
  props: {
    label: {
      type: String,
      default: 'Subir archivo',
    },
    prependIcon: {
      type: String,
      default: 'mdi-file-upload',
    },
    multiple: {
      type: Boolean,
      default: false,
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
