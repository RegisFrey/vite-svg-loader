/**
 * Runtime svg spritesheet logic from
 * https://github.com/meowtec/vite-plugin-svg-sprite/blob/f5ab2be26c42b46aad89bb32d143c0c0eaec7123/src/runtime.ts
 *
 * Copyright (c) 2020 Berton Zhu
 * Licensed under the MIT License
 * https://github.com/meowtec/vite-plugin-svg-sprite/blob/main/LICENSE
 */
const spriteIds = []

const svgSpriteRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgSpriteRoot.style.position = 'absolute'
svgSpriteRoot.style.width = '0'
svgSpriteRoot.style.height = '0'

function insertSvgSpriteRoot () {
  document.body.insertBefore(svgSpriteRoot, document.body.firstChild)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertSvgSpriteRoot)
} else {
  insertSvgSpriteRoot()
}

export function addSvgSymbol (symbol, id) {
  if (spriteIds.indexOf(id) > -1 || document.getElementById(id)) {
    console.warn(`Icon #${id} was duplicately registered. It must be globally unique.`)
  }
  spriteIds.push(id)
  svgSpriteRoot.insertAdjacentHTML('beforeend', symbol)
}
