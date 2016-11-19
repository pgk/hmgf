<template>
  <tr>
    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="number"
      attribute="quantity">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="text"
      attribute="name">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="text"
      attribute="unit">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="number"
      attribute="calories">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="number"
      attribute="protein">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="number"
      attribute="carbs">
    </ingredient-detail-table-cell>

    <ingredient-detail-table-cell
      v-bind:ingredient="ingredient"
      inputType="number"
      attribute="fats">
    </ingredient-detail-table-cell>

    <td>
      <div>
        <a>Edit</a>
      </div>
      <div>
        <a @click="deleteIngredient">Remove</a>
      </div>

    </td>
  </tr>
</template>

<script>
import store from './../store'
import * as types from './../store/mutation-types'
import IngredientDetailTableCell from './IngredientDetailTableCell'
// import * as Foods from './../Foods'
// import { mapMutations } from 'vuex'

export default {
  components: {IngredientDetailTableCell},
  props: ['ingredient', 'index'],
  methods: {
    deleteIngredient () {
      let ingredient = this.ingredient
      store.dispatch({type: 'deleteIngredient', ingredient})
    },
    updateIngredient (ingredient, event) {
      if (event) {
        event.preventDefault()
      }

      let val = parseInt(event.target.value.trim(), 10)
      if (isNaN(val)) { return }

      store.dispatch({
        type: types.UPDATE_INGREDIENT_FOR_MEAL_FOR_ENTRY,
        entryIndex: this.entryIndex,
        mealIndex: this.mealIndex,
        ingredientIndex: this.index,
        key: 'quantity',
        value: val
      })
    }
  }
}
</script>

<style>
.nice-input {
  font-size: 0.9em;
  border: 0;
  width:100%;
}
</style>
