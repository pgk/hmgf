<template>
  <td>
    <span v-show="editing == false" @dblclick="editing = true">{{ ingredientCellValue }}</span>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      v-bind:type="inputType"
      v-bind:value="ingredient[attribute]"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </td>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  props: ['ingredient', 'attribute', 'inputType'],
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (!value) { return }
      context.$nextTick(() => { el.focus() })
    }
  },
  computed: {
    ingredientCellValue () {
      return this.ingredient[this.attribute]
    }
  },
  methods: {
    doneEdit (e) {
      const value = e.target.value.trim()
      const { ingredient, attribute } = this
      if (!value) {
        return
      } else if (this.editing) {
        this.$store.dispatch({
          type: 'editIngredientAttribute',
          ingredient,
          attribute,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.ingredient[this.attribute]
      this.editing = false
    }
  }
}
</script>

<style>
</style>
