
import { Attributes, isEmptyAttribute } from './modules/attributes'
import { CONTAINER_ELEMENTS, VOID_ELEMENTS } from './elements'
import parseSelector = require('parse-sel')

export type Module = (node: VNode<any>, attrs: Attributes) => void
export type Renderer = (node: VNode<any>) => string

export default function init(modules: Module[]): Renderer {
  function parse(vnode: VNode<any>, node: Element): string {
    const result: string[] = []
    const attributes = new Map([
      ['id', node.id],
      ['class', node.className]
    ])

    modules.forEach(fn => fn(vnode, attributes))
    attributes.forEach((value, key) => {
      if (!isEmptyAttribute(value)) {
        result.push(`${key}="${value}"`)
      }
    })

    return result.join(' ')
  }

  return function renderToString(vnode: VNode<any>): string {
    if (!vnode.sel) {
      return vnode.text || ''
    }

    vnode.data = vnode.data || {}

    // Support thunks
    if (
      vnode.data.hook &&
      typeof vnode.data.hook.init === 'function' &&
      typeof vnode.data.fn === 'function'
    ) {
      vnode.data.hook.init(vnode)
    }

    const node = parseSelector(vnode.sel)
    const tagName = node.tagName
    const attributes = parse(vnode, node)
    const isSVG = vnode.data.ns === 'http://www.w3.org/2000/svg'
    const tag: string[] = []

    // Open tag
    tag.push(`<${tagName}`)
    if (attributes.length > 0) {
      tag.push(` ${attributes}`)
    }
    if (isSVG && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /')
    }
    tag.push('>')

    // Close tag, if needed
    if ((!isSVG && VOID_ELEMENTS[tagName] !== true) ||
      (isSVG && CONTAINER_ELEMENTS[tagName] === true)
    ) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML)
      } else if (vnode.text) {
        tag.push(vnode.text)
      } else if (vnode.children) {
        vnode.children.forEach(child =>
          tag.push(renderToString(child)))
      }
      tag.push(`</${tagName}>`)
    }

    return tag.join('')
  }
}
