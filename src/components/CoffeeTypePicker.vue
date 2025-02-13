<style scoped>
.picker-container {
  width: min(400px, calc(100dvw - 48px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: #ddd;
}

.picker {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.picker__option {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #565656;
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.picker__option.active {
}

.picker__option-label {
  font-size: 14px;
  font-weight: 500;
  color: #ddd;
}

.picker__option-icon {
  width: 50%;
  height: auto;
}
</style>

<template>
  <div class="picker-container">
    <strong class="label"
      >{{ localization.t('Wybierz rodzaj kawy', 'Select coffee type') }}:</strong
    >
    <div class="picker">
      <button
        class="picker__option"
        :class="{ active: selectedType === 'instant' }"
        @click="selectType('instant')"
      >
        <strong class="picker__option-label">{{
          localization.t('rozpuszczalna', 'instant')
        }}</strong>
        <InstantCoffeeIcon class="picker__option-icon" />
      </button>
      <button
        class="picker__option"
        :class="{ active: selectedType === 'whole-bean' }"
        @click="selectType('whole-bean')"
      >
        <strong class="picker__option-label">{{
          localization.t('ziarnista', 'whole-bean')
        }}</strong>
        <WholeBeanCoffeeIcon class="picker__option-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import localization from '@/localization'
import InstantCoffeeIcon from '@/assets/icons/instant-coffee.svg'
import WholeBeanCoffeeIcon from '@/assets/icons/whole-bean-coffee.svg'

export default {
  name: 'CoffeeTypePicker',
  components: {
    InstantCoffeeIcon,
    WholeBeanCoffeeIcon,
  },
  data() {
    return {
      localization,
      selectedType: 'whole-bean',
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type
    },
  },
}
</script>
