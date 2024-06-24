import { optimize } from 'svgo'

export function optimizeSvg (svg, svgoEnabled, svgoOptions) {
  if (svgoEnabled) {
    return optimize(svg, svgoOptions)
  } else {
    // no-op, but creates metadata (width, height) and same object shape
    return optimize(svg, { plugins: [] })
  }
}