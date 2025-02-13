import { reactive } from 'vue'

const localization = reactive({
  currentLocale: 'pl',

  t(plText, enText) {
    if (typeof plText === 'object') {
      return plText[this.currentLocale]
    }

    return this.currentLocale === 'pl' ? plText : enText
  },

  setLocale(locale) {
    if (['pl', 'en'].includes(locale)) {
      this.currentLocale = locale
    }
  },
})

export default localization
