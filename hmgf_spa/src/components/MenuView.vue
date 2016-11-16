<template>
  <div class="three columns">
    <div class="menu-view">
      <ul>
        <li><a href="#entries" v-on:click="showEntries">Entries</a></li>
        <li><a href="#ingredients" v-on:click="showIngredients">Ingredients</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
