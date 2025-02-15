<style scoped>
.menu-link {
  width: 172px;
  height: 60px;
  background-color: rgba(122, 159, 191, 0.8);
  border: 1px solid rgb(92, 129, 161);
  border-radius: 9999px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
    width: 200px;
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
