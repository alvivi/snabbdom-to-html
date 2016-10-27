
// All SVG children elements, not in this list, should self-close

export interface ElementChecker {
  [selector: string]: true | undefined
}

export const CONTAINER_ELEMENTS: ElementChecker = {
  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
  'a': true,
  'defs': true,
  'g': true,
  'glyph': true,
  'marker': true,
  'mask': true,
  'missing-glyph': true,
  'pattern': true,
  'svg': true,
  'switch': true,
  'symbol': true,

  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
  'desc': true,
  'metadata': true,
  'title': true
}

// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
export const VOID_ELEMENTS: ElementChecker = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
}