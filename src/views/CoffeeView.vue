<style scoped>
.container {
  padding-block: 1rem;
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
  margin-block-start: 1rem;
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
  padding: 8px 16px;
  background-color: #252323;
  border-top: 2px solid #da4453;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions__price {
  font-size: 16px;
  color: #ddd;
}

.actions__buttons {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.actions__btn {
  flex: 1;
  padding: 8px 16px;
  cursor: pointer;
}

.actions__btn--cancel {
  background-color: #da4453;
}

.actions__btn--confirm {
  background-color: green;
}
</style>

<template>
  <div class="container">
    <div class="coffee">
      <h1 class="coffee__name">{{ coffee.name }}</h1>
      <p class="coffee__description">{{ coffee.description }}</p>
      <CoffeeCup :size="250" :ingredients="coffee.ingredients" />
    </div>
    <div class="options">
      <SugarStrengthPicker />
      <CoffeeTypePicker />
    </div>
    <div class="actions">
      <span class="actions__price">
        {{ localization.t('Do zapłaty', 'To pay') }}:
        {{ coffee.price.toFixed(2).replace('.', ',') }} zł
      </span>
      <div class="actions__buttons">
        <button class="actions__btn actions__btn--cancel">
          <span>{{ localization.t('Anuluj', 'Cancel') }}</span>
        </button>
        <button class="actions__btn actions__btn--confirm">
          <span>{{ localization.t('Potwierdź', 'Confirm') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { data as coffeeData } from '@/data'
import localization from '@/localization'
import CoffeeCup from '@/components/CoffeeCup.vue'
import SugarStrengthPicker from '@/components/SugarStrengthPicker.vue'
import CoffeeTypePicker from '@/components/CoffeeTypePicker.vue'

export default {
  name: 'CoffeeView',
  components: { CoffeeCup, SugarStrengthPicker, CoffeeTypePicker },
  data() {
    return {
      localization,
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
  },
}
</script>
