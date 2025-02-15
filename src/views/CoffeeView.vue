<style scoped>
.container {
  min-height: calc(100dvh - var(--header-height) - var(--footer-height));
  padding-block-start: 1rem;
}

.main-content {
  margin-inline: auto;
  max-width: 1440px;
  width: 100%;
}

.coffee {
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coffee__name {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: bold;
  color: #f5e3c3;
  text-transform: uppercase;
}

.coffee__description {
  margin-block-end: 1rem;
  max-width: 600px;
  font-size: clamp(16px, 2.5vw, 22px);
  color: #ddd;
  line-height: 1.5;
  text-align: center;
}

.options {
  margin-block: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #2e2e2e;
}

.actions {
  position: sticky;
  bottom: 0;
  z-index: 100;
  padding: 12px 24px 16px;
  background-color: #2e2e2e;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.4);
}

.actions-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions__price {
  margin-block-end: 8px;
  font-size: 16px;
  color: #ddd;
}

.actions__price strong {
  font-size: 16px;
  color: #f5e3c3;
}

.actions__buttons {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.actions__btn {
  padding: 8px 16px;
  border-radius: 9999px;
  line-height: 1;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.actions__btn:hover {
  transform-origin: center;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.actions__btn-icon {
  font-size: 24px;
}

.actions__btn-text {
  font-size: 16px;
}

.actions__btn--cancel {
  background-color: #da4453;
  color: #000;
}

.actions__btn--confirm {
  background-color: #008000;
  color: #fff;
}

@media (min-width: 480px) {
  .actions {
    padding-block-start: 16px;
  }

  .actions__price {
    font-size: 20px;
  }

  .actions__price strong {
    font-size: 20px;
  }

  .actions-inner {
    flex-direction: row;
    align-items: center;
  }

  .actions__price {
    margin-block-end: 0;
    width: 100%;
    line-height: 1;
  }

  .actions__buttons {
    width: fit-content;
    gap: 4rem;
  }
}

@media (min-width: 600px) {
  .options {
    margin-inline: auto;
    width: fit-content;
    padding-inline: 3rem;
    border-radius: 10px;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .coffee {
    flex-grow: 1;
    padding: 24px;
    justify-content: center;
  }

  .coffee__description {
    margin-block-end: 2rem;
  }

  .options {
    margin: 0;
    border-radius: 0;
    justify-content: center;
    gap: 90px;
  }

  .picker-container {
    width: 300px;
  }

  .actions__buttons {
    min-width: 342px;
    gap: 3rem;
    justify-content: center;
  }
}

@media (min-width: 834px) {
}

@media (min-width: 900px) {
  .picker-container {
    width: 400px;
  }

  .actions__buttons {
    min-width: 442px;
    gap: 4rem;
  }
}

@media (min-width: 1024px) {
  .options {
    border-radius: 0 0 0 10px;
  }

  .actions {
    margin: 1.5rem 0 1.5rem 24px;
    width: calc(100dvw - 490px);
    border-radius: 10px;
  }

  .actions-inner {
    justify-content: space-between;
  }

  .actions__price {
    position: static;
    transform: translateY(0);
  }

  .actions__buttons {
    min-width: unset;
    gap: 2rem;
  }
}

@media (min-width: 1140px) {
  .actions {
    margin-inline-start: 40px;
    max-width: 610px;
  }
}

@media (min-width: 1200px) {
  .coffee {
    padding-inline: 40px;
  }

  .actions {
    margin-inline-start: 0;
    position: relative;
    inset-inline-start: calc((100dvw - 490px - 40px) / 2);
    transform: translateX(-50%);
  }
}

@media (min-width: 1440px) {
  .container {
    padding-block-start: 40px;
    padding-inline: 40px;
  }

  .coffee {
    padding-block: 0;
  }

  .options {
    border-radius: 10px;
  }
}
</style>

<template>
  <div class="container">
    <div class="main-content">
      <div class="coffee">
        <h1 class="coffee__name">{{ coffee.name }}</h1>
        <p class="coffee__description">{{ coffee.description }}</p>
        <CoffeeCup :size="cupSize" :ingredients="coffee.ingredients" />
      </div>
      <div class="options">
        <SugarStrengthPicker :selected="sugarStrength" @change="setSugarStrength" />
        <CoffeeTypePicker :selected="coffeeType" @change="setCoffeeType" />
      </div>
    </div>
    <div class="actions">
      <div class="actions-inner">
        <span class="actions__price">
          {{ localization.t('Do zapłaty', 'To pay') }}:
          <strong> {{ localization.formatPrice(totalPrice) }} </strong>
        </span>
        <div class="actions__buttons">
          <button class="actions__btn actions__btn--cancel" @click="cancel">
            <i class="bi bi-x actions__btn-icon" />
            <span class="actions__btn-text">{{ localization.t('Anuluj', 'Cancel') }}</span>
          </button>
          <button class="actions__btn actions__btn--confirm" @click="confirm">
            <i class="bi bi-check actions__btn-icon" />
            <span class="actions__btn-text">{{ localization.t('Potwierdź', 'Confirm') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data as coffeeData } from '@/data'
import localization from '@/localization'
import store from '@/store'

import CoffeeCup from '@/components/CoffeeCup.vue'
import SugarStrengthPicker from '@/components/SugarStrengthPicker.vue'
import CoffeeTypePicker from '@/components/CoffeeTypePicker.vue'

export default {
  name: 'CoffeeView',
  components: { CoffeeCup, SugarStrengthPicker, CoffeeTypePicker },
  data() {
    return {
      localization,
      cupSize: this.calculateCupSize(),
      sugarStrength: 0,
      coffeeType: 0,
    }
  },
  methods: {
    transformIngredients(ingredients, locale = 'pl') {
      return ingredients.reduceRight(
        (acc, ingredient) => {
          // Calculate the percentage position from the top
          acc.currentPercentage += ingredient.percentage

          acc.result[acc.currentPercentage] = {
            name: ingredient.name[locale],
            colors: ingredient.colors,
            contrast: ingredient.contrast,
          }

          return acc
        },
        { result: {}, currentPercentage: 0 },
      ).result
    },
    calculateCupSize() {
      if (window.innerWidth >= 1440) {
        return 350
      }

      if (window.innerWidth >= 1024) {
        return 300
      }

      return 250
    },
    handleWindowResize() {
      this.cupSize = this.calculateCupSize()
    },
    setSugarStrength(strength) {
      this.sugarStrength = strength
    },
    setCoffeeType(type) {
      this.coffeeType = type
    },
    cancel() {
      this.$router.push('/menu')
    },
    confirm() {
      store.makeOrder(this.coffee.id, this.totalPrice)
      this.$router.push(`/menu/${this.$route.params.id}/loading`)
    },
  },
  computed: {
    coffee() {
      const rawCoffee = coffeeData.find((coffee) => coffee.id === this.$route.params.id)

      if (!rawCoffee || !rawCoffee.available) return null

      return {
        ...rawCoffee,
        name: this.localization.t(rawCoffee.name),
        description: this.localization.t(rawCoffee.description),
        ingredients: this.transformIngredients(
          rawCoffee.ingredients,
          this.localization.currentLocale,
        ),
      }
    },
    totalPrice() {
      return this.coffee.price + this.sugarStrength * 0.25 + this.coffeeType * 0.5
    },
  },
  mounted() {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
}
</script>
