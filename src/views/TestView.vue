<template>
  <main>
    <h1>Home view</h1>
    <CoffeeCup
      :size="250"
      :ingredients="{
        50: {
          text: 'espresso',
          background: ['#402d20', '#4f3727', '#583d2b', '#634632', '#6f4d36'],
          contrast: 'dark',
        },
        80: {
          text: 'ice cream',
          background: ['#71A6D1', '#85B5D9', '#99C4E1', '#ACD3E8', '#C0E2F0'],
        },
        90: {
          text: 'whipped cream',
          background: ['#FEF3B3', '#FEF7C0', '#FEFCD6', '#FEFEF1', '#FFFEFE'],
        },
        100: {
          text: 'chocolate',
          background: ['#3F0110', '#4B0B0D', '#5B1F07', '#6F3203', '#7B3E00'],
          contrast: 'dark',
        },
      }"
    />
  </main>
</template>

<script>
import CoffeeCup from '@/components/CoffeeCup.vue'

export default {
  name: 'TestView',
  components: { CoffeeCup },
}
</script>
