//studyHello.name就是main.vue中组件的名字
import ColorPicker from './ColorPicker.vue';
ColorPicker.install = Vue => Vue.component(ColorPicker.name, ColorPicker);
export default ColorPicker;
