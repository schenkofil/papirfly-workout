<script lang="ts">
import { type TileData } from '@/types/Tile'
import ColorTile from './ColorTile.vue'

export default {
  props: {
    tilesRatio: String,
    tiles: Array<TileData>
  },
  components: { ColorTile }
}
</script>
<template>
  <ul class="tilesContainer">
    <li v-for="tile in tiles" :key="tile.id">
      <ColorTile :tile="tile" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tilesWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tilesContainer {
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  text-align: center;
  padding: 40px 15%;
  align-items: stretch;
  align-content: stretch;
}
.li {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .tilesContainer {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    row-gap: 30px;
    text-align: center;
    padding: 40px 15%;
    align-items: stretch;
    align-content: stretch;
  }
}
@media (max-width: 400px) {
  .tilesContainer {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 30px;
    row-gap: 30px;
    text-align: center;
    padding: 40px 15%;
    align-items: stretch;
    align-content: stretch;
  }
}
</style>
