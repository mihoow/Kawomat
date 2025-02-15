import { reactive } from 'vue'

const localization = reactive({
  currentLocale: 'pl',

  t(plText, enText) {
    if (typeof plText === 'object') {
      return plText[this.currentLocale]
    }

    return this.currentLocale === 'pl' ? plText : enText
  },

  formatPrice(price) {
    return new Intl.NumberFormat(this.currentLocale === 'pl' ? 'pl-PL' : 'en-US', {
      style: 'currency',
      currency: 'PLN',
    }).format(price)
  },

  setLocale(locale) {
    if (['pl', 'en'].includes(locale)) {
      this.currentLocale = locale
    }
  },
})

export default localization
