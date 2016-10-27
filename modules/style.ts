
import { Attributes } from './attributes'
import { assign, escape, forOwn, kebabCase } from 'lodash'

// data.style

export default function styleModule(vnode: VNode<any>, attributes: Attributes): void {
  const values: string[] = []
  const style = vnode.data ? vnode.data.style || {} : {}

  // merge in `delayed` properties
  if (style.delayed) {
    assign(style, style.delayed)
  }

  forOwn(style, (value, key) => {
    // omit hook objects
    if (typeof value === 'string' || typeof value === 'number') {
      values.push(`${kebabCase(key)}: ${escape(String(value))}`)
    }
  })

  if (values.length) {
    attributes.set('style', values.join('; '))
  }
}
