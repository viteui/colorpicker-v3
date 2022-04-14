<template>
    <div class="zs-color-picker" ref="colorPicker" v-clickoutside="closePanel" @click="(e) => e.stopPropagation()">
        <!-- 颜色选择入口 -->
        <div class="zs-color-picker-btn" :style="{ ...btnStyle }" @click="openPanel">
            <div class="zs-color-picker-btn-color" :style="{ backgroundColor: showColor, }"></div>
            {{ showColor }}
        </div>

        <!-- 颜色选择面板 -->
        <div :class="[
            'zs-color-picker-panel',
            colorPanelVisible ? 'zs-color-picker-panel__visible' : '',
        ]">
            <div class="panel-header">
                <div class="color-view-bg">
                    <div class="color-view" :style="`background-color: ${showPanelColor}`"></div>
                </div>
                <div class="default-color" @mouseover="hoveColor = defaultColor" @mouseout="hoveColor = null"
                    @click="handleDefaultColor">默认颜色</div>
            </div>

            <div class="panel-main">
                <h3>主题颜色</h3>
                <ul class="theme-color">
                    <li v-for="(color, index) of colorReactive.tColor" :key="index" :style="{ backgroundColor: color }"
                        @mouseover="hoverChangeColor(color)" @mouseout="hoveColor = null" @click="updataValue(color)" />
                </ul>
                <ul class="standard-color">
                    <li v-for="(item, index) of colorPanel" :key="index">
                        <ul>
                            <li v-for="(color, cindex) of item" :key="cindex" :style="{ backgroundColor: color }"
                                @mouseover="hoverChangeColor(color)" @mouseout="hoveColor = null"
                                @click="updataValue(color)" />
                        </ul>
                    </li>
                </ul>

                <h3>标准颜色</h3>
                <ul class="theme-color">
                    <li v-for="(color, index) of bColor" :key="index" :style="{ backgroundColor: color }"
                        @mouseover="hoverChangeColor(color)" @mouseout="hoveColor = null" @click="updataValue(color)" />
                </ul>
                <template v-if="showOpacity">
                    <h3>透明度</h3>
                    <input type="range" max="1" min="0" step="0.0001" v-model="opacity" class="gradient"
                        @input="opacityChange" />
                    {{ opacity }}
                </template>

                <div class="bottom-btn">
                    <h3 @click="triggerHtml5Color" style="cursor: pointer;">更多颜色</h3>
                    <div class="finsh" @click="cllickFinsh">完成</div>
                </div>

                <!-- HTML DOM Color 对象 -->
                <input class="color-input" type="color" ref="html5ColorRef" v-model="colorReactive.html5Color"
                    @change="changeH5Color" @input="changeH5Color" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import clickoutside from '../directives/clickoutside'

export default defineComponent({
    name: 'colorPicker',
    // 自定义 v-click命令
    directives: { clickoutside },
})

</script>
<script lang="ts" setup>
import { reactive } from 'vue'
import { computed, defineComponent, watch } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    // 当前选中的颜色值
    hex: {
        type: [String, undefined],
    },
    modelValue: {
        type: String,
    },
    rgba: {
        type: String,
    },
    // 默认颜色
    defaultColor: {
        type: String,
        default: '#000000',
    },

    // 入口按钮样式
    btnStyle: {
        type: [Object],
    },
    opacity: {
        type: [Number, String],
        default() {
            return 1
        }
    },
    showOpacity: {
        type: Boolean,
        default() {
            return true
        }

    },
    //  标准色
    standardColor: {
        type: Array,
        default() {
            return [
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
        }
    },
    //   主题色
    themeColor: {
        type: Array,
        default() {
            return [
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
        }
    },
})

const colorPanelVisible = ref(false)
// 鼠标经过的颜色块
const hoveColor = ref("")
const html5ColorRef = ref(null)
const opacity = ref(Number(props.opacity))
//  标准色
const bColor = ref(props.standardColor as string[])
// const rgbaColor = ref("")
const colorReactive = reactive({
    // 颜色面板显隐
    visible: false,
    // 用户输入的颜色值
    html5Color: props.hex,

    // 主题颜色
    tColor: props.themeColor as string[],

    // 颜色面板
    colorConfig: [
        ['#7f7f7f', '#f2f2f2'],
        ['#0d0d0d', '#808080'],
        ['#1c1a10', '#ddd8c3'],
        ['#0e243d', '#c6d9f0'],
        ['#233f5e', '#dae5f0'],
        ['#632623', '#f2dbdb'],
        ['#4d602c', '#eaf1de'],
        ['#3f3150', '#e6e0ec'],
        ['#1e5867', '#d9eef3'],
        ['#99490f', '#fee9da'],
    ],

    // 标准颜色
})

// 显示面板颜色
const showPanelColor = ref(hexToRgbaStr(props.hex !== "" && props.hex ? props.hex : props.defaultColor, opacity.value))
if (props.rgba && props.rgba.length) {
    showPanelColor.value = props.rgba
}
watch(hoveColor, () => {
    // console.log("改变了", hoveColor.value)
    if (hoveColor.value) {
        showPanelColor.value = hoveColor.value
    } else {
        showPanelColor.value = showColor.value
    }
})



// const mouseroverColor = (color) => {
//     // console.log(color);
//     hoveColor.value = color
//     // console.log("-----", hoveColor.value)
// }

const colorValue = ref(props.hex !== "" && props.hex ? props.hex : props.defaultColor);

// 展示当前选中的颜色值
const showColor = ref(hexToRgbaStr(props.hex !== "" && props.hex ? props.hex : props.defaultColor, opacity.value))
if (props.rgba && props.rgba.length) {
    showColor.value = props.rgba
}
console.log(showColor.value)
// 颜色面板
const colorPanel = computed(() => {
    const colorArr = []
    for (let color of colorReactive.colorConfig) {
        colorArr.push(gradientValue(color[1], color[0], 5))
    }
    return colorArr
})
// 格式化 hex 颜色值
const parseColor = (hexStr) => {
    if (hexStr.length === 4) {
        hexStr =
            '#' +
            hexStr[1] +
            hexStr[1] +
            hexStr[2] +
            hexStr[2] +
            hexStr[3] +
            hexStr[3]
    } else {
        return hexStr
    }
}
// HEX 转 RGB 颜色
const hexToRgb = (hex) => {
    hex = parseColor(hex)
    const rgb = []
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
    }
    return rgb
}

const emits = defineEmits<{
    (event: "input", value: string): void,
    (event: "change", value: { hex: string, rgba: string }): void,
    (event: "finish", value: { hex: string, rgba: string }): void,
    (event: "update:hex", hex: string): void,
    (event: "update:rgba", rgba: string): void,
    (event: "close", value: { hex: string, rgba: string }): void,
    // (event: "rgbaChange", : string): void,
    (event: "update:modelValue", value: string): void,
}>()

//  hex 转 rgba


function hex2rgbaObj(s) {
    if (/^#?[0-9a-fA-F]{3}$/.test(s)) {
        let b = s.substring(s.length - 1, s.length);
        let g = s.substring(s.length - 2, s.length - 1);
        let r = s.substring(s.length - 3, s.length - 2);
        return hex2rgbaObj(`${r + r}${g + g}${b + b}`);
    }
    if (/^#?[0-9a-fA-F]{4}$/.test(s)) {
        let a = s.substring(s.length - 1, s.length);
        let b = s.substring(s.length - 2, s.length - 1);
        let g = s.substring(s.length - 3, s.length - 2);
        let r = s.substring(s.length - 4, s.length - 3);
        return hex2rgbaObj(`${r + r}${g + g}${b + b}${a + a}`);
    }
    if (/^#?[0-9a-fA-F]{6}$/.test(s)) {
        let b = parseInt('0x' + s.substring(s.length - 2, s.length));
        let g = parseInt('0x' + s.substring(s.length - 4, s.length - 2));
        let r = parseInt('0x' + s.substring(s.length - 6, s.length - 4));
        return { r, g, b, a: 1 };
    }
    if (/^#?[0-9a-fA-F]{8}$/.test(s)) {
        let a = parseInt('0x' + s.substring(s.length - 2, s.length));
        a = a / 255;
        let b = parseInt('0x' + s.substring(s.length - 4, s.length - 2));
        let g = parseInt('0x' + s.substring(s.length - 6, s.length - 4));
        let r = parseInt('0x' + s.substring(s.length - 8, s.length - 6));
        return { r, g, b, a };
    }
}
function hexToRgbaStr(hex, opacity) {
    // console.log(hex)
    const { r, g, b, a } = hex2rgbaObj(hex)

    //  透明度 opacity 优先级 高于 16 进制值
    let alpha = a;
    if (a === 1 && opacity === 1) {
        alpha = 1
    } else if (a !== 1 && opacity === 1) {
        alpha = a
    } else if (a === 1 && opacity !== 1) {
        alpha = opacity
    }
    return `rgba(${r},${g},${b},${alpha})`

    // console.log(hex)
    // if (/^#?[0-9a-fA-F]{3}$/.test(hex)) {
    //     let b = hex.substring(hex.length - 1, hex.length);
    //     let g = hex.substring(hex.length - 2, hex.length - 1);
    //     let r = hex.substring(hex.length - 3, hex.length - 2);
    //     return `rgba(${r},${g},${b},${(opacity / 100).toFixed(3)}`
    // }
    // return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
    //     + parseInt('0x' + hex.slice(5, 7)) + ',' + (opacity / 100).toFixed(3) + ')';
}
// 更新组件的值 value
const updataValue = (hex) => {
    colorValue.value = hex
    showColor.value = hexToRgbaStr(hex, opacity.value)
    showPanelColor.value = hexToRgbaStr(hex, opacity.value)
    emits('input', hex)
    emits('update:hex', hex)
    emits('update:rgba', hexToRgbaStr(hex, opacity.value))
    emits('change', { hex: hex, rgba: hexToRgbaStr(hex, opacity.value) })
    // emits('rgbaChange', hexToRgb(value))
    // emits('update:modelValue', hex)



}
// RGB 颜色 转 HEX 颜色
const rgbToHex = (r, g, b) => {
    const hex = ((r << 16) | (g << 8) | b).toString(16)
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

//  打开面板
const openPanel = () => {
    colorPanelVisible.value = !colorPanelVisible.value
}

// 色块变化
const gradientValue = (startColor, endColor, step) => {
    // 讲 hex 转换为 rgb
    const sColor = hexToRgb(startColor)
    const eColor = hexToRgb(endColor)

    // 计算R\G\B每一步的差值
    const rStep = (eColor[0] - sColor[0]) / step
    const gStep = (eColor[1] - sColor[1]) / step
    const bStep = (eColor[2] - sColor[2]) / step

    const gradientColorArr = []
    // 计算每一步的hex值
    for (let i = 0; i < step; i++) {
        gradientColorArr.push(
            rgbToHex(
                parseInt(rStep * i + sColor[0]),
                parseInt(gStep * i + sColor[1]),
                parseInt(bStep * i + sColor[2])
            )
        )
    }
    return gradientColorArr
}

//  关闭面板
const closePanel = () => {

    colorPanelVisible.value = false
    emits("close", { hex: colorValue.value, rgba: hexToRgbaStr(colorValue.value, opacity.value) })

}

const hoverChangeColor = (color: string) => {
    // 
    // updataValue(color)
    hoveColor.value = hexToRgbaStr(color, opacity.value)
}

const triggerHtml5Color = () => {
    html5ColorRef.value.click()
}
// 设置默认颜色
const handleDefaultColor = () => {

    updataValue(props.defaultColor)
}

const changeH5Color = (e) => {
    updataValue(html5ColorRef.value.value)
}

//  透明度改变时颜色变化
const opacityChange = () => {
    updataValue(colorValue.value)

}

const cllickFinsh = () => {
    colorPanelVisible.value = false
    emits("finish", { hex: colorValue.value, rgba: hexToRgbaStr(colorValue.value, opacity.value) })
}

</script>


<style scoped>
.zs-color-picker {
    position: relative;
    text-align: left;
    font-size: 14px;
    display: inline-block;
    outline: none;
}

/* 颜色面板 初始状态隐藏 */
.zs-color-picker-panel {
    position: absolute;
    width: 190px;
    background: #fff;
    border: 1px solid #ddd;
    visibility: hidden;
    border-radius: 2px;
    margin-top: 2px;
    padding: 10px;
    padding-bottom: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: all 0.3s ease;
    box-sizing: content-box;
}

/*  颜色面板显示状态 */
.zs-color-picker-panel__visible {
    visibility: visible;
    opacity: 1;
    z-index: 1;
}

.zs-color-picker-panel h3 {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 5px;
    line-height: 1;
    color: #333;
}

.zs-color-picker-panel .color-input {
    visibility: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
}

/* 入口按钮， 默认宽高位15px */
.zs-color-picker-btn {
    width: 24px;
    height: 24px;
    /* background-color: #000; */
    cursor: pointer;
    border: 1px solid #eee;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
    background-size: 10px 10px;
    /* border-radius: 5px; */
}

.zs-color-picker-btn .zs-color-picker-btn-color {
    box-sizing: border-box;
    border: 4px solid #fff;

    width: 100%;
    height: 100%;
}

.panel-header {
    overflow: hidden;
    line-height: 29px;
}

.color-view-bg {
    width: 100px;
    height: 30px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
    background-size: 10px 10px;
    float: left;
}

.color-view {
    width: 100px;
    height: 30px;

    transition: background-color 0.3s ease;
}

.default-color {
    width: 80px;
    float: right;
    text-align: center;
    border: 1px solid #ddd;
    cursor: pointer;
    color: #333;
}

.panel-main .theme-color li {
    width: 15px;
    height: 15px;
    display: inline-block;
    margin: 0 2px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.panel-main .theme-color li:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    transform: scale(1.3);
}

.standard-color li {
    width: 15px;
    display: inline-block;
    margin: 0 2px;
}

.standard-color li li {
    display: block;
    width: 15px;
    height: 15px;
    transition: all 0.3s ease;
    margin: 0;
}

.standard-color li li:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    transform: scale(1.3);
}

ul,
li,
ol {
    list-style: none;
    margin: 0;
    padding: 0;
}

.bottom-btn {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.bottom-btn .finsh {
    margin-left: auto;
    background: rgb(0, 162, 255);
    color: #fff;
    cursor: pointer;
    margin-right: 5px;
    padding: 5px 10px;
    border-radius: 2px;
}
</style>