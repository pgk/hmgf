<template>
  <div>
    <form-field type="text" attribute="name" label="Name" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="number" attribute="quantity" label="Quantity" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="text" attribute="unit" label="Unit" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="number" attribute="calories" label="Calories" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="number" attribute="protein" label="Protein" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="number" attribute="carbs" label="Carbs" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>

    <form-field type="number" attribute="fats" label="Fats" v-bind:model="ingredient" v-bind:errorsFrom="validationErrors">
    </form-field>
    <button v-on:click="validateAndAddIngredient">Add Ingredient</button>
  </div>
</template>

<script>
import FormField from './FormField'
// import * as Foods from './../Foods'

export default {
  components: {FormField},
  props: ['ingredient'],
  data () {
    return {
      validationErrors: {
        name: null,
        quantity: null,
        unit: null,
        calories: null,
        protein: null,
        carbs: null,
        fats: null
      }
    }
  },
  methods: {
    validateAndAddIngredient () {
      let ingredient = this.ingredient

      this.validationErrors['name'] = null
      if (!ingredient.name || !ingredient.name.trim()) {
        this.validationErrors['name'] = 'Name should not be empty'
        return
      }

      if (!ingredient.id) {
        // we are adding a new ingredient
        this.$store.dispatch({type: 'addIngredient', ingredient})
      }
    }
  }
}
</script>

<style scoped>
</style>
