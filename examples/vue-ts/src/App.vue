<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import HelloWorld from "./components/HelloWorld.vue";
import Test from "./assets/test.svg?component";
import testUrl from "./assets/test.svg?url";
import testRaw from "./assets/test.svg?raw";
import testSymbol from './assets/test.svg?symbol';

const name = "circle";
const Async = defineAsyncComponent(() => import(`./assets/${name}.svg`));
</script>

<template>
  <div id="component">
    <h2>Component</h2>
    <Test class="test-svg" />
  </div>

  <div id="symbol">
    <h2>Symbol</h2>
    {{ testSymbol }}
    <component :is="testSymbol.Component" :width="testSymbol.viewBox.width" :height="testSymbol.viewBox.height"/>
  </div>

  <div id="image">
    <h2>Image</h2>
    <img src="./assets/test.svg?url">
  </div>

  <div id="async">
    <h2>Async</h2>
    <Async />
  </div>

  <div id="url">
    <h2>Url</h2>
    <div id="url-value">{{ testUrl }}</div>
  </div>

  <div id="raw">
    <h2>Raw</h2>
    <div id="raw-value">{{ testRaw }}</div>
  </div>

  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
