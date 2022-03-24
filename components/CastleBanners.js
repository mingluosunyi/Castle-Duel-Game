const CastleBanners = `
<div class="banners">
  <img class="food-icon" src="../svg/food-icon.svg"/>
  <bubble-tip type="food" :value="player.food" :ratio="foodRatio"/>
  <banner-bar class="food-bar" :color="'#288339'" :ratio="foodRatio" />
  <img class="health-icon" src="../svg/food-icon.svg"/>
  <bubble-tip type="health" :value="player.health" :ratio="healthRatio"/>
  <banner-bar class="health-bar" :color="'#9b2e2e'" :ratio="healthRatio" />
</div>
`

Vue.component('castle-banners',{
  template: CastleBanners,
  props: ['player'],
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    }
  }
})

const BubbleTip = `
<div class="stat-bubble" :class="type+'-bubble'" :style="bubbleStyle">
  <img :src="'/svg/'+type+'-bubble.svg'" />
  <div class="counter">{{ value }}</div>
</div>
`

Vue.component('bubble-tip',{
  template: BubbleTip,
  props: ['type','value','ratio'],
  computed: {
    bubbleStyle () {
      return {
        top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
      }
    }
  }
})

const BannerBar = `
<svg viewBox="0 0 20 260">
  <path :d="'m 0, 0 20, 0 0, '+this.height+'-10, -10 -10, 10 z'" :style="'fill:'+this.color+';stroke:none'"/>
</svg>
`

Vue.component('banner-bar',{
  template: BannerBar,
  props: ['color','ratio'],
  data() {
    return {
      height: 0
    }
  },
  computed: {
    targetHeight() {
      return 220 * this.ratio + 40
    }
  },
  created() {
    this.height = this.targetHeight
  },
  watch: {
    targetHeight: {
      handler: function (newval,oldval) {
          const vm = this
          function update () {
            vm.height = x.val.toFixed(1)
          }
          let x = {
            val:oldval
          }
          new createjs.Tween.get(x)
              .to({ val:newval },500,createjs.Ease.cubicInOut)
              .addEventListener('change', update)
      },
      deep: true,
    }
  },
})
