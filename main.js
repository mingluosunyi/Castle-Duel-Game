const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  ></top-bar>
</div>
`

new Vue({
  name: 'game',
  el: '#app',
  data: state,
  template: App
})