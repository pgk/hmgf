<template>
  <div class="meal-planner-day-entry row">
    <h2>{{ entry.weekName }}, {{ entry.dayName }} Meals</h2>
    <div class="meal-planner-meal-entry" v-for="(meal, mealIndex) in entry.meals">
      <h3>{{ meal.title }}</h3>
      <table>
        <table-head v-bind:headings="headings">
        </table-head>
        <ingredient-table-row
          v-for="(ingredientEntry, ingredientIndex) in meal.ingredients"
          v-bind:ingredientEntry="ingredientEntry"
          v-bind:index="ingredientIndex"
          v-bind:mealIndex="mealIndex"
          v-bind:entryIndex="index">
        </ingredient-table-row>
      </table>
      <button>Add Ingredient</button>
    </div>

    <h3>{{ entry.weekName }}, {{ entry.dayName }} Totals</h3>
    <entry-totals v-bind:totals="totals">
    </entry-totals>
  </div>
</template>

<script>
import EntryTotals from './EntryTotals'
import TableHead from './TableHead'
import IngredientTableRow from './IngredientTableRow'
import * as Foods from './../models/Foods'

export default {
  props: ['entry', 'index'],
  components: {EntryTotals, IngredientTableRow, TableHead},
  computed: {
    headings () {
      return this.$store.state.mealPlanner.entryTableHeadings
    },
    totals () {
      let meals = this.entry.meals
      return meals.reduce((total, meal) => {
        let mealTotals = meal.ingredients.reduce((total, ingr) => {
          let ingred = Foods.getById(this.$store, ingr.ingredientID)
          return Foods.nutrientReducer(total, Foods.multiply(ingred, ingr.quantity))
        }, Foods.getEmptyFood())
        return Foods.nutrientReducer(total, mealTotals)
      }, Foods.getEmptyFood())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
