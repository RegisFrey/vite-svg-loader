import crypto from 'crypto'
import SVGCompiler from 'svg-baker'
import { compileTemplate } from '@vue/compiler-sfc'
const { stringify } = JSON

const svgCompiler = new SVGCompiler()

export async function svgAsSymbolAndUseComponent (path, optimizedSvg, idPrefix) {
  // Generate unique ID
  idPrefix = idPrefix || 'svg-symbol-'
  const fileHash = crypto.createHash('sha256')
  fileHash.update(optimizedSvg.data)
  const id = idPrefix + fileHash.digest('hex').slice(0, 8)

  // Prepare symbol for spritesheet
  const symbol = await svgCompiler.addSymbol({
    id,
    content: optimizedSvg.data,
    path: path
  })

  // Prepare component for <use>
  const viewbox = `0 0 ${optimizedSvg.info.width} ${optimizedSvg.info.height}`
  const { code } = compileTemplate({
    id: 'svg-use-' + id,
    source: `<svg viewBox="${viewbox}"><use xlink:href="#${id}"/></svg>`,
    filename: path,
    transformAssetUrls: false,
    // compilerOptions: {
      // hoistStatic: false
    // }
  })

  const symbolCode = `
import { addSvgSymbol } from '@vite-svg-loader/loader/runtime/svg-symbol.mjs';

// Symbol Spritesheet
addSvgSymbol(${stringify(symbol.render())}, ${stringify(id)});

// Vue Component
${code}

export default {
    id: ${stringify(id)},
    viewBox: {
        minX: 0,
        minY: 0,
        width: ${optimizedSvg.info.width},
        height: ${optimizedSvg.info.height}
    },
    Component: render 
}`

    return symbolCode
}
