<style scoped>
.progress-container {
  max-width: 400px;
  width: 100%;
  border-radius: 6px;
  position: relative;
  margin-top: 8px;
}

.progress-bar {
  --duration: 0s;

  position: relative;
  width: 100%;
  height: 4px;
  background-color: #aaa;
  border-radius: 12px;
}

.progress-bar::after {
  content: '';
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 0;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow:
    0 0 16px rgba(60, 179, 113, 0.8),
    0 0 32px rgba(60, 179, 113, 0.6),
    0 0 48px rgba(60, 179, 113, 0.4);

  will-change: inset-inline-start;
  animation: progress-position var(--duration) linear forwards;
}

.progress-bar__inner {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar__track {
  position: absolute;
  inset: 0;
  background-color: rgba(60, 179, 113, 0.6);
  border-radius: 12px;
  transform: translateX(-100%);
  will-change: transform;
  animation: progress var(--duration) linear forwards;
}

.progress-text {
  margin-block-start: 4px;
  font-size: 14px;
  color: #ddd;
  text-align: center;
}

@keyframes progress {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes progress-position {
  from {
    inset-inline-start: 0;
  }

  to {
    inset-inline-start: 100%;
  }
}

@media (min-width: 768px) {
  .progress-container {
    min-width: 300px;
  }

  .progress-bar {
    height: 8px;
  }

  .progress-bar::after {
    width: 20px;
    height: 20px;
  }

  .progress-text {
    margin-block-start: 8px;
  }
}
</style>

<template>
  <div class="progress-container">
    <div ref="progress" class="progress-bar" :style="{ '--duration': `${seconds}s` }">
      <div class="progress-bar__inner">
        <div class="progress-bar__track" @animationstart="startCountdown" />
      </div>
    </div>
    <p class="progress-text">{{ helperText }}</p>
  </div>
</template>

<script>
import localization from '@/localization'

export default {
  props: {
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      started: null,
      remainingSeconds: this.seconds,
      raf: null,
      localization,
    }
  },
  methods: {
    startCountdown() {
      if (!this.started) {
        this.started = Date.now()
      }

      const totalMs = this.seconds * 1000

      this.raf = requestAnimationFrame(() => {
        const elapsed = Date.now() - this.started
        const remainingMilliseconds = totalMs - elapsed

        if (remainingMilliseconds <= 0) {
          this.remainingSeconds = 0
          cancelAnimationFrame(this.raf)
          this.raf = null
        } else {
          this.remainingSeconds = Math.ceil(remainingMilliseconds / 1000)
          this.startCountdown()
        }
      })
    },
  },
  computed: {
    helperText() {
      if (localization.currentLocale === 'pl') {
        if (this.remainingSeconds === 0) {
          return 'Gotowe!'
        }

        if (this.remainingSeconds === 1) {
          return 'Pozostała 1 sekunda'
        }

        if (this.remainingSeconds >= 2 && this.remainingSeconds <= 4) {
          return `Pozostały ${this.remainingSeconds} sekundy`
        }

        return `Pozostało ${this.remainingSeconds} sekund`
      }

      if (this.remainingSeconds === 0) {
        return 'Ready!'
      }

      if (this.remainingSeconds === 1) {
        return '1 second remaining'
      }

      return `${this.remainingSeconds} seconds remaining`
    },
  },
  beforeUnmount() {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
      this.raf = null
    }
  },
}
</script>
