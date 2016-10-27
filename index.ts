
import { Renderer } from './init'
import modules from './modules'
import init from './init'

export { Renderer }

export const toHTML = init([
  modules.attributes,
  modules.class,
  modules.props,
  modules.style,
])

export default toHTML
