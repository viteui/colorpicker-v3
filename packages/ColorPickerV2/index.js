//studyHello.name就是main.vue中组件的名字
import ColorPicker from './ColorPicker.vue';
ColorPicker.install = Vue => Vue.component(ColorPicker.name, ColorPicker);
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default ColorPicker;
