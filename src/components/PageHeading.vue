<script lang="ts">
import { type TitleData } from '@/types/Titles'
import type { PropType } from 'vue'

export default {
  props: {
    titles: {
      type: Object as PropType<TitleData>
    }
  },
  computed: {
    extraTextUpperCase(): string {
      return this.titles?.subtitle ? this.titles.subtitle.toUpperCase() : ''
    },
    headingTextFirstLetterUpper(): string {
      return this.titles?.title
        ? `${this.titles.title.charAt(0).toUpperCase()}${this.titles.title
            .slice(1)
            .toLocaleLowerCase()}`
        : ''
    }
  }
}
</script>
<template>
  <div class="headingContainer">
    <span class="extraText">{{ extraTextUpperCase }}</span>
    <h1 class="headingText">{{ headingTextFirstLetterUpper }}</h1>
  </div>
</template>

<style scoped lang="scss">
.headingContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.extraText {
  font-size: $heading-extra-text--font-size;
  font-weight: $heading-extra-text--font-weight;
  letter-spacing: $heading-extra-text--letter-spacing;
  color: $heading-extra-text--color;
}

.headingText {
  font-size: $heading-text--font-size;
  font-weight: $heading-text--font-weight;
  letter-spacing: $heading-text--letter-spacing;
  color: $heading-text--color;
  margin: $heading-text--margin;
  text-align: center;
}
</style>
