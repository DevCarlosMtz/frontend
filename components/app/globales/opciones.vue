<template>
    <v-select v-model="vModelValue" :items="items" :error-messages="error" :class="error ? 'mb-5' : ''" :label="label"
      outlined required item-text="text" item-value="value" />
  </template>
  
  <script>
  import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'
  
  export default {
    name: '',
    mixins: [vModelForComponent],
    props: {
      error: {
        type: Array,
        default: null,
      },
      label: {
        type: String,
        default: 'Label',
      },
    },
  
    data: () => ({
      items: [
        { text: 'PASA', value: 'PASA' },
        { text: 'NO PASA', value: 'NO APLICA' },
        { text: 'NO APLICA', value: 'NO PASA' },
      ],
    }),
  }
  </script>
  