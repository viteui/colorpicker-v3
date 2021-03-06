import { isClient } from '@vueuse/core'
const nodeList = []
const ctx = '@@clickContext'

let startClick
let seed = 0

// if (process.isClient) {

// }
if (isClient) {
    document.addEventListener('mousedown', e => (startClick = e))
    document.addEventListener('mouseup', e => {
        nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
    })
}

function createDocumentHandler(el, binding, vnode) {
    return function (mouseup = {}, mousedown = {}) {
        //  点击当前节点
        if (
            !vnode ||
            !mouseup.target ||
            !mousedown.target ||
            el.contains(mouseup.target) ||
            el.contains(mousedown.target) ||
            el === mouseup.target

        )
            return

        if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
            vnode.context[el[ctx].methodName]()
        } else {
            el[ctx].bindingFn && el[ctx].bindingFn()
        }
    }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
    mounted(el, binding, vnode) {

        nodeList.push(el)
        const id = seed++
        el[ctx] = {
            id,
            documentHandler: createDocumentHandler(el, binding, vnode),
            methodName: binding.expression,
            bindingFn: binding.value
        }
    },

    updated(el, binding, vnode) {
        el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
        el[ctx].methodName = binding.expression
        el[ctx].bindingFn = binding.value
    },

    unmounted(el) {
        let len = nodeList.length

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1)
                break
            }
        }
        delete el[ctx]
    }
}