const cloudAnimationDuration = {
  min: 10000,
  max: 50000
}

const MoveCloud = `
<div class="cloud" :class="'cloud'+type" :style="style">
  <img :src="'../svg/cloud'+type+'.svg'" @load="initPosition">
</div>
`

Vue.component('move-cloud',{
  template: MoveCloud,
  props: ['type'],
  data() {
    return {
      style: {
        transform: 'none',
        zIndex: 0
      }
    }
  },
  methods: {
    setPosition(left,top) {
      this.style.transform = `translate(${left}px,${top}px)`
    },
    initPosition() {
      const width = this.$el.clientWidth
      this.setPosition(-width,0)
    },
    startAnimation(delay= 0) {
      const vm = this
      const width = this.$el.clientWidth
      const { min,max } = cloudAnimationDuration
      const animationDuration = Math.random() * (max - min) + min
      this.style.zIndex = Math.round(max - animationDuration)

      const top = Math.random() * (window.innerHeight * 0.3)
      let initialState = {
        value:-width
      }
      let TWEEN = new createjs.Tween(initialState)
          .to({ value: window.innerWidth },animationDuration)
          .wait(delay)
      TWEEN.addEventListener('change',function () {
        vm.setPosition(initialState.value,top)
      })
      TWEEN.addEventListener('complete',function () {
        vm.startAnimation(Math.random() * 10000)
      })
    }
  },
  mounted() {
    this.startAnimation(-Math.random() * cloudAnimationDuration.min)
  }
})