const HandCards = `
<div class="hand">
  <div class="wrapper">
    <transition-group tag="div" name="card" class="cards">
      <one-card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
    </transition-group>
  </div>
</div>
`

Vue.component('hand-cards',{
  props:['cards'],
  template: HandCards,
  methods: {
    handlePlay(card) {
      this.$emit('card-play',card)
    }
  }
})