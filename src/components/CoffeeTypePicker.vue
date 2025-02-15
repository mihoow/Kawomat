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
  position: relative;
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
  transition: transform 0.2s ease;
}

.picker__option:hover {
  transform-origin: center;
  transform: scale(1.02);
}

.picker__option-check {
  position: absolute;
  inset-block-start: 8px;
  inset-inline-start: 8px;

  width: 18px;
  height: 18px;
  border: 1px solid black;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.picker__option.active .picker__option-check {
  background-color: green;
  color: white;
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
      <button class="picker__option" :class="{ active: selected === 0 }" @click="selectType(0)">
        <span class="picker__option-check">
          <i v-if="selected === 0" class="bi bi-check"></i>
        </span>
        <strong class="picker__option-label">{{
          localization.t('rozpuszczalna', 'instant')
        }}</strong>
        <InstantCoffeeIcon class="picker__option-icon" />
      </button>
      <button class="picker__option" :class="{ active: selected === 1 }" @click="selectType(1)">
        <span class="picker__option-check">
          <i v-if="selected === 1" class="bi bi-check"></i>
        </span>
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
  props: {
    selected: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localization,
    }
  },
  methods: {
    selectType(option) {
      this.$emit('change', option)
    },
  },
}
</script>
