<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  width: 90%;
  max-width: 400px;
  background-color: #252323;
  color: #f6f6a2;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

.modal__title {
  font-size: 22px;
  margin-block-end: 16px;
}

.modal__image {
  width: 100%;
  max-width: 200px;
  margin: 0 auto 16px;
  display: block;
  border-radius: 10px;
}

.modal__text {
  font-size: 18px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active .modal,
.v-leave-active .modal {
  transition: transform 0.3s;
}

.v-enter-from .modal,
.v-leave-to .modal {
  transform: scale(0.8);
}
</style>

<template>
  <Transition @after-enter="afterEnter">
    <div class="modal-overlay" v-if="show">
      <div class="modal">
        <h2 class="modal__title">{{ localization.t('Kawa gotowa!', 'Coffee ready!') }}</h2>
        <img
          src="/images/coffee-grabbin.webp"
          :alt="localization.t('Odbierz swoją kawę', 'Grab your coffee')"
          class="modal__image"
          height="200"
        />
        <p class="modal__text">
          {{ localization.t('Życzymy smacznego!', 'Enjoy!') }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script>
import localization from '@/localization'
import store from '@/store'

export default {
  name: 'CoffeeReadyModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localization,
      timerId: null,
    }
  },
  methods: {
    afterEnter() {
      this.timerId = setTimeout(() => {
        store.reset()
        this.$router.push('/')
      }, 6000)
    },
  },
  beforeUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  },
}
</script>
