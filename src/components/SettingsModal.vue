<script lang="ts">
import type { TileData } from '@/types/Tile'
import type { TitleData } from '@/types/Titles'
import { type PropType, toRaw } from 'vue'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: {
    tiles: {
      type: Object as PropType<Array<TileData>>
    },
    titles: {
      type: Object as PropType<TitleData>,
      required: true
    }
  },
  data() {
    return {
      titleValue: this.title,
      subtitleValue: this.subtitle
    }
  },
  computed: {
    tilesData() {
      return this.tiles
    },
    dragOptions() {
      return {
        animation: 200,
        disabled: false
      }
    }
  },
  methods: {
    closeModalClicked() {
      this.$emit('close-modal')
    },
    addTile() {
      this.$emit('add-tile')
    },
    deleteTile(tileId?: number) {
      this.$emit('delete-tile', tileId)
    },
    saveData() {
      this.$emit('save-data')
    }
  }
}
</script>
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModalClicked()">&times;</span>
      <div class="modalContainer">
        <div class="leftSide">
          <span>Tiles</span>
          <br />
          <label for="display">Display:</label>
          <select name="tiles-display" id="display">
            <option value="placement-1">Placement 1</option>
            <option value="placement-2">Placement 2</option>
          </select>
          <div class="flexRow">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" v-model="titles.title" />
          </div>
          <div class="flexRow">
            <label for="subtitle">Subtitle</label>
            <input type="text" name="subtitle" id="subtitle" v-model="titles.subtitle" />
          </div>
          <div class="spacer"></div>
          <button class="updateButton" @click="saveData">Update</button>
        </div>
        <div class="rightSide">
          <div class="flexRow">
            <span>Tiles</span>
            <button class="addButton" @click="addTile()">+ Add</button>
          </div>
          <draggable
            class="tileListWrapper"
            :list="tilesData"
            v-bind="dragOptions"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: 'flip-list'
            }"
            item-key="index"
          >
            <template #item="{ element, index }">
              <li class="tileRow">
                <div class="handle dndButton"></div>
                <input type="color" v-model="element.bgColor" />
                <input type="text" v-model="element.tileText" />
                <input type="text" v-model="element.link" />
                <button @click="deleteTile(element.id)">Delete</button>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  margin: auto;
  border: 1px solid #888;
  width: 70%;
  height: 60%;
  position: relative;
}

.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  padding: 5px 10px;
  top: 0;
  right: 0;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.modalContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  border-radius: 8px;
  overflow: auto;
}
.leftSide {
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
  padding: 20px;
  border-right: 1px solid #e2e7ee;
  background-color: #fff;
}

.rightSide {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 40px 20px 20px 20px;
  background-color: #f9fafb;
  row-gap: 15px;
}

.divider {
  height: 1px;
  margin: 16px 8px 14px 20px;
  background-color: #f1f4f8;
}

.spacer {
  flex-grow: 1;
}

.updateButton {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  height: 40px;
  background-color: #407cff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.updateButton:hover {
  box-shadow: 0 0 15px rgba(14, 13, 13, 0.2);
}
.addButton {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  height: 40px;
  background-color: #407cff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.flexRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}
.tilesList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
}
.tileSetting {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
}

.tileListWrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

li {
  list-style-type: none;
}
.tileRow {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
}
.dndButton {
  width: 10px;
  height: 10px;
  background-color: #407cff;
  cursor: move;
}

@media (max-width: 1200px) {
  .leftSide {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
    border-right: 1px solid #e2e7ee;
    background-color: #fff;
  }
}
</style>
