const Overlay = `
<div class="overlay" @click="handleClick">
  <div class="content">
    <slot />
  </div>
</div>
`

Vue.component('over-lay',{
  methods: {
    handleClick() {
      this.$emit('close')
    }
  },
  template: Overlay
})

const OverlayContentPlayerTurn = `
<div>
  <div class="big" v-if="player.skipTurn">
    {{ player.name }},
    <br>
    Your Turn is Skipped !
  </div>
  <div class="big" v-else>
    {{ player.name }},
    <br>
    Your Turn has Come !
    <div>Tap to Continue</div>
  </div>
</div>
`

Vue.component('overlay-content-player-turn',{
  template: OverlayContentPlayerTurn,
  props: ['player']
})

const OverlayContentLastPlay = `
<div>
  <div v-if="opponent.skipperTurn">
    {{ opponent.name }} Turn was Skipped !
  </div>
  <template v-else>
    <div>{{ opponent.name }} just Played:</div>
    <card :def="lastPlayedCard" />
  </template>
</div>
`

Vue.component('overlay-content-last-play',{
  template: OverlayContentLastPlay,
  props: ['opponent'],
  computed: {
    lastPlayedCard() {
      return cards[this.opponent.lastPlayedCardId]
    }
  }
})

const PlayerResult = `
<div class="player-result" :class="result">
  <span class="name">{{ player.name }}</span> is 
  <span class="result"> {{ result }}</span>
</div>
`

Vue.component('player-result',{
  template:PlayerResult,
  props: ['player'],
  computed: {
    result() {
      return this.player.dead ? 'defeated' : 'victorious'
    }
  }
})

const OverlayContentGameOver = `
<div>
  <div class="big">
    Game Over !
    <player-result v-for="player in players" :player="player"/>
  </div>
</div>
`

Vue.component('overlay-content-game-over',{
  template: OverlayContentGameOver,
  props: ['players']
})
