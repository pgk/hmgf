<template>
  <main-layout>
    <transition appear>
      <div class="meal-planner-view">
        <h1>{{ mealPlannerTitle }}</h1>
        <meal-planner-entry
          v-for="(entry, index) in entries"
          v-bind:entry="entry"
          v-bind:index="index">
        </meal-planner-entry>
        <button v-on:click="addEmptyEntry">Add Entry</button>
      </div>
    </transition>
  </main-layout>
</template>

<script>
import MealPlannerEntry from '../components/MealPlannerEntry'
import MainLayout from '../layouts/MainLayout.vue'
import * as types from './../store/mutation-types'

export default {
  components: {MealPlannerEntry, MainLayout},
  methods: {
    addEmptyEntry () {
      this.$store.dispatch(types.ADD_EMPTY_ENTRY)
    }
  },
  computed: {
    mealPlannerTitle () {
      return this.$store.state.mealPlanner.title
    },
    showEntries () {
      return this.$store.state.mealPlanner.showEntries
    },
    entries () {
      return this.$store.state.mealPlanner.entries
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.meal-planner-view {
  background-color: #FFFFFF;
}
.nice-input {
  font-size: 0.9em;
  border: 0;
  width:100%;
}
</style>
