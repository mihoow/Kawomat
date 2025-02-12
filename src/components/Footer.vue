<style scoped>
footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
  padding: 16px 8px 8px;
}

footer::before {
  content: '';
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 16px;
  inset-inline-end: 16px;
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.8),
    #da4453,
    rgba(255, 255, 255, 0.8)
  );
  border-radius: 50%;
}

.locale-button {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.locale-button.active {
  opacity: 1;
}
</style>
<template>
  <footer>
    <button
      class="locale-button"
      :class="{ active: localization.currentLocale === 'pl' }"
      @click="setLocale('pl')"
    >
      <img src="/images/pl.png" alt="Polish" width="50" height="31" />
    </button>
    <button
      class="locale-button"
      :class="{ active: localization.currentLocale === 'en' }"
      @click="setLocale('en')"
    >
      <img src="/images/en.png" alt="English" width="50" height="31" />
    </button>
  </footer>
</template>

<script>
import localization from '@/localization'

export default {
  name: 'MenuView',
  data() {
    return {
      localization,
      intervalId: null,
      timestamp: new Date(),
    }
  },
  methods: {
    setLocale(locale) {
      localization.setLocale(locale)
    },
    goBack() {
      this.$router.go(-1)
    },
    getFormattedTimestamp(now) {
      const daysOfWeek = {
        pl: ['NIEDZ.', 'PON.', 'WT.', 'ŚR.', 'CZW.', 'PT.', 'SOB.'],
        en: ['SUN.', 'MON.', 'TUE.', 'WED.', 'THU.', 'FRI.', 'SAT.'],
      }

      const months = {
        pl: ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'],
        en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }

      const locale = localization.currentLocale

      const dayOfWeek = daysOfWeek[locale]?.[now.getDay()] || daysOfWeek['pl'][now.getDay()]
      const day = String(now.getDate()).padStart(2, '0')
      const month = months[locale]?.[now.getMonth()] || months['pl'][now.getMonth()]
      const year = now.getFullYear()
      const hour = String(now.getHours()).padStart(2, '0')
      const minute = String(now.getMinutes()).padStart(2, '0')

      return locale === 'pl'
        ? `${dayOfWeek} ${day} ${month} ${year} - ${hour}:${minute}`
        : `${dayOfWeek} ${month} ${day} ${year} - ${hour}:${minute}`
    },
  },
  computed: {
    formattedTimestamp() {
      return this.getFormattedTimestamp(this.timestamp)
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.timestamp = new Date()
    }, 1000)
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
}
</script>
