<script lang="ts">
import { type TileData } from '@/types/Tile'
import type { PropType } from 'vue'
export default {
  props: {
    tile: {
      type: Object as PropType<TileData>,
      default: {}
    }
  },
  computed: {
    style() {
      return `background-color: ${this.tile.bgColor}`
    }
  }
}
</script>
<template>
  <a :href="tile.link" target="_blank">
    <div :style="style" class="tileContainer">
      <h3>{{ tile.tileText }}</h3>
    </div>
  </a>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  font-family: Poppins;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}

.tileContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: 1px solid black;
  cursor: pointer;
  width: 100%;
  transition: box-shadow 0.3s;
  aspect-ratio: 1 / 1;
  padding: 0 10px;
}

.tileContainer:hover {
  box-shadow: 0 0 20px rgba(14, 13, 13, 0.2);
}
</style>
