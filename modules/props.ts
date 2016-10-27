
import { Attributes } from './attributes'
import { escape, forOwn } from 'lodash'

// data.props

export default function propsModule(vnode: VNode<any>, attributes: Attributes): void {
  const props = vnode.data ? vnode.data.props || {} : {}

  forOwn(props, (value, key) => {
    if (!key) {
      return
    }
    if (omit.indexOf(key) > -1) {
      return
    }
    if (key === 'htmlFor') {
      key = 'for'
    }
    if (key === 'className') {
      key = 'class'
    }

    attributes.set(key.toLowerCase(), escape(value))
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/element
const omit = [
  'attributes',
  'childElementCount',
  'children',
  'classList',
  'clientHeight',
  'clientLeft',
  'clientTop',
  'clientWidth',
  'currentStyle',
  'firstElementChild',
  'innerHTML',
  'lastElementChild',
  'nextElementSibling',
  'ongotpointercapture',
  'onlostpointercapture',
  'onwheel',
  'outerHTML',
  'previousElementSibling',
  'runtimeStyle',
  'scrollHeight',
  'scrollLeft',
  'scrollLeftMax',
  'scrollTop',
  'scrollTopMax',
  'scrollWidth',
  'tabStop',
  'tagName'
]
