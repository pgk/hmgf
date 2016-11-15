<template>
  <div class="meal-planner-day-totals">
    <table>
      <tr>
        <th>Calories</th>
        <th>Protein</th>
        <th>Carbs</th>
        <th>Fats</th>
      </tr>
      <tr>
        <td>{{ totals.calories.toFixed(2) }}</td>
        <td>{{ totals.protein.toFixed(2) }}</td>
        <td>{{ totals.carbs.toFixed(2) }}</td>
        <td>{{ totals.fats.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['totals']
}
</script>
