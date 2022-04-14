

import ColorPicker from './ColorPicker/ColorPicker.vue';
import ColorPicker2 from './ColorPickerV2/ColorPickerV2.vue';


const components = [
    ColorPicker,
    ColorPicker2,
]
const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })

    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }
}