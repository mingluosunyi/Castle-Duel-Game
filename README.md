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
替换html里的script标签

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
```

