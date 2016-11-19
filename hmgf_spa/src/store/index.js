import Vue from 'vue'
import Vuex from 'vuex'
import {ingredients, dbPersistence} from './modules/ingredients'
import * as types from './mutation-types'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  mealPlanner: {
    title: 'Meal Planner',
    entryTableHeadings: ['Quantity', 'Name', 'Unit', 'Calories', 'Protein', 'Carbs', 'Fats'],
    ingredientTableHeadings: ['Quantity', 'Name', 'Unit', 'Calories', 'Protein', 'Carbs', 'Fats'],
    entries: [
      {
        weekName: 'Week 1',
        dayName: 'Day 1',
        meals: [
          {
            title: 'Main meal',
            ingredients: [
              {
                ingredientID: 1,
                quantity: 650
              },
              {
                ingredientID: 2,
                quantity: 482
              }
            ]
          },
          {
            title: 'Snack',
            ingredients: [
              {
                ingredientID: 3,
                quantity: 225
              }
            ]
          }
        ]
      }
    ]
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

const actions = {
  [types.UPDATE_INGREDIENT_FOR_MEAL_FOR_ENTRY] ({commit}, payload) {
    commit(types.UPDATE_INGREDIENT_FOR_MEAL_FOR_ENTRY, payload)
  },
  [types.ADD_EMPTY_ENTRY] ({commit}) {
    commit(types.ADD_EMPTY_ENTRY)
  },
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    ingredients
  },
  plugins: [dbPersistence.plugin]
})
