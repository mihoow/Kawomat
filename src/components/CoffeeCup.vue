<style scoped>
.wrapper {
  width: fit-content;
  position: relative;
}

.coffee-image {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<template>
  <div class="wrapper">
    <canvas id="canvas" :width="size * 0.7" :height="size" />
    <div v-if="!ingredients" class="coffee-image">
      <img src="/coffee-bean.svg" :width="size / 4" :height="size / 4" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Object,
      required: false,
    },
    /*
     {
      '40%': {
        text: 'espresso',
        background: 'brown',
        contrast: 'dark'
      },
      '80%': {
        text: 'ice cream',
        background: 'skyblue',
      },
      '90%': {
        text: 'whipped cream',
        background: 'red'
      },
      '100%': {
        text: 'chocolate',
        background: 'brown',
        contrast: 'dark'
      }
     }
    */
  },
  methods: {
    x(percentage) {
      return (percentage / 100) * (this.size * 0.7)
    },
    y(percentage) {
      return (percentage / 100) * this.size
    },
    drawCup(ctx) {
      ctx.fillStyle = '#e6e9ed'

      const points = {
        topLeft: { x: 4, y: 20 },
        topRight: { x: 96, y: 20 },
        bottomRight: { x: 91, y: 100 },
        bottomLeft: { x: 9, y: 100 },
      }

      ctx.beginPath()
      ctx.moveTo(this.x(points.bottomLeft.x), this.y(points.bottomLeft.y))
      ctx.lineTo(this.x(points.bottomRight.x), this.y(points.bottomRight.y))
      ctx.lineTo(this.x(points.topRight.x), this.y(points.topRight.y))
      ctx.lineTo(this.x(points.topLeft.x), this.y(points.topLeft.y))
      ctx.closePath()
      ctx.fill()

      return {
        points,
        height: points.bottomLeft.y - points.topLeft.y,
        lowerWidth: points.bottomRight.x - points.bottomLeft.x,
        upperWidth: points.topRight.x - points.topLeft.x,
      }
    },
    drawLid(ctx, cupDimensions) {
      const {
        upperWidth,
        points: {
          topLeft: { x: startX },
          topRight: { x: endX, y: endY },
        },
      } = cupDimensions

      ctx.fillStyle = '#a85d5d'
      ctx.beginPath()
      ctx.rect(this.x(startX - 4), this.y(10), this.x(upperWidth + 8), this.y(endY - 10))
      ctx.fill()

      ctx.fillStyle = '#965353'
      ctx.beginPath()
      ctx.moveTo(this.x(startX), this.y(10))
      ctx.lineTo(this.x(endX), this.y(10))
      ctx.lineTo(this.x(endX - 3), this.y(5))
      ctx.lineTo(this.x(startX + 3), this.y(5))
      ctx.closePath()
      ctx.fill()

      // otwor
      ctx.fillStyle = '#434a54'
      ctx.beginPath()
      ctx.roundRect(this.x(45), this.y(5), this.x(10), this.y(2.5), [0, 0, 16, 16])
      ctx.fill()

      ctx.fillStyle = '#7f4545'
      ctx.beginPath()
      ctx.moveTo(this.x(startX + 6), this.y(5))
      ctx.lineTo(this.x(endX - 6), this.y(5))
      ctx.lineTo(this.x(endX - 9), 0)
      ctx.lineTo(this.x(startX + 9), 0)
      ctx.closePath()
      ctx.fill()
    },
    movePoint(point, { offsetX = 0, offsetY = 0 }) {
      const newPoint = { ...point }
      newPoint.x += offsetX
      newPoint.y += offsetY

      return newPoint
    },
    calculateFragmentDimensions({ cupDimensions, lowerPercentage, upperPercentage, offsetX = 0 }) {
      const { points: cupPoints, height: cupHeight } = cupDimensions

      // z twierdzenia Pitagorasa
      const cupSideLength = Math.sqrt(Math.pow(cupHeight, 2) + Math.pow(5, 2))
      // obliczamy sinusa
      const angleSinus = cupHeight / cupSideLength

      const b = (lowerPercentage / 100) * cupHeight
      const c = b / angleSinus
      const a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2))

      const bottomLeftPoint = {
        x: cupPoints.bottomLeft.x - a,
        y: 100 - (lowerPercentage / 100) * cupHeight,
      }

      const bottomRightPoint = {
        x: cupPoints.bottomRight.x + a,
        y: 100 - (lowerPercentage / 100) * cupHeight,
      }

      const b2 = (upperPercentage / 100) * cupHeight
      const c2 = b2 / angleSinus
      const a2 = Math.sqrt(Math.pow(c2, 2) - Math.pow(b2, 2))

      const topLeftPoint = {
        x: cupPoints.bottomLeft.x - a2,
        y: 100 - (upperPercentage / 100) * cupHeight,
      }

      const topRightPoint = {
        x: cupPoints.bottomRight.x + a2,
        y: 100 - (upperPercentage / 100) * cupHeight,
      }

      return {
        topLeft: this.movePoint(topLeftPoint, { offsetX }),
        topRight: this.movePoint(topRightPoint, { offsetX: -offsetX }),
        bottomRight: this.movePoint(bottomRightPoint, { offsetX: -offsetX }),
        bottomLeft: this.movePoint(bottomLeftPoint, { offsetX }),
      }
    },
    drawFragment(ctx, { cupDimensions, lowerPercentage, upperPercentage, offsetX, fillStyle }) {
      const dimensions = this.calculateFragmentDimensions({
        cupDimensions,
        lowerPercentage,
        upperPercentage,
        offsetX,
      })
      const { topLeft, topRight, bottomRight, bottomLeft } = dimensions

      ctx.fillStyle = fillStyle
      ctx.beginPath()
      ctx.moveTo(this.x(topLeft.x), this.y(topLeft.y))
      ctx.lineTo(this.x(topRight.x), this.y(topRight.y))
      ctx.lineTo(this.x(bottomRight.x), this.y(bottomRight.y))
      ctx.lineTo(this.x(bottomLeft.x), this.y(bottomLeft.y))
      ctx.closePath()
      ctx.fill()

      return dimensions
    },
    drawCoffeeBeanBackground(ctx, cupDimensions) {
      const { height: cupHeight } = cupDimensions

      ctx.fillStyle = '#ed5564'
      ctx.beginPath()
      ctx.arc(this.x(50), this.y(100 - cupHeight / 2), this.x(30), 0, 2 * Math.PI)
      ctx.fill()
    },
    createLinearGradient(ctx, colors) {
      if (colors.length !== 5) {
        throw new Error('Tablica powinna zawierać dokładanie 5 kolorów ', colors)
      }

      const gradient = ctx.createLinearGradient(this.x(0), this.y(0), this.x(100), this.y(0))

      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(0.08, colors[0])
      gradient.addColorStop(0.16, colors[1])
      gradient.addColorStop(0.24, colors[2])
      gradient.addColorStop(0.32, colors[3])
      gradient.addColorStop(0.4, colors[4])
      gradient.addColorStop(0.6, colors[4])
      gradient.addColorStop(0.68, colors[3])
      gradient.addColorStop(0.76, colors[2])
      gradient.addColorStop(0.84, colors[1])
      gradient.addColorStop(0.92, colors[0])
      gradient.addColorStop(1, colors[0])

      return gradient
    },
  },
  mounted() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const cupDimensions = this.drawCup(ctx)
    this.drawLid(ctx, cupDimensions)

    if (!this.ingredients) {
      this.drawFragment(ctx, {
        cupDimensions,
        lowerPercentage: 35,
        upperPercentage: 65,
        fillStyle: '#da4453',
      })
      this.drawCoffeeBeanBackground(ctx, cupDimensions)
    } else {
      const ingredientEntries = Object.entries(this.ingredients)

      ctx.font = 'bold 10px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ingredientEntries.forEach(
        ([upperPercentageStr, { background, text, contrast = 'light' }], index) => {
          const lowerPercentageStr = ingredientEntries[index - 1]?.[0] ?? 0
          const fillStyle = Array.isArray(background)
            ? this.createLinearGradient(ctx, background)
            : background
          const [lowerPercentage, upperPercentage] = (() => {
            if (index === 0) return [4, Number(upperPercentageStr)]

            if (index === 1) return [Number(lowerPercentageStr), Number(upperPercentageStr) - 4]

            return [Number(lowerPercentageStr) - 4, Number(upperPercentageStr) - 4]
          })()

          const { bottomLeft, topRight } = this.drawFragment(ctx, {
            cupDimensions,
            lowerPercentage,
            upperPercentage,
            fillStyle,
            offsetX: 4,
          })

          if (text) {
            const width = topRight.x - bottomLeft.x
            const height = bottomLeft.y - topRight.y

            ctx.fillStyle = contrast === 'light' ? '#402d20' : '#dbe2e9'
            ctx.fillText(
              text.toUpperCase().split('').join(String.fromCharCode(8202)),
              this.x(bottomLeft.x + width / 2),
              this.y(topRight.y + height / 2),
            )
          }
        },
      )
    }
  },
}
</script>
