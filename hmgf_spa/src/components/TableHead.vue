<template>
  <tr>
    <th v-for="heading in headings">{{ heading }}</th>
  </tr>
</template>

<script>
export default {
  props: ['headings']
}
</script>
