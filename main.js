const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  />
  <hand-cards :cards="testHand" />
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
    },
    testHand () {
      return this.createTestHand()
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
      let cardUid = 0
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId]
      }
    }
  }
})