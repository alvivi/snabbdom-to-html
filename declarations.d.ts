
declare module 'parse-sel' {
  function parseSelector(selector: String, upper?: boolean): Element
  export = parseSelector
}

// Snabbdom declarations, which are needed to avoid a run-time dependency.

declare interface VNode<E extends Element> {
  children?: (VNode<any> | string)[]
  data?: VNodeData<E>
  elm?: E | Text
  key?: string | number
  sel?: string // BUG: Snabbdom sel field is not optional
  text?: string
}

declare interface VNodeData<E extends Element> {
  // Modules
  attrs?: any
  class?: any
  hero?: any
  on?: any
  props?: any
  style?: any

  // Thunks
  args?: any[]
  fn?: () => VNode<E>

  hook?: Hooks
  key?: string | number
  ns?: string

  // Cycle.js only
  isolate?: string
  static?: boolean
}

declare interface Hooks {
  pre?: PreHook
  init?: InitHook
  create?: CreateHook
  insert?: InsertHook
  prepatch?: PrePatchHook
  update?: UpdateHook
  postpatch?: PostPatchHook
  destroy?: DestroyHook
  remove?: RemoveHook
  post?: PostHook
}

declare type PreHook = () => any
declare type InitHook = (vNode: VNode<any>) => any
declare type CreateHook = (emptyVNode: VNode<any>, vNode: VNode<any>) => any
declare type InsertHook = (vNode: VNode<any>) => any
declare type PrePatchHook = (oldVNode: VNode<any>, vNode: VNode<any>) => any
declare type UpdateHook = (oldVNode: VNode<any>, vNode: VNode<any>) => any
declare type PostPatchHook = (oldVNode: VNode<any>, vNode: VNode<any>) => any
declare type DestroyHook = (vNode: VNode<any>) => any
declare type RemoveHook = (vNode: VNode<any>, removeCallback: () => void) => any
declare type PostHook = () => any
