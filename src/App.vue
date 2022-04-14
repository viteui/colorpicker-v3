<template>

  <color-picker opacity="1" v-model:hex="hex" @change="change" v-model:rgba="rgba"></color-picker>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColorPicker from '../packages/ColorPicker/ColorPicker.vue'
import ColorPickerV2 from '../packages/ColorPickerV2/ColorPickerV2.vue'

export default defineComponent({
  components: { ColorPicker, ColorPickerV2 },
  name: ''
})
</script>
<script lang="ts" setup>
// const color = ref("#f0f")
const hex = ref("#6c8198")
const rgba = ref("rgba(255,0,255,0.5)")
const value = ref("")
const change = (e) => {
  console.log(e, hex.value, rgba.value)
}
</script>
<style lang="less" scoped>
</style>