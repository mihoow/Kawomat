import { reactive } from 'vue'

const store = reactive({
  credit: 10,
  order: null,

  makeOrder(coffeeId, totalPrice) {
    this.order = {
      coffeeId,
      totalPrice,
    }
  },
  reset() {
    this.order = null
    this.credit = 10
  },
})

export default store
