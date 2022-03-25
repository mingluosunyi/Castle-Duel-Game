// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World
  worldRatio: getWorldRatio(),
  // TODO Other things
  turn: 1,  // 当前回合
  players: [  //玩家对象的数组
    {
      name: 'Sunyi Yao',
      food: 10,
      health: 10,
      //是否跳过下回合
      skipTurn: false,
      //上回和是否跳过
      skippedTurn:false,
      hand:[],
      lastPlayedCardId: null,
      dead: false
    },
    {
      name: 'Xingzhe Zhao',
      food: 10,
      health: 10,
      skipTurn: false,
      skippedTurn:false,
      hand:[],
      lastPlayedCardId: null,
      dead: false
    }
  ],
  currentPlayerIndex: Math.round(Math.random()),  //当前玩家在players数组中的索引
  activeOverlay: 'player-turn',
  get currentPlayer () {
    return this.players[state.currentPlayerIndex]
  },
  get currentOpponentId () {
    return this.currentPlayerIndex === 0 ? 1 : 0
  },
  get currentOpponent () {
    return this.players[state.currentOpponentId]
  },
  //
  drawPile:pile,
  discardPile:{},
  get currentHand () {
    return this.currentPlayer.hand
  },
  canPlay:false
}
