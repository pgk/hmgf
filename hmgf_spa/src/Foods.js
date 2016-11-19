
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

export const nutrientReducer = (totals, food) => {
  totals.calories += food.calories
  totals.protein += food.protein
  totals.carbs += food.carbs
  totals.fats += food.fats
  return totals
}

export const getEmptyFood = () => {
  return {
    id: null,
    name: '',
    unit: 'g',
    parentId: null,
    parentQuantity: null,
    quantity: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  }
}
