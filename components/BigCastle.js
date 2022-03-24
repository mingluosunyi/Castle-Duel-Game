const BigCastle = `
<div class="castle" :class="'player-'+index">
  <!-- 建筑 -->
  <img class="building" :src="'svg/castle'+index+'.svg'" />
  <!-- 大石头 -->
  <img class="ground" :src="'svg/ground'+index+'.svg'" />
  <!-- banners组件 -->
  <castle-banners :player="player"/>
</div>
`

Vue.component('big-castle',{
  template: BigCastle,
  props: ['player','index']
})
