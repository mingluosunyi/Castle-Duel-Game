const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  />
  <one-card :def="testCard" @play="handlePlay"/>
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
    }
  }
})