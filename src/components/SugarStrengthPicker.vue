<style scoped>
.picker-container {
  width: min(400px, calc(100dvw - 48px));
  padding-block-end: 39px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
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
}

.picker::before {
  content: '';
  width: calc(100% - 20px);
  height: 2px;
  background-color: #ccc;
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 10px;
  transform: translateY(-50%);
}

.picker__option,
.picker__option-wrapper {
  z-index: 1;
}

.picker__option-wrapper {
  position: relative;
}

.picker__option {
  width: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px #ccc;
  background-color: #565656;
  color: #ddd;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.picker__option--no-sugar {
  position: relative;
  width: 35px;
  height: 35px;
}

.picker__option--no-sugar::after {
  content: '';
  position: absolute;
  inset-block-start: 50%;
  inset-inline: 0;
  transform: translateY(-50%) rotate(-45deg);
  height: 2px;
  background-color: #ccc;
  transition:
    background-color 0.2s ease-in-out,
    height 0.2s ease-in-out;
}

.picker__option.active {
  border-color: green;
  box-shadow: inset 0 0 0 3px green;
}

.picker__option--no-sugar.active::after {
  height: 3px;
  background-color: green;
}

.picker__option-icon {
  width: 16px;
  height: 16px;
  fill: #ccc;
}

.picker__option-label {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 50%;
  transform: translateX(-50%) translateY(4px);
  font-size: 12px;
  color: #ddd;
  text-align: center;
}
</style>

<template>
  <div class="picker-container">
    <strong class="label">{{ localization.t('Ilość cukru', 'Sugar strength') }}:</strong>
    <div class="picker">
      <div class="picker__option-wrapper">
        <button
          class="picker__option picker__option--no-sugar"
          :class="{ active: selectedOption === 0 }"
          @click="selectOption(0)"
        >
          <SugarIcon class="picker__option-icon" />
        </button>
        <span class="picker__option-label">
          {{ localization.t('bez cukru', 'no sugar') }}
        </span>
      </div>
      <button
        class="picker__option"
        :class="{ active: selectedOption === 1 }"
        @click="selectOption(1)"
      >
        <span>1</span>
      </button>
      <button
        class="picker__option"
        :class="{ active: selectedOption === 2 }"
        @click="selectOption(2)"
      >
        <span>2</span>
      </button>
      <div class="picker__option-wrapper">
        <button
          class="picker__option"
          :class="{ active: selectedOption === 3 }"
          @click="selectOption(3)"
        >
          <span>3</span>
        </button>
        <span class="picker__option-label">
          {{ localization.t('dodatkowy cukier', 'additional sugar') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import localization from '@/localization'
import SugarIcon from '@/assets/icons/sugar.svg'

export default {
  name: 'SugarStrengthPicker',
  components: {
    SugarIcon,
  },
  data() {
    return {
      localization,
      selectedOption: 1,
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
    },
  },
}
</script>
