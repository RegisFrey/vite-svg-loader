declare module '@vite-svg-loader/loader' {
  import type { Plugin } from 'vite'
  import type { OptimizeOptions } from 'svgo'
  export interface ViteSvgLoaderOptions {
    /** Enable svgo optimizations. */
    optimize?: boolean,
    /** Configure svgo optimizations. */
    svgoOptions?: OptimizeOptions,
    /** Symbols are given a unique id via hash, this prefix will be added before the hash. */
    symbolIdPrefix?: string,
  }
  function svgLoader(options?: ViteSvgLoaderOptions): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  import type { Component } from 'vue'
  const src: Component
  export default src
}

declare module '*.svg?symbol' {
  import type { Component } from 'vue'
  const src: {
    id: String,
    viewBox: {
      minX: number,
      minY: number,
      width: number,
      height: number
    },
    Component: Component,
  }
  export default src
}

declare module '*.svg?url' {
  const src: String
  export default src
}

declare module '*.svg?raw' {
  const src: String
  export default src
}
