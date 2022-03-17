const OneCard = `
<div class="card" :class="'type-'+def.type" @click="play">
  <div class="title">{{ def.title }}</div>
  <img src="../svg/card-separator.svg" class="separator"/>
  <div class="description">
    <div v-html="def.description"></div>
  </div>
  <div class="note" v-if="def.note">
    <div v-html="def.note"></div>
  </div>
</div>
`

Vue.component('one-card',{
  props:['def'],
  template: OneCard,
  methods: {
    play () {
      this.$emit('play');
    }
  }
})