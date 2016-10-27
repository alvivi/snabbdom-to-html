
import { Attributes } from './attributes'
import { forOwn, remove, uniq } from 'lodash'

export default function classModule(vnode: VNode<any>, attributes: Attributes): void {
  const _add: string[] = []
  const _remove: string[] = []
  const classes = vnode.data ? vnode.data.class || {} : {}
  const classAttributes = String(attributes.get('class') || '')
  const existing = classAttributes.length > 0 ? classAttributes.split(' ') : []

  forOwn(classes, (value, key) => {
    // REVIEW: original code says "if (value === true) {", which is equivalent
    //         to if (value), unless the code is also checking for a boolean
    //         value. If that is the case, an explicit boolean checking will be
    //         more readable. 
    if (!key) {
      return
    }
    if (value) {
      _add.push(key)
    } else {
      _remove.push(key)
    }
  })

  const values = remove(uniq(existing.concat(_add)), (value) => {
    return _remove.indexOf(value) < 0
  })

  if (values.length > 0) {
    attributes.set('class', values.join(' '))
  }
}
