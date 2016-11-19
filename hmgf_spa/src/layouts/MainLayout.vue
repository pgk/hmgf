<template>
  <div class="container">
    <div class="row">
      <div class="three columns">
        <menu-view></menu-view>
      </div>
      <div class="nine columns">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuView from '../components/MenuView'
  export default {
    components: {MenuView}
  }
</script>

<style>
html {
  height: 100%;
  /*background-color: #1f1f1f;*/
}

body {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*height: 100%;*/
}

#app {
  color: #2c3e50;
  /*margin-top: -100px;*/
  /*max-width: 600px;*/
  font-family: Source Sans Pro, Helvetica, sans-serif;
  /*text-align: center;*/
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
