import { compileTemplate } from '@vue/compiler-sfc'

export function svgAsComponent (path, optimizedSvg) {
  const { code } = compileTemplate({
    id: JSON.stringify(path),
    source: optimizedSvg.data,
    filename: path,
    transformAssetUrls: false
  })

  return `${code}\nexport default render`
}
