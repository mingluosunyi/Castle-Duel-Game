const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  />
  <transition name="hand">
    <hand-cards :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
  </transition>
</div>
`

new Vue({
  name: 'game',
  el: '#app',
  data: state,
  template: App,
  computed: {
    testCard () {
      return cards.archers
    }
  },
  methods: {
    handlePlay () {
      console.log('You played a card!')
    },
    createTestHand () {
      const cards = []
      for (let i = 0; i < 5; i++) {
        cards.push(this.testDrawCard())
      }
      return cards
    },
    testDrawCard () {
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId]
      }
    },
    testPlayCard(card) {
      const index = this.testHand.indexOf(card)
      this.testHand.splice(index,1)
    }
  },
  created () {
    this.testHand = this.createTestHand()
  }
})