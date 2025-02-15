<style scoped>
main {
  width: 100%;
  min-height: 100dvh;
  background: linear-gradient(to bottom, #bfcde2, #c0cdd3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.text-container {
  flex-grow: 1;
  margin-block-start: 16px;
  text-align: center;
  font-weight: 700;
}

.text-container .small-text {
  font-size: 14px;
  line-height: 1.33;
}

.text-container span {
  display: block;
  font-size: 32px;
  line-height: 36px;
}

.text-container .highlight {
  background: black;
  color: white;
  display: inline-block;
  padding: 5px 10px;
}

.bottom-container {
  margin-block-end: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

@media (min-width: 360px) {
  .bottom-container {
    margin-block-end: 16px;
  }
}

@media (min-width: 414px) {
  .text-container {
    margin-block-start: 30px;
  }

  .text-container .small-text {
    font-size: 15px;
  }

  .text-container span {
    font-size: 44px;
    line-height: 48px;
  }

  .bottom-container {
    margin-block-end: 24px;
  }
}

@media (min-width: 768px) {
  main {
    padding: 24px;
    align-items: center;
    gap: 40px;
  }

  .text-container {
    flex-grow: 0;
    margin-block-start: 0;
  }

  .text-container span {
    font-size: 51px;
    line-height: 56px;
  }

  .bottom-container {
    margin-block-end: 0;
  }

  .bottom-container img {
    width: 400px;
  }
}

@media (min-width: 834px) {
  main {
    gap: 60px;
  }
}

@media (min-width: 1024px) {
  main {
    padding: 40px;
  }

  .text-container .small-text {
    font-size: 18px;
  }

  .text-container span {
    font-size: 60px;
    line-height: 64px;
  }

  .bottom-container {
    gap: 40px;
  }
}
</style>

<template>
  <main @click="navigateToMenu">
    <div class="text-container">
      <p class="small-text">w naszych automatach</p>
      <span>SPRÓBUJ</span>
      <span class="highlight">PRAWDZIWEGO</span>
      <span>AROMATU</span>
      <span class="highlight">ŚWIEŻO</span>
      <span>ZMIELONEGO</span>
      <span>ZIARNA</span>
    </div>
    <div class="bottom-container">
      <MenuLink />
      <img src="/images/beans2.png" alt="coffee beans" width="300" />
    </div>
  </main>
</template>

<script>
import MenuLink from '@/components/MenuLink.vue'

export default {
  name: 'HomeView',
  components: { MenuLink },
  methods: {
    navigateToMenu() {
      this.$router.push('/menu')
    },
  },
}
</script>
