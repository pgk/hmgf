
export default {
  getEmptyFood () {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    }
  },

  nutrientReducer (total, item) {
    total.calories += item.calories
    total.protein += item.protein
    total.carbs += item.carbs
    total.fats += item.fats
    return total
  }
}
