<style scoped>
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
</style>
<template>
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
