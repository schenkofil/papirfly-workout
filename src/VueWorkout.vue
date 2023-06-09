<script lang="ts">
import apiClient from './api/apiClient'
import SettingsButton from './components/SettingsButton.vue'
import SettingsModal from './components/SettingsModal.vue'
import TilesGrid from './components/TilesGrid.vue'
import PageHeading from './components/PageHeading.vue'
import Loader from './components/Loader.vue'
import type { TileData } from './types/Tile'
import type { TitleData } from './types/Titles'

export default {
  components: { SettingsButton, SettingsModal, TilesGrid, PageHeading, Loader },
  data() {
    return {
      isModalShown: false,
      tiles: new Array<TileData>(),
      titles: Object as unknown as TitleData,
      isLoading: false
    }
  },
  methods: {
    toggleModal() {
      this.isModalShown = !this.isModalShown
    },
    reorderTiles() {
      this.tiles.forEach((item, index) => (item.index = index))
    },
    async fetchData() {
      this.isLoading = true
      const responseTiles = await apiClient
        .get('/tiles')
        .then((x) => {
          return x.data
        })
        .catch(function (error) {
          console.log(error.toJSON())
        })
      const responseTitles = await apiClient
        .get('/titles')
        .then((x) => {
          return x.data
        })
        .catch(function (error) {
          console.log(error.toJSON())
        })
      this.tiles = responseTiles.sort((a: TileData, b: TileData) => a.index - b.index)
      this.titles = responseTitles
      this.isLoading = false
    },
    async addTile() {
      try {
        await apiClient.post('/tiles', {
          tileText: 'Tile text',
          bgColor: '#ffffff',
          link: '#',
          index: this.tiles.length + 1
        } as TileData)
      } catch (err) {
        console.log(err)
      }
      this.fetchData()
    },
    async deleteTile(tileId: number) {
      try {
        await apiClient.delete(`/tiles/${tileId}`)
      } catch (err) {
        console.log(err)
      }
      this.fetchData()
    },
    async updateTilesData() {
      this.tiles.forEach(async (x) => {
        await apiClient.put(`/tiles/${x.id}`, x)
      })
    },
    async updateTitlesData() {
      await apiClient.put(`/titles`, this.titles)
    },
    async saveData() {
      this.isLoading = true
      this.reorderTiles()
      this.updateTilesData()
      this.updateTitlesData()
      this.toggleModal()
      this.isLoading = false
    }
  },
  computed: {
    pageTitle() {
      return this.titles.title
    },
    pageSubtitle() {
      return this.titles.subtitle
    }
  },
  async created() {
    this.fetchData()
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <PageHeading :titles="titles" />
    </div>
  </header>

  <main>
    <TilesGrid :tiles="tiles" />
    <SettingsButton @show-modal="toggleModal" />
    <SettingsModal
      v-if="isModalShown"
      :tiles="tiles"
      :titles="titles"
      @close-modal="toggleModal"
      @add-tile="addTile"
      @delete-tile="deleteTile"
      @save-data="saveData"
    />
    <Loader :showLoader="isLoading" />
  </main>
</template>

<style scoped></style>
