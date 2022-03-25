const App = `
<div id="app" :class="cssClass">
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
    <hand-cards :cards="currentHand" v-if="!activeOverlay" @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd"/>
  </transition>
  <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay"/>
    </transition>
  <transition name="zoom">
    <over-lay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
      <component
      :is="'overlay-content-'+activeOverlay"
      :player="currentPlayer"
      :opponent="currentOpponent"
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
    cssClass() {
      return {
        'can-play':this.canPlay
      }
    }
  },
  methods: {
    beginGame() {
      state.players.forEach(drawInitialHand)
    },
    playCard(card) {
      if(state.canPlay) {
        state.canPlay = false
        currentPlayingCard = card
        const index= state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(index,1)
        addCardToPile(state.discardPile,card.id)
      }
    },
    handlePlayCard(card) {
      this.playCard(card)
    },
    handleCardLeaveEnd() {
      this.applyCard()
    },
    nextTurn() {
      state.turn++
      state.currentPlayerIndex = state.currentOpponentId
      state.activeOverlay = 'player-turn'
    },
    endGame() {
      state.activeOverlay = 'game-over'
    },
    applyCard() {
      const card = currentPlayingCard
      applyCardEffect(card)
      setTimeout(() => {
        state.players.forEach(checkPlayerLost)
        if(isOnePlayerDead()) {
          this.endGame()
        } else {
          this.nextTurn()
        }
      },700)
    },
    newTurn () {
      state.activeOverlay = null
      if(state.currentPlayer.skipTurn) {
        this.skipTurn()
      }else {
        this.startTurn()
      }
    },
    skipTurn() {
      state.currentPlayer.skippedTurn = true
      state.currentPlayer.skipTurn = false
      this.nextTurn()
    },
    startTurn() {
      state.currentPlayer.skippedTurn = false
      if(state.turn > 2) {
        setTimeout(() => {
          state.currentPlayer.hand.push(drawCard())
          state.canPlay = true
        },800)
      }else {
        state.canPlay = true
      }
    },
    handleOverlayClose() {
      let vm = this
      let overlayCloseHandlers = {
        'player-turn'() {
          if(state.turn > 1) {
            state.activeOverlay = 'last-play'
          }else {
            vm.newTurn()
          }
        },
        'last-play' () {
          vm.newTurn()
        },
        'game-over'() {
          document.location.reload()
        }
      }
      overlayCloseHandlers[this.activeOverlay]()
    }
  },
  mounted() {
    this.beginGame()
  }
})