<template>
  <div class="menu-view">
    <ul>
      <li><v-link href="/">Entries</v-link></li>
      <li><v-link href="/ingredients">Ingredients</v-link></li>
    </ul>
  </div>
</template>

<script>
import VLink from './VLink'

export default {
  components: {VLink},
  computed: {
    menuitems () {
      return [
        {title: 'Add Entry', action: 'addEmptyEntry'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-view {
  /*background-color: #f1f1f1;*/
  height: 100%;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
    /*position: fixed;*/
}
</style>
