
# [一款支持vue3 的颜色选择器](https://www.npmjs.com/package/colorpicker-v3)

[使用文档](https://colorpickerv3.wcrane.cn/)


![一款支持vue3 的颜色选择器](https://img-blog.csdnimg.cn/img_convert/13354e8ac4d450bcf4cc13fa21a988b4.png)


## 特点
1. 简单易用，UI在原插件基础上优化增加了圆角和过渡动画
2. 提供以 npm 的形式安装提供全局组件
3. 在支持 html5 input[type='color'] 的浏览器实现了「更多颜色」的功能
## 安装
```shell
npm i colorpicker-v3
```


## 使用

### 在main中注册组件
在 `main.js` 文件中引入插件并注册
```js
import { createApp } from 'vue'
import App from './App.vue'
import ColorPicker from 'colorpicker-v3'  // 注册组件
import 'colorpicker-v3/style.css' // 引入样式文件
const app = createApp(App)
app.use(ColorPicker)
app.mount('#app')

```
### 组件中使用
#### vue3 + js
#### 使用 hex 值响应式
> `hex` 本身具有响应式功能,也可以通过 `@change` 事件获取 改变的值 
```html

<template>
  <color-picker @change="change" v-model:hex="hex"></color-picker>
</template>

<script setup>
import { ref } from 'vue';
const hex = ref("#ffffff");
const change = (e) => {
  console.log(e); // {hex: '#ddd8c3', rgba: 'rgba(221,216,195,0.5849)'}
}
</script>

<style>
</style>

 
```

#### 使用 rgba 值响应式
> *  `rgba` 本身具有响应式功能,也可以通过 `@change` 事件获取 改变的值
```html

<template>
  <color-picker @change="change" v-model:rgba="rgba"></color-picker>
</template>

<script setup>
import { ref } from 'vue';
const rgba = ref("rgba(255,0,255,0.5)");

const change = (e) => {
  console.log(e); // {hex: '#ddd8c3', rgba: 'rgba(221,216,195,0.5849)'}
}
</script>

<style>
</style>

 
```



#### 使用 rgba 与 hex 值响应式
> *  `rgba` 与 `hex` 本身具有响应式功能,也可以通过 `@change` 事件获取 改变的值
> * 注意点 此时如果 `hex` 与 `rgba`  都有值时 此时会优先显示  `rgba`  的值

```html

<template>
  <color-picker @change="change" v-model:rgba="rgba" v-model:hex="hex"></color-picker>
</template>

<script setup>
import { ref } from 'vue';
const rgba = ref("rgba(255,0,255,0.5)");
const hex = ref("#ffffff"); 
const change = (e) => {
  console.log(e); // {hex: '#ddd8c3', rgba: 'rgba(221,216,195,0.5849)'}
}
</script>

<style>
</style>

 
```
#### vue+ts+setup
```html
<template>
  <color-picker @change="change" v-model:hex="hex"></color-picker>
</template>

<script setup>
import { ref } from 'vue';
const hex = ref("#ffffff");
const change = (e) => {
  console.log(e); // {hex: '#ddd8c3', rgba: 'rgba(221,216,195,0.5849)'}
}
</script>

<style>
</style>
```

## Props
参数名   |描述  |  类型 | 默认值 |备注
-------- | ----- | ----- | -------- | -----
v-model:hex | 初始化颜色值 |string | #000000 | 使用16进制值
v-model:rgba | 初始化颜色值 |string | rgba(255,0,255,0.5) | 使用RGBA字符串
btnStyle | 设置颜色块样式|Object| -  |  - 
opacity|颜色透明度初始值|numer | 1 | 0~1 数值越小透明度越低
show-opacity|是否显示透明度控制块|boolean| true| 
standard-color|标准色初始化配置|`Array<string>`|[standard-clolor详情](#standard-clolor) | 使用完整的hex16 进制值
theme-color|主题色初始化配置|`Array<string>`|[theme-clolor详情](#theme-clolor) | 使用完整的hex16 进制值
#### <span id="standard-clolor">standard-clolor</span>
```js
const standardClolor = [
  '#c21401',
  '#ff1e02',
  '#ffc12a',
  '#ffff3a',
  '#90cf5b',
  '#00af57',
  '#00afee',
  '#0071be',
  '#00215f',
  '#72349d',
]

```
 [![standardClolor](https://img-blog.csdnimg.cn/img_convert/f085718fb680ac2c14f5a094594026a9.png)](https://imgtu.com/i/HSKaIs)

#### <span id="theme-clolor">主题色theme-clolor</span>
```js
const themeClolor =[
                '#000000',
                '#ffffff',
                '#eeece1',
                '#1e497b',
                '#4e81bb',
                '#e2534d',
                '#9aba60',
                '#8165a0',
                '#47acc5',
                '#f9974c',
            ]
```
[![主题色](https://img-blog.csdnimg.cn/img_convert/4c52585d23f48106e0df45fb852e9433.png)](https://imgtu.com/i/HSMSQf)
##  Events
事件名   |  描述 | 参数 |  返回值
-------- | ----- | -------- | -----
change | 颜色值改变时触发 | data: {hex:string,rgba: string}|  -
finish | 点击完成按钮 | data: {hex:string,rgba: string}|  -
close | 选色面板关闭 | data: {hex:string,rgba: string}|  -



## 使用示例

```html
<template>
  <color-picker
    :hex="color"
    @change="change"
    :standard-color="bColor"
    @close="close"
    @finish="finish"
  ></color-picker>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: ''
})
</script>
<script lang="ts" setup>
const color = ref("")
const colorValue = ref({})

//  颜色值改变
const change = (e) => {
  // console.log("e", e)
  colorValue.value = e
}

// 颜色面板关闭
const close = (e) => {
  console.log("关闭了", e)
}

const finish = (e) => {
  console.log("点击完成", e)
}



const bColor = [
  '#c21401',
  '#ff1e02',
  '#ffc12a',
  '#ffff3a',
  '#90cf5b',
  '#00af57',
  '#00afee',
  '#0071be',
  '#00215f',
  '#72349d',
]
</script>
<style lang="less" scoped>
</style>
```

## 联系作者
### 微信
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-903f47e3-327e-4ce0-9a38-514311eeff89/5da02770-9e4b-4d9e-8a77-c69b833ac9af.png" width="60%">


### QQ：
 1191814251