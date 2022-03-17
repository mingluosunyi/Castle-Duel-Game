const HandCards = `
<div class="hand">
  <div class="wrapper">
    <one-card v-for="card in cards" :def="card.def" :key="card.cardUid"/>
  </div>
</div>
`

Vue.component('hand-cards',{
  props:['cards'],
  template: HandCards
})