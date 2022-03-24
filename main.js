const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  />
  <!-- 城堡 -->
  <div class="world">
    <big-castle v-for="(player,index) in players" :player="player" :index="index" :key="index"/>
    <div class="clouds">
      <move-cloud v-for="index in 10" :type="(index-1)%5+1"/>
    </div>
    <div class="land"/>
  </div>
  <!-- 手牌 -->
  <transition name="hand"> 
    <hand-cards :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
  </transition>
  <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay"/>
    </transition>
  <transition name="zoom">
    <over-lay v-if="activeOverlay" :key="activeOverlay">
      <component
      :is="'overlay-content-'+activeOverlay"
      :player="currentPlayer"
      :oppnent="currentOpponent"
      :players="players"/>
    </over-lay>
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
    setTimeout(() => this.currentPlayer.food = 5,2000)
  }
})