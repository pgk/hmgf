<template>
  <div class="form-field">
    <label>{{ field.name }}</label>
    <input v-bind:name="field.name" v-bind:value="field.value" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      field: {
        name: '',
        value: 0
      }
    }
  }
}
</script>
