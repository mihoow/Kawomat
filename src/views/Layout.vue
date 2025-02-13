<style scoped>
.container {
  min-height: 100dvh;
  background-color: #565656;

  display: flex;
  flex-direction: column;
}

.header-container {
  padding: 8px 16px 10px;
  background-color: #252323;
}

header {
  display: grid;
  grid-template-columns: min-content 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  row-gap: 10px;
}

.back-button {
  justify-self: start;
  width: 30px;
  height: 30px;
  background-color: #da4453;
  border: none;
  color: white;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.back-button i {
  font-size: 16px;
}

.back-button__label {
  display: none;
}

.timestamp {
  margin-inline-start: 16px;
  font-size: 12px;
  color: #f6f6a2;
}

.credit {
  grid-column: 3;
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

.brand {
  grid-column: 1 / 4;
  grid-row: 2;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.21;
  text-align: center;
  text-transform: uppercase;

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
  max-height: calc(100dvh - var(--header-height) - var(--footer-height));
  overflow-y: auto;
}

.footer-container {
  padding-inline: 16px;
}

footer {
  padding-block: 16px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
}

footer::before {
  content: '';
  position: absolute;
  inset-block-start: 0;
  inset-inline: 0;
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
  line-height: 0;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.locale-button.active {
  opacity: 1;
}

@media (min-width: 480px) {
  .row-1 {
    padding-inline: 24px;
  }

  .back-button {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }

  .timestamp {
    margin-inline-start: 24px;
    font-size: 14px;
  }

  .credit_amount {
    font-size: 20px;
  }

  .credit_label {
    font-size: 14px;
  }

  .brand {
    font-size: 36px;
  }
}

@media (min-width: 768px) {
  .header-container {
    padding-inline: 24px;
  }

  header {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .back-button {
    padding: 0.25rem 0.5rem;
    width: auto;
    gap: 0.5rem;
  }

  .back-button__label {
    display: block;
    font-size: 15px;
    font-weight: 400;
  }

  .timestamp {
    grid-column: 1;
    margin-inline-start: 0;
    grid-row: 2;
    font-size: 15px;
  }

  .brand {
    grid-column: 2;
    grid-row: 1 / 3;
    font-size: 46px;
  }

  .footer-container {
    padding-inline: 24px;
  }

  footer {
    padding-block: 16px;
  }

  footer::before {
    inset-inline: 0;
  }
}

@media (min-width: 1024px) {
  .header-container {
    padding-block: 16px;
  }

  .back-button {
    padding: 0.5rem 1rem;
  }

  .back-button i {
    font-size: 18px;
  }

  .back-button__label {
    font-size: 18px;
  }

  .timestamp {
    font-size: 16px;
  }

  .credit_amount {
    font-size: 24px;
  }

  .credit_label {
    font-size: 16px;
  }

  .brand {
    font-size: 56px;
  }

  footer {
    gap: 80px;
  }

  footer::before {
    inset-inline-start: -5px;
    width: calc(100%);
  }

  .locale-button img {
    width: 70px;
    height: auto;
  }
}

@media (min-width: 1140px) {
  .header-container {
    padding-inline: 40px;
  }

  .footer-container {
    padding-inline: 40px;
  }
}
</style>
<template>
  <div class="container">
    <div class="header-container">
      <header class="limiter">
        <button class="back-button" @click="goBack">
          <i class="bi bi-arrow-90deg-left"></i>
          <span class="back-button__label">
            {{ localization.t('Wróć', 'Back') }}
          </span>
        </button>
        <span class="timestamp">{{ formattedTimestamp }}</span>
        <div class="credit">
          <span class="credit_amount">10,00 zł</span>
          <span class="credit_label">{{ localization.t('Kredyt', 'Credit') }}</span>
        </div>
        <strong class="brand">Vendicafe</strong>
      </header>
    </div>
    <main><router-view /></main>
    <div class="footer-container">
      <footer class="limiter">
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
