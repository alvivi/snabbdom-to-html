
import { escape, forOwn } from 'lodash'

// data.attrs

export type AttributeType = string | number
export type Attributes = Map<string, AttributeType>

export default function attrsModule(vnode: VNode<any>, attributes: Attributes): void {
  const attrs = vnode.data ? vnode.data.attrs || {} : {}
  forOwn(attrs, (value, key) => {
    if (key) {
      attributes.set(key, escape(value))
    }
  })
}

// REVIEW: added because if more types are added to the sum type AttributeType
export function isEmptyAttribute(attr: AttributeType): boolean {
  if (typeof attr === 'string') {
    return attr.length <= 0
  }
  return true
}