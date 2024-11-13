/**
 * Con este mixin se puede usar v-model en un componente
 *
 * v-model="vModelValue"
 */
export default {
  props: {
    value: {},
  },
  data() {
    return {
      vModelValue: this.value,
    }
  },
  watch: {
    vModelValue(value) {
      this.$emit('input', value)
    },
    value(value) {
      this.vModelValue = value
    },
  },
}
