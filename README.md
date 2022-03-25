# Castle-Duel-Game
## 项目设置
+ 解压chapter3-download.zip
+ 创建一个名为main.js的文件。
+ 打开index.html文件，在state.js的后面添加一个script标签引入刚刚创建的main.js
+ 在main.js中创建Vue实例
```javascript
new Vue({
  name: 'game',
  el: '#app'
})
```

## 构建用户界面
###第一个组件：顶栏
替换html里的script标签，解压后的文件中的Vue导入连接已经失效了，换成vue官网的链接。

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

#### 添加一些数据到state中
```javascript
var state = {
  // World
  worldRatio: getWorldRatio(),
  // TODO Other things
  turn: 1,  // 当前回合
  players: [  //玩家对象的数组
    {
      name: 'Sunyi Yao'
    },
    {
      name: 'Xingzhe Zhao'
    }
  ],
  currentPlayerIndex: Math.round(Math.random()),  //当前玩家在players数组中的索引
}
```
#### 定义和使用组件
+ 创建一个components文件夹，然后在下面创建一个新的TopBar.js文件，然后在index.html中引用这个TopBar.js文件
+ 在TopBar.js文件中创建top-bar组件
```javascript
const TopBar = `
<div class="top-bar">
  Top bar
</div>
`

Vue.component('top-bar',{
  template: TopBar
})
```
+ 在main.js中使用top-bar组件
```javascript
const App = `
<div id="app">
  <top-bar></top-bar>
</div>
`

new Vue({
  name: 'game',
  el: '#app',
  data: state,
  template: App
})
```
![top-bar](./readme-md-pictures/截屏2022-03-17%20下午6.46.02.png)

记住！现在父组件是main，子组件是top-bar。

#### 用props给子组件传递消息
+ top-bar需要知道玩家的名字、现在轮到哪个玩家，然而这些数据都定义在父组件main上，所以需要把数据从main传递给top-bar
+ 从父组件传递参数给子组件分为两步
1. 在子组件中定义props属性
2. 在父组件中用`v-bind`把数据通过props传递过去

(1)在子组件中定义props属性
```javascript
Vue.component('top-bar',{
  props:['players','turn','currentPlayerIndex'],
  template: TopBar
})
```
(2)在父组件中用`v-bind`把数据通过props传递过去
```javascript
const App = `
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  ></top-bar>
</div>
`
```
**需要注意的点是props属性在父组件中要小写！**

#### 完成top-bar
接下来我们把取得的数据渲染到top-bar上

显示玩家的姓名
```javascript
const TopBar = `
<div class="top-bar">
  <div class="player p0">{{ players[0].name }}</div>
  <div class="player p1">{{ players[1].name }}</div>
</div>
`
```
![players-name](./readme-md-pictures/截屏2022-03-17%20下午7.11.41.png)

使用turn在玩家之间显示回合数
```javascript
const TopBar = `
<div class="top-bar">
  <div class="player p0">{{ players[0].name }}</div>
  <div class="turn-counter">
    <div class="turn">Turn{{ turn }}</div>
  </div>
  <div class="player p1">{{ players[1].name }}</div>
</div>
`
```
这里看不到turn，因为字体是蓝色的

添加箭头图像
```javascript
const TopBar = `
<div class="top-bar" :class="'player-'+currentPlayerIndex">
  <div class="player p0">{{ players[0].name }}</div>
  <div class="turn-counter">
    <img src="../svg/turn.svg" class="arrow"/>
    <div class="turn">Turn{{ turn }}</div>
  </div>
  <div class="player p1">{{ players[1].name }}</div>
</div>
`
```
![img](./readme-md-pictures/截屏2022-03-17%20下午7.09.20.png)

### 卡牌组件
+ 在components目录下创建OneCard.js文件，然后在index.html中引用这个OneCard.js文件
+ 在OneCard.js文件中创建one-card组件

#### 卡片数据
所有的卡片数据都保存在cards.js中，每张卡片都有如下字段
+ id
+ type //卡牌类型
+ title //卡牌的名称
+ description //说明卡片的作用
+ note //一段可选的背景叙述
+ play //玩家出牌后的效果

(1)卡牌组件需要一个参数来接收卡牌数据
```javascript
Vue.coponent('one-card',{
  props:['def']
})
```
(2)卡牌可以根据type改变背景颜色,使用动态css实现
```javascript
<div class="card" :class="'type-'+def.type">
</div>
```
(3)添加卡牌的title、description、note等信息
```javascript
<div class="card" :class="'type-'+def.type" @click="play">
  <div class="title">{{ def.title }}</div>
  <-- 分隔符图像 -->  
  <img src="../svg/card-separator.svg" class="separator"/>
  <-- 因为description是html文本所以要用v-html --> 
  <div class="description">
    <div v-html="def.description"></div>
  </div>
  <-- 不是每张卡牌都有note属性，所以要加v-if -->
  <div class="note" v-if="def.note">
    <div v-html="def.note"></div>
  </div>
</div>
```
(4)在main.js中使用卡牌组件，并用props传递参数
```javascript
<div id="app">
  <top-bar
  :players="players"
  :turn="turn"
  :current-player-index="currentPlayerIndex"
  />
  <one-card :def="testCard"/>
</div>

computed: {
  testCard () {
    return cards.archers
  }
}
```
> 思考一下为什么要用计算属性？

+ 我觉得是因为data已经绑定了state，如果把cards.archers也添加到data里会污染data。

这里使用cards.archers可以直接获取到archers这张卡的信息，具体实现在cards.js中
```javascript
cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="svg/${id}.svg"/></b>`
  })
  map[card.id] = card
  return map
}, {})
```
核心是用reduce方法把cards从Array变成了Map，从而可以使用索引直接取到，妙啊！

(5)向父组件传递消息
出于后续某些功能的需要，我们希望card在被使用后能告诉main一个消息，表明自己已经被使用了。
在Vue中，子组件向父组件传递消息使用`$emit()`方法
以我个人的理解，`$emit`相当于一个信号传递管道，子组件和父组件事先沟通一个管道名字是play，子组件在某个信号触发下会调用`$emit`向父组件发送信号和数据。然后父组接收到信号和数据后决定接下来的操作！
```javascript
<div class="card" :class="'type-'+def.type" @click="play">
    //...
</div>
Vue.component('one-card',{
  // ...
  methods: {
    play () {
      this.$emit('play');
    }
  }
})
```
```javascript
<one-card :def="testCard" @play="handlePlay"/>
methods: {
    handlePlay () {
      console.log('You played a card!')
    }
}
```
这样我们的卡牌组件就创建完毕了。

### 手牌组件
先在脑海中设想一下手牌组件：手牌组件被main组件调用，同时手牌组件包含5张手牌，也就意味着要调用卡牌组件。

那么手牌组件接收的参数是什么呢？

手牌组件的参数主要用于给卡牌组件传递参数，因此卡牌组件需要什么参数，手牌组件也就需要什么参数。

但是有个问题是：仅仅只靠卡牌组件的参数无法区分两张同样类型的卡牌，因此手牌组件需要额外的`Uid`属性唯一标识一张卡牌。

同样的，我们不可能每次通过卡牌的`def`信息来判读一种卡牌，这样并不方便。因此每种卡牌都有一个种类`id`，方便区分。

那么手牌接收的参数将会是一个长度为5的数组，数组的元素是长这样的对象：
```javascript
{
    uid: cardUid,
    id: Id,
    def: cards[Id]
}
```

假设手牌组件接收的参数叫cards，下面我们来创建手牌组件吧！

```javascript
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
```

然后在main组件中调用手牌组件并传递参数，假设参数保存在一个叫做`testHand`的属性中。
```javascript
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
```

那么最后的工作就是创建`testHand了`。在state.js中创建名为`testHand`的属性,在组件创建完成后随机生产`testHand`

```javascript
var state = {
  //...
  testHand:[]
}
```

随机生产卡牌的代码相信聪明的你应该已经看懂了吧！

```javascript
methods:{
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
},
created () {
  this.testHand = this.createTestHand()
}
```

![hand-cards](./readme-md-pictures/截屏2022-03-17%20下午9.57.11.png )

但此时如果你将鼠标移动到卡牌上，卡牌并不会有任何反应，与预期不符。在本人寻找了很久之后终于发现了问题所在，请打开`style.css`文件，找到hand类的样式，注释掉` pointer-events: none;`这句代码，之后页面就回复正常了。

#### 出牌
手牌信息保存在main组件的`data`中，而点击事件是在卡牌组件上的，因此要把信息从卡牌组件发送到main组件。信息具体是什么呢？这里设置为卡牌card。card是手牌组件中的数据，所以卡牌组件只要向手牌组件发送信号而不需要数据。手牌组件向main组件发送信号和数据。

还记得之前在卡牌组件上定义了点击事件click,会触发自定义事件`play`,那么我们现在在手牌组件上侦听`play`事件。当事件发生时，向main组件发送card信息并触发`card-play`自定义事件，最后main组件处理`card-play`事件，在手牌中删除这张卡牌。

```javascript
<one-card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
methods: {
  handlePlay(card) {
    this.$emit('card-play',card)
  }
}
```
```javascript
<hand-cards :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
testPlayCard(card) {
      const index = this.testHand.indexOf(card)
      this.testHand.splice(index,1)
    }
```

这样出牌功能就完成了。
![play-card](./readme-md-pictures/截屏2022-03-22%20下午8.12.25.png)

下面我们学习用vue来给出牌动作添加一些过渡效果。

众所周知，我们的卡牌组件是用v-for动态渲染出来的，参考Vue官方文档，对于这样的列表元素，添加过渡效果需要使用`<transiton-group>`。**这个标签不同于`<template>`,默认会以`<span>`被渲染到页面上**。因此我们要用`tag`属性指定一下默认渲染的标签。

修改手牌组件如下，用`transition-group`包裹`one-card`：
```javascript
 <transition-group tag="div" name="card" class="cards">
      <one-card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
    </transition-group>
```

然后，创建`transitions.css`文件并在html中引入，根据Vue动画的法则，`transition-group`有7个特殊的类，这些类会在特定的过渡时期被自动添加到组件上。他们分别是：`v-enter`,`v-enter-active`,`v-enter-to`,`v-leave`,`v-leave-active`,`v-leave-to`和`v-move`。

这些钩子有两种使用方式：
1. 
```javascript
.组件名.v-enter {
    //...
}
```
2. 
```javascript
.name-enter {
    //...
}//name是transition-group上的name属性
```

下面我们给出牌添加过渡样式
```css
//transitions.css
.card {
    transition: all .3s
}

.card-enter {
    opacity: 0;
    transform: scale(.8) translateX(100px);
}

.card-leave-active {
    transition: all 1s,opacity .5s .5s;
    position: absolute !important;
    z-index: 10;
    pointer-events: none;
}

.card-leave-to {
    opacity: 0;
    transform: translateX(-106px) translateY(-300px) scale(1.5);
}
```
完成。

### 游戏世界和场景

接下来我们需要做三件事：
1. 给游戏添加城堡背景
2. 在城堡上挂上代表食物和血量的旗帜，并让旗帜长度跟随数值变化
3. 在城堡后面添加会移动的白云

#### 城堡
城堡长这样
![castle](./readme-md-pictures/截屏2022-03-25%20下午4.55.08.png)
明眼人都能看出来是三部分组成的，最上方的城堡，下面的大石头和城墙上的旗帜🚩，旗帜是第二个组件，我们先占个坑就行，城堡组件代码如下：
```javascript
const BigCastle = `
<div class="castle" :class="'player-'+index">
  <!-- 建筑 -->
  <img class="building" :src="'svg/castle'+index+'.svg'" />
  <!-- 大石头 -->
  <img class="ground" :src="'svg/ground'+index+'.svg'" />
  <!-- banners组件 -->
  <slot />
</div>
```
index是什么呢？由于两位玩家的城堡是不同的svg文件，通过文件名来区分，所以在创建城堡组件的时候需要传入玩家编号，即player0还是player1。
注册城堡组件：
```javascript
Vue.component('big-castle',{
  template: BigCastle,
  props: ['index']
})
```
然后在main组件中使用城堡组件，生成双方的城堡：
```javascript
<big-castle v-for="(player,index) in players" :index="index" :key="index">
</big-castle>
```
![big-castle](readme-md-pictures/截屏2022-03-25%20下午5.44.04.png)

然后加入地面和一些样式
```javascript
<div class="world">
    <big-castle v-for="(player,index) in players" :index="index" :key="index">
    </big-castle>
    <div class="land"/>
  </div>
```
![big-castle2](readme-md-pictures/截屏2022-03-25%20下午5.43.12.png)

对了！记得在html中引入城堡组件哦！不然是不生效的。
#### 旗帜🚩
旗帜也由三部分组成，旗杆，旗帜和标识数字的小气泡。
![flag](readme-md-pictures/截屏2022-03-25%20下午5.53.24.png)

这是旗杆部分
```javascript
<div class="banners">
  <img class="food-icon" src="../svg/food-icon.svg"/>
  <img class="health-icon" src="../svg/health-icon.svg"/>
</div>
```
注册旗帜组件并在main组件中插入到城堡组件的插槽中。即可看到以下变化。

![flagstaff](readme-md-pictures/截屏2022-03-25%20下午5.56.16.png)

接下来制作气泡。
很明显气泡需要两个属性，颜色和数字。分别对应`type`和`value`。
`type`可以是`health`或`food`。value则是玩家当前的生命/食物值。

既然要用到玩家数据，那么旗帜组件必须有自定义属性接收。
```javascript
Vue.component('castle-banners', {
  template: CastleBanners,
  props: ['player'],
}

const BubbleTip = `
<div class="stat-bubble" :class="type+'-bubble'">
  <img :src="'/svg/'+type+'-bubble.svg'" />
  <div class="counter">{{ value }}</div>
</div>
`

Vue.component('bubble-tip',{
  template: BubbleTip,
  props: ['type','value']
})
```
最后在旗帜组件中添加bubble组件，在main组件中给旗帜组件传递player属性
效果如下：
![bubble](readme-md-pictures/截屏2022-03-25%20下午6.11.29.png)

然后创建旗布组件
```javascript
const BannerBar = `
<svg viewBox="0 0 20 260">
  <path :d="'m 0, 0 20, 0 0, '+this.height+'-10, -10 -10, 10 z'" :style="'fill:'+this.color+';stroke:none'"/>
</svg>
`
Vue.component('banner-bar', {
  template: BannerBar,
  props: ['color'],
  data() {
    return {
      height: 260
    }
  },
}
```
在旗帜组件中使用旗布。
```javascript
const CastleBanners = `
<div class="banners">
  <img class="food-icon" src="../svg/food-icon.svg"/>
  <bubble-tip type="food" :value="player.food" />
  <banner-bar class="food-bar" :color="'#288339'" />
  <img class="health-icon" src="../svg/health-icon.svg"/>
  <bubble-tip type="health" :value="player.health"/>
  <banner-bar class="health-bar" :color="'#9b2e2e'" />
</div>
```
最后得到静态的旗帜组件
![flag-static](readme-md-pictures/截屏2022-03-25%20下午6.16.31.png)

下面我们希望气泡和旗帜的长度可以跟随数值变化。

首先是气泡，我们采用css修改定位的方式来实现。
```javascript
const BubbleTip = `
<div class="stat-bubble" :class="type+'-bubble'" :style="bubbleStyle">
  <img :src="'/svg/'+type+'-bubble.svg'" />
  <div class="counter">{{ value }}</div>
</div>
`

Vue.component('bubble-tip',{
  template: BubbleTip,
  props: ['type','value','ratio'],
  computed: {
    bubbleStyle () {
      return {
        top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
      }
    }
  }
})
```

根据现有血量和总血量的比值修改top属性，比值通过旗帜组件传入。
比值的计算也可以在旗帜组件中使用computed属性实现，因为旗帜组件拿到了player。
```javascript
Vue.component('castle-banners',{
  template: CastleBanners,
  props: ['player'],
  computed: {
    foodRatio () {
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    }
  }
})
```
现在只要把foodRatio传递给bubble就行了。
```javascript
<bubble-tip type="food" :value="player.food" :ratio="foodRatio"/>
```

然后是旗布，同样的道理，也需要ratio，不然不可能实现我们想要的效果。
```javascript
props: ['color','ratio']
```
我们想要让height能反应血量的变化，因此定义计算属性`targetHeight(){return 220 * this.ratio + 40}`
但是由于我们之前在模版中写的是`height`而不是`targetHeight`，所以血量的改变不会导致旗帜长度的变化。

聪明的你可能会想，那把`svg`中的`height`改成`targetHeight`不久好了吗？
没错，但是这样仅仅满足了我们当前的需求，日后在实现动画时就不能满足需求了。因此我们再多定义一个侦听器侦听`targetHeight`，让`targetHeight`属性在变化时修改height属性。
```javascript
watch: {
    targetHeight: {
      handler: function (newval,oldval) {
          const vm = this
          vm.height = newval
      },
      deep: true,
    }
  },
```
现在，尝试用Vue调试工具修改玩家的血量，你会惊奇的发现我们成功地让气泡和血条动了起来。

但是别高兴的太早，你会发现血条是突然从10变到5的，而没有一个逐渐掉血的过程，虽然无伤大雅但是我们写程序还是要精益求精。

还记得上面提到为什么不要之际修改`height`吗，现在用处就来了。

我们需要使用Vue提供的动画功能和tweenjs库配合完成这项功能。

原理是根据Vue的双向绑定机制，我们只要让`height`的值从10在一段时间慢慢衰减到5,那么就可以实现动画效果。我们现在明显是从10直接跳跃到了5，you know？而tweenjs就是帮助我们方便的实现值的衰减这一功能的。

当然这只是他的其中一个功能而已，他还有很多非常强大的功能等待我们去发现！

好了，了解了实现的原理我们就开始动手把。

先在html文件中导入tweenjs：
```javascript
<script src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
```

然后修改watch

```javascript
watch: {
    targetHeight: {
      handler: function (newval,oldval) {
          const vm = this
          function update () {
            vm.height = x.val.toFixed(1)
          }
          let x = {
            val:oldval
          }
          new createjs.Tween.get(x)
              .to({ val:newval },500,createjs.Ease.cubicInOut)
              .addEventListener('change', update)
      },
      deep: true,
    }
  },
```

这里我在实现的时候遇到了两个问题与诸位分享：
大家先看原书的代码：
```javascript
watch: {
    targetHeight: {
      handler: function (newval,oldval) {
          const vm = thid
          new TWEEN.Tween({value:oldval})
              .easing(TWEEN.Easing.Cubic.InOut)
              .to({value: newval}, 500)
              .onUpdate(function () {
                vm.height = this.value.toFixed(0)
              })
              .start()
      },
      deep: true,
    }
  },
```
可能是由于Tweenjs版本的原因，原书的代码已经不能使用了，因此我只能去参考官网的教程。然鹅官网不仅全是英文，示例和说明也少的要死，根本不是人看的，在我的摸索下总算是实现了和原书一致的功能。感兴趣的小伙伴可以自己去官网学习学习。

这里单独声明一个对象`x`是因为tweenjs会在动画持续时间内不断修改x的value来达到我们想要的目的，如果像原书代码一样匿名调用是不行的。

而且还有一个大坑是addEVTlsnr是不能链式添加的，如果要添加多个侦听器，必须在原始对象上添加。如果你现在不理解这句话的含义，后面制作白云动画的时候会理解的。

ok，到此为止我们的旗帜组件已经制作完毕了，去浏览器修改血量看看效果如何吧。



