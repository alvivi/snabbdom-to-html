# Snabbdom to HTML

Render [Snabbdom](https://github.com/paldepind/snabbdom) Vnode’s to HTML strings

## Install

With [`npm`](https://www.npmjs.com/) do:

```bash
npm install snabbdom-to-html
```

## Usage

```js
var h = require('snabbdom/h')
var toHTML = require('snabbdom-to-html')

var output = toHTML(
  h('div', { style: { color: 'red' } }, 'The quick brown fox jumps')
)

console.log(output)
// => <div style="color: red">The quick brown fox jumps</div>
```

### Advanced usage

This library is built replicating the modular approach used in Snabbdom. So you can do the following if you need to implement any custom functionality.

```js
var h = require('snabbdom/h')

var init = require('snabbdom-to-html/init')
var modules = require('snabbdom-to-html/modules')
var toHTML = init([
  modules.class,
  modules.props,
  modules.attributes,
  modules.style
])

var output = toHTML(
  h('div', { style: { color: 'lime' } }, 'over the lazy fox')
)

console.log(output)
// => <div style="color: lime">over the lazy fox</div>
```

The `init` function accepts an array of functions (modules). Modules have the following signature: `(vnode, attributes) => undefined`, where `attributes` is a setter/getter kind of function.

You can do `attributes(key, value)` to set an attribute, `attributes(key)` will return that key’s value (or `null` if it doesn’t exist). Calling `attributes()` with no arguments will return an array with the current attributes as `{ key, value }` objects. You can check out the built-in modules to get the idea.

The built-in modules are available from `snabbdom-to-html/modules`, and these are:

- `attributes`
- `class`
- `props`
- `style`

## License

MIT
