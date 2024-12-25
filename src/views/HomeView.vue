<template>
  <main>
    <h1>Home view</h1>
    <CoffeeCup :size="800" />
  </main>
</template>

<script>
import CoffeeCup from '@/components/CoffeeCup.vue'

export default {
  components: { CoffeeCup },
}
</script>
