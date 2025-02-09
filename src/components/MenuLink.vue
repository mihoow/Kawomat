<style scoped>
.menu-link {
  position: relative;
  z-index: 2;

  width: 144px;
  height: 60px;
  background-color: rgba(122, 159, 191, 0.8);
  border-block: 1px solid rgb(92, 129, 161);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.menu-link::before,
.menu-link::after {
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  inset-block: -1px;
  width: 50px;
  border-radius: 100%;
  background-color: rgba(122, 159, 191, 0.8);
}

.menu-link::before {
  right: 100%;
  transform: translateX(50%);
  clip-path: inset(0 50% 0 0);
  border: 1px solid rgb(92, 129, 161);
}

.menu-link::after {
  left: 100%;
  transform: translateX(-50%);
  clip-path: inset(0 0 0 50%);
  border: 1px solid rgb(92, 129, 161);
}

.menu-link span {
  font-size: 14px;
  line-height: 1.2;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
}

.menu-link__icon {
  width: 71px;
  height: 50px;
  transform-origin: center;
  transform: translateX(12px) rotate(-45deg);
}

@media (min-width: 768px) {
  .menu-link {
    width: 180px;
  }

  .menu-link span {
    font-size: 18px;
  }
}
</style>

<template>
  <router-link class="menu-link" to="/menu">
    <span>Przejdź<br />do menu</span>
    <HandTapIcon aria-hidden class="menu-link__icon" />
  </router-link>
</template>

<script>
import HandTapIcon from '@/assets/icons/hand-tap.svg'

export default {
  name: 'MenuLink',
  components: {
    HandTapIcon,
  },
}
</script>
