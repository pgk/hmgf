
export const multiply = (ingredient, quantity) => {
  let multiplier = quantity / ingredient.quantity
  return {
    id: null,
    name: ingredient.name,
    parentId: ingredient.id,
    parentQuantity: ingredient.quantity,
    unit: ingredient.unit,
    calories: ingredient.calories * multiplier,
    protein: ingredient.protein * multiplier,
    carbs: ingredient.carbs * multiplier,
    fats: ingredient.fats * multiplier
  }
}

export const getById = (store, ingredientID) => {
  let ingredients = store.state.ingredients.ingredients

  let originalIngredient = ingredients.filter((i) => {
    return i.id === ingredientID
  })

  if (originalIngredient.length > 0) {
    return originalIngredient[0]
  }
  return null
}
