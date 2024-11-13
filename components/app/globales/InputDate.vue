<template>
  <v-text-field :label="label" :prepend-inner-icon="prependInnerIcon" type="date" outlined v-model="vModelValue"
    :error-messages="error" :class="error ? 'mb-5'
    : ''" />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'InputText',
  mixins: [vModelForComponent],
  props: {
    prependInnerIcon: {
      type: String,
      default: 'mdi-calendar-blank-multiple',
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
