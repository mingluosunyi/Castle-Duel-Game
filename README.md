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
+ 创建一个components文件夹，然后在下面创建一个新的ui.js文件，然后在index.html中引用这个ui.js文件
+ 在ui.js文件中创建top-bar组件
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