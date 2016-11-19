<template>
  <main-layout>
    <transition appear>
      <div class="ingredients-view">
        <h1>Ingredients</h1>
        <button v-on:click="creatingIngredient = false">View Ingredients</button>
        <button v-on:click="creatingIngredient = true">+New Ingredient</button>
        <transition name="fade">
        <div v-show="creatingIngredient == true">
          <ingredient-create-form v-bind:ingredient="ingredient">
          </ingredient-create-form>
        </div>
        </transition>
        <transition name="fade">
          <table v-show="creatingIngredient == false">
            <table-head v-bind:headings="headings">
            </table-head>
            <ingredient-detail-table-row
              v-for="(ingredient, ingredientIndex) in ingredients"
              v-bind:ingredient="ingredient"
              v-bind:index="ingredientIndex">
            </ingredient-detail-table-row>
          </table>
        </transition>

      </div>
    </transition>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'
import TableHead from '../components/TableHead'
import IngredientDetailTableRow from '../components/IngredientDetailTableRow'
import IngredientCreateForm from '../components/IngredientCreateForm'
import * as Foods from './../models/Foods'

export default {
  components: {
    MainLayout,
    TableHead,
    IngredientDetailTableRow,
    IngredientCreateForm
  },
  data () {
    return {
      creatingIngredient: false,
      ingredient: Foods.getEmptyFood(),
      formErrors: {}
    }
  },
  methods: {
    toggleCreatingIngredient () {
      this.creatingIngredient = !this.creatingIngredient
    }
  },
  computed: {
    ingredients () {
      return this.$store.state.ingredients.ingredients
    },
    headings () {
      return this.$store.state.mealPlanner.entryTableHeadings
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
