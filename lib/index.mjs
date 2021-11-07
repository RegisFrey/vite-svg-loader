import { promises as fs } from 'fs'

import { optimizeSvg } from './buildtime/optimize.mjs'
import { svgAsComponent } from './buildtime/component.mjs'
import { svgAsSymbolAndUseComponent } from './buildtime/symbol.mjs'

const svgRegex = /\.svg(\?(raw|url|component|symbol))?$/

function svgLoader ({ optimize, svgoOptions, symbolIdPrefix } = { optimize: false, svgoOptions: {}, symbolIdPrefix: "" }) {
  // const { optimize, svgoOptions, symbolIdPrefix } = options

  return {
    name: 'svg-loader',
    enforce: 'pre',

    resolveid (id) {
      if (id.match(svgRegex)) {
        return id
      }
    },

    async load (id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      if (query === 'url') {
        return // Use default svg loader
      }

      const svgFromFile = await fs.readFile(path, 'utf-8')

      if (query === 'raw') {
        return `export default ${JSON.stringify(svgFromFile)}`
      }

      const optimizedSvg = optimizeSvg(svgFromFile, optimize, svgoOptions)

      if (query === 'symbol') {
        return svgAsSymbolAndUseComponent(path, optimizedSvg, symbolIdPrefix)
      }

      // default component case
      return svgAsComponent(path, optimizedSvg)
    }
  }
}

export default svgLoader
