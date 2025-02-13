<style scoped>
.container {
  padding: 1rem;
}

.coffee-list {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
  gap: 1rem;
}

.coffee-list__item {
  --gap: 1rem;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
}

.coffee-list__item::before,
.coffee-list__item::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
}

.coffee-list__item::before {
  inset-block-start: calc(48px + (var(--gap) / 2));
  inset-inline-end: calc(-1 * var(--gap) / 2);
  transform: translateX(50%);
  width: 1px;
  height: calc(100% - 48px - 24px - (var(--gap) / 2));
}

.coffee-list__item::after {
  inset-block-end: calc(-1 * var(--gap) / 2);
  inset-inline-start: 10%;
  transform: translateY(-50%);
  width: 80%;
  height: 1px;
}

.coffee-list__item-name {
  font-size: 18px;
  line-height: 24px;
  height: 48px;
  text-align: center;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
}

.coffee-list__item-price {
  font-size: 16px;
  line-height: 24px;
  color: #fff;
}

@media (min-width: 768px) {
  .coffee-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .coffee-list__item {
    --gap: 1.25rem;
  }
}
</style>

<template>
  <div class="container">
    <div class="coffee-list">
      <router-link
        v-for="coffee in coffeeList"
        :key="coffee.id"
        :to="`/menu/${coffee.id}`"
        class="coffee-list__item"
      >
        <strong class="coffee-list__item-name">
          {{ localization.t(coffee.name) }}
        </strong>
        <CoffeeCup :size="130" />
        <span class="coffee-list__item-price">
          {{ coffee.price.toFixed(2).replace('.', ',') }} zł
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import localization from '@/localization'
import { data as coffeeData } from '@/data'
import CoffeeCup from '@/components/CoffeeCup.vue'

export default {
  name: 'MenuView',
  components: {
    CoffeeCup,
  },
  data() {
    return {
      coffeeList: coffeeData.sort((a, b) => b.popularity - a.popularity),
      localization,
    }
  },
}
</script>
