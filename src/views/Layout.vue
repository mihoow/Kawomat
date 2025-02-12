<style scoped>
.container {
  min-height: 100dvh;
  background-color: #565656;

  display: flex;
  flex-direction: column;
}

header {
  background: #252323;
}

.row-1 {
  width: 100%;
  padding: 8px 16px 0;
  display: flex;
  align-items: center;
}

.back-button {
  width: 30px;
  height: 30px;
  background-color: #da4453;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.timestamp {
  margin-inline-start: 16px;
  font-size: 12px;
  color: #f6f6a2;
}

.credit {
  position: relative;
  margin-inline-start: auto;
  color: #f6f6a2;
}

.credit_amount {
  font-size: 16px;
  line-height: 1;
  font-weight: 500;
}

.credit_label {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-end: 0;
  font-size: 12px;
  text-transform: uppercase;
}

.row-2 {
  width: 100%;
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;

  @supports (-webkit-background-clip: text) {
    background: linear-gradient(to bottom, #ffffff, #f1f168);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @supports not (-webkit-background-clip: text) {
    color: #f1f168;
  }
}

main {
  flex-grow: 1;
  overflow-y: auto;
}

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
  <div class="container">
    <header>
      <div class="row-1">
        <button class="back-button" @click="goBack">
          <i class="bi bi-arrow-90deg-left"></i>
        </button>
        <span class="timestamp">{{ formattedTimestamp }}</span>
        <div class="credit">
          <span class="credit_amount">10.00 zł</span>
          <span class="credit_label">{{ localization.t('Kredyt', 'Credit') }}</span>
        </div>
      </div>
      <div class="row-2">
        <strong class="brand">Vendicafe</strong>
      </div>
    </header>
    <main><router-view /></main>
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
  </div>
</template>

<script>
import localization from '@/localization'

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'touchstart']
const INACTIVITY_TIMEOUT = 60000 * 30 // TODO: change this for production

export default {
  name: 'AppLayout',
  data() {
    return {
      localization,
      intervalId: null,
      timeoutId: null,
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
    clearInactivityTimer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.timeoutId = null
    },
    startInactivityTimer() {
      this.timeoutId = setTimeout(() => {
        localization.setLocale('pl')
        this.$router.push('/')
      }, INACTIVITY_TIMEOUT)
    },
    restartInactivityTimer() {
      this.clearInactivityTimer()
      this.startInactivityTimer()
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

    this.startInactivityTimer()

    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, this.restartInactivityTimer)
    })
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    ACTIVITY_EVENTS.forEach((event) => {
      document.removeEventListener(event, this.restartInactivityTimer)
    })

    this.clearInactivityTimer()
  },
}
</script>
