import Vue from 'vue'
import Vuex from 'vuex'
import {createIngredientsModule} from './modules/ingredients'
import entries from './modules/entries'
import * as types from './mutation-types'
import {createDatabasePersistence} from './../persistence'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  mealPlanner: {
    title: 'Meal Planner',
    entryTableHeadings: ['Quantity', 'Name', 'Unit', 'Calories', 'Protein', 'Carbs', 'Fats'],
    ingredientTableHeadings: ['Quantity', 'Name', 'Unit', 'Calories', 'Protein', 'Carbs', 'Fats']
  },
  changelog: []
}

const mutations = {

  [types.UPDATE_INGREDIENT_FOR_MEAL_FOR_ENTRY] (state, {entryIndex, mealIndex, ingredientIndex, key, value}) {
    // console.log(entryIndex, mealIndex, ingredientIndex, key, value)
    let entry = state.mealPlanner.entries[entryIndex]
    if (!entry) { return }
    if (!entry.meals) { return }
    let meal = entry.meals[mealIndex]
    if (!meal) { return }
    if (!meal.ingredients) { return }
    let ingredient = meal.ingredients[ingredientIndex]
    if (!ingredient) { return }
    if (key === 'quantity') {
      let intValue = parseInt(value, 10)
      let percentChange = intValue / ingredient.quantity
      ingredient.quantity = intValue
      ingredient.calories = +(ingredient.calories * percentChange).toFixed(0)
      ingredient.protein = +(ingredient.protein * percentChange).toFixed(0)
      ingredient.carbs = +(ingredient.carbs * percentChange).toFixed(0)
      ingredient.fats = +(ingredient.fats * percentChange).toFixed(0)
    }
  },

  [types.ADD_EMPTY_ENTRY] (state) {
    let entry = {
      weekName: '',
      dayName: '',
      meals: []
    }
    state.mealPlanner.entries.push(entry)
  }

}

const dbPersistence = createDatabasePersistence('HmgfDb2')

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  mutations,
  modules: {
    ingredients: createIngredientsModule(dbPersistence),
    entries
  },
  plugins: [dbPersistence.plugin]
})
