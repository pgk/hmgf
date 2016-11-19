<template>
  <main-layout>
    <transition appear>
      <div class="ingredients-view">
        <h1>Ingredients</h1>
        <button v-on:click="creatingIngredient = false">View Ingredients</button>
        <button v-on:click="creatingIngredient = true">+New Ingredient</button>
        <transition name="fade">
        <div v-show="creatingIngredient == true">
          <div>
            <label>Name</label>
            <input type="text" name="name" v-model="ingredient.name">
          </div>
          <div>
            <label>Quantity</label>
            <input type="number" name="quantity" v-model="ingredient.quantity">
          </div>
          <div>
            <label>Unit</label>
            <input type="text" name="unit" v-model="ingredient.unit">
          </div>
          <div>
            <label>Calories</label>
            <input type="number" name="calories" v-model="ingredient.calories">
          </div>
          <div>
            <label>Protein</label>
            <input type="number" name="protein" v-model="ingredient.protein">
          </div>
          <div>
            <label>Carbs</label>
            <input type="number" name="carbs" v-model="ingredient.carbs">
          </div>
          <div>
            <label>Fats</label>
            <input type="number" name="fats" v-model="ingredient.fats">
          </div>
          <button v-on:click="validateAndAddIngredient">Add Ingredient</button>
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
import * as Foods from './../Foods'
import { mapMutations } from 'vuex'
// import store from './../store'

export default {
  components: {MainLayout, TableHead, IngredientDetailTableRow},
  data () {
    return {
      creatingIngredient: false,
      ingredient: Foods.getEmptyFood(),
      formErrors: {}
    }
  },
  methods: {
    ...mapMutations([
      'addIngredient'
    ]),
    toggleCreatingIngredient () {
      this.creatingIngredient = !this.creatingIngredient
    },
    validateAndAddIngredient () {
      let ingredient = this.ingredient
      // console.log(ingredient)
      if (!ingredient.name || !ingredient.name.trim()) {
      }

      if (!ingredient.id) {
        // we are adding a new ingredient
        this.$store.dispatch({type: 'addIngredient', ingredient})
      }
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
