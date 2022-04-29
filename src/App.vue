<template>

  <color-picker opacity="1" :defaultColor="defaultColor" v-model:hex="hex" @change="change" v-model:rgba="rgba">
  </color-picker>
  <input v-model="rgba" placeholder="" @input="inputChange" placeholder-class="input-placeholder" />
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
const hex = ref("")
const rgba = ref("rgba(255,0,255,0.5)");
const defaultColor = ref("#6c8198")
const value = ref("")
const change = (e) => {
  console.log(e, hex.value, rgba.value)
}
const inputChange = (e) => {
  // console.log(e.target.value)
  // console.log(hex.value)
}
</script>
<style lang="less" scoped>
</style>