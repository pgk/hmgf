<template>
  <tr>
    <td><input class="nice-input" type="number" size="3"
          v-bind:value="ingredientEntry.quantity"
          v-on:change="updateIngredient(ingredientEntry, $event)" />
    </td>
    <td>{{ ingredient.name }} ({{ ingredient.parentQuantity }} {{ ingredient.unit }})</td>
    <td>{{ ingredient.unit }}</td>
    <td>{{ ingredient.calories.toFixed(2) }}</td>
    <td>{{ ingredient.protein.toFixed(2) }}</td>
    <td>{{ ingredient.carbs.toFixed(2) }}</td>
    <td>{{ ingredient.fats.toFixed(2) }}</td>
  </tr>
</template>

<script>
import store from './../store'
import * as types from './../store/mutation-types'
import * as Foods from './../Foods'

export default {
  props: ['ingredientEntry', 'index', 'mealIndex', 'entryIndex'],
  computed: {
    ingredient () {
      let ingredientEntry = this.ingredientEntry
      let originalIngredient = Foods.getById(this.$store, ingredientEntry.ingredientID)
      if (originalIngredient !== null) {
        return Foods.multiply(originalIngredient, ingredientEntry.quantity)
      }
      return {}
    }
  },
  methods: {
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
