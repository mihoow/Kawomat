<style scoped>
.container {
  padding: 16px;
}

.coffee-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(151px, 1fr));
  gap: 1rem;
}

.coffee-list__item {
  position: relative;
  padding: 0.5rem;
  background-color: #3a3a3a;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.coffee-list__item:hover {
  background-color: #4a4a4a;
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}

.coffee-list__item-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.tag {
  width: max-content;
  padding: 4px 8px;
  background-color: #2e2e2e;
  border-radius: 10px;
  border: 1px solid;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.tag--cold {
  border-color: #20c3d0;
}

.tag--chocolate {
  border-color: #d76e00;
}

.tag--alcohol {
  border-color: #ffb132;
}

.tag svg {
  width: 26px;
  height: auto;
}

.tag__label {
  font-size: 14px;
  color: #fff;
}

.coffee-list__item-name {
  margin-block-end: 0.5rem;
  font-size: 18px;
  line-height: 24px;
  height: 48px;
  text-align: center;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
}

.coffee-list__item-cup {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coffee-list__item-price {
  display: block;
  margin-block-start: 0.5rem;
  font-size: 16px;
  line-height: 1;
  color: #fff;
}

@media (min-width: 768px) {
  .container {
    padding: 24px;
  }

  .coffee-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .coffee-list__item {
    padding-block-end: 1rem;
  }
}

@media (min-width: 1024px) {
  .coffee-list {
    gap: 1.5rem;
  }
}

@media (min-width: 1140px) {
  .container {
    padding: 40px;
  }

  .coffee-list {
    gap: 2rem;
  }
}

@media (min-width: 1200px) {
  .coffee-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 1440px) {
  .coffee-list {
    gap: 3rem;
  }

  .coffee-list__item-name {
    font-size: 20px;
    line-height: 28px;
    height: 56px;
  }

  .coffee-list__item-price {
    font-size: 18px;
  }
}
</style>

<template>
  <div class="container">
    <div class="limiter">
      <div class="coffee-list">
        <router-link
          v-for="coffee in coffeeList"
          :key="coffee.id"
          :to="`/menu/${coffee.id}`"
          class="coffee-list__item"
        >
          <div class="coffee-list__item-tags">
            <div class="tag tag--cold" v-if="coffee.tags.includes('cold')">
              <ColdIcon />
              <span class="tag__label">
                {{ localization.t('na zimno', 'iced') }}
              </span>
            </div>
            <div class="tag tag--chocolate" v-if="coffee.tags.includes('chocolate')">
              <ChocolateIcon />
              <span class="tag__label">
                {{ localization.t('z czekoladą', 'with chocolate') }}
              </span>
            </div>
            <div class="tag tag--alcohol" v-if="coffee.tags.includes('alcohol')">
              <AlcoholIcon />
              <span class="tag__label">
                {{ localization.t('z alkoholem', 'with alcohol') }}
              </span>
            </div>
          </div>
          <strong class="coffee-list__item-name">
            {{ localization.t(coffee.name) }}
          </strong>
          <div class="coffee-list__item-cup">
            <CoffeeCup :size="130" />
          </div>
          <span class="coffee-list__item-price">
            {{ localization.formatPrice(coffee.price) }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import localization from '@/localization'
import { data as coffeeData } from '@/data'

import CoffeeCup from '@/components/CoffeeCup.vue'
import ColdIcon from '@/assets/icons/cold.svg'
import ChocolateIcon from '@/assets/icons/chocolate.svg'
import AlcoholIcon from '@/assets/icons/alcohol2.svg'

export default {
  name: 'MenuView',
  components: {
    CoffeeCup,
    ColdIcon,
    ChocolateIcon,
    AlcoholIcon,
  },
  data() {
    return {
      coffeeList: coffeeData.sort((a, b) => b.popularity - a.popularity),
      localization,
    }
  },
}
</script>
