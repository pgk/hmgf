<template>
  <div class="form-view">
    <h1>{{ formTitle }}</h1>
    <form v-bind:action="formAction">
      <form-field
        v-for="(field, index) in formFields"
        v-bind:field="field"
        v-bind:index="index">
      </form-field>
    </form>
  </div>
</template>

<script>
import FormField from './FormField'
export default {
  components: {FormField},
  computed: {
    formTitle () {
      return this.$store.state.formDef.title
    },
    formAction () {
      return this.$store.state.formDef.action
    },
    formFields () {
      return this.$store.state.formDef.fields
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
