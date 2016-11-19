// import * as types from './../mutation-types'
import DatabasePersistence from './../../persistence'

// export createDatabasePersistencePlugin
let createDatabasePersistence = (databaseName) => {
  let dexie = new DatabasePersistence(databaseName, {recreate: false})

  let upsertIngredient = (ingredient) => {
    console.log('Upserting ' + ingredient)
    if (!ingredient.id) {
      delete ingredient.id // to makesure this is really not there
    }
    return dexie.getDb().then(db => {
      return db.ingredients.put(ingredient).then((ingredientID) => {
        console.log('Inserted: id=' + ingredientID)
        return db.ingredients.get(ingredientID)
      }).catch((e) => {
        console.log(e)
        throw e
      })
    })
  }

  let deleteIngredient = (ingredient) => {
    return dexie.getDb().then(db => {
      console.log('Deleting ' + ingredient)
      return db.ingredients.delete(ingredient.id).then((result) => {
        console.log('Deleted: id=' + ingredient.id)
        return ingredient
      }).catch((e) => {
        console.log(e)
        throw e
      })
    })
  }

  let getIngredients = () => {
    return dexie.getDb().then(db => {
      console.log(db)
      return db.ingredients.toCollection()
    })
  }

  let plugin = store => {
    getIngredients().then(ingredients => {
      ingredients.each((ingredient) => {
        console.log(ingredient)
        store.commit({type: 'addIngredient', ingredient})
      })
    })
  }

  return {upsertIngredient, deleteIngredient, getIngredients, plugin}
}

export const dbPersistence = createDatabasePersistence('HmgfDb2')

// {
//   id: 1,
//   name: 'Steamed Chicken Breasts',
//   quantity: 650,
//   unit: 'g',
//   calories: 1089,
//   protein: 166,
//   carbs: 0,
//   fats: 40
// },
// {
//   id: 2,
//   name: 'Frozen Green Beans',
//   quantity: 482,
//   unit: 'g',
//   calories: 180,
//   protein: 6,
//   carbs: 30,
//   fats: 0
// },
// {
//   id: 3,
//   name: 'Fage - cottage',
//   quantity: 225,
//   unit: 'g',
//   calories: 207,
//   protein: 25,
//   carbs: 7,
//   fats: 9
// }

export const ingredients = {
  state: {
    ingredients: [
    ]
  },
  mutations: {
    deleteIngredient (state, { ingredient }) {
      console.log(ingredient)
      let ingredientOnState = state.ingredients.find(i => i.id === ingredient.id)
      if (!ingredientOnState) {
        console.log('Ingredient not on state: ' + ingredient)
        return
      }
      let idx = state.ingredients.indexOf(ingredientOnState)
      if (idx >= 0) {
        state.ingredients.splice(idx, 1)
      } else {
        console.log('Ingredient index incorrect: ' + idx + ', ' + ingredient)
        return
      }
      console.log('Ingredient removed from state: ' + idx + ', ' + ingredient)
    },

    addIngredient (state, { ingredient }) {
      state.ingredients.push(ingredient)
    },

    updateIngredient (state, { ingredient }) {
      let oldIngredient = state.ingredients.find(i => i.id === ingredient.id)
      if (!oldIngredient) {
        return
      }

      Object.keys(oldIngredient).forEach((k) => {
        oldIngredient[k] = ingredient[k]
      })
    },

    editIngredientAttribute (state, { ingredient, attribute, value }) {
      if (!validateIngredientForUpdate(state, ingredient)) {
        console.log('error ingredient not found ' + ingredient)
        return
      }

      let found = state.ingredients.find(i => i.id === ingredient.id)
      if (found) {
        found[attribute] = value
      } else {

      }
    }
  },
  actions: {
    addIngredient ({ commit, state }, {ingredient}) {
      console.log(ingredient)
      dbPersistence.upsertIngredient(ingredient).then((addedIngrediend) => {
        commit({type: 'addIngredient', ingredient: addedIngrediend})
      })
    },
    updateIngredient ({ commit, state }, {ingredient}) {
      if (!validateIngredientForUpdate(state, ingredient)) {
        return
      }

      dbPersistence.upsertIngredient(ingredient).then((updatedIngrediend) => {
        commit({type: 'updateIngredient', ingredient: updatedIngrediend})
      })
    },
    deleteIngredient ({ commit, state }, {ingredient}) {
      console.log(ingredient)
      dbPersistence.deleteIngredient(ingredient).then((deletedIngredient) => {
        commit({type: 'deleteIngredient', ingredient: deletedIngredient})
      })
    },
    editIngredientAttribute ({ commit, state }, { ingredient, attribute, value }) {
      if (!validateIngredientForUpdate(state, ingredient)) {
        return
      }
      let ingredientClone = {}
      Object.keys(ingredient).forEach(k => {
        ingredientClone[k] = (k === attribute) ? value : ingredient[k]
      })
      dbPersistence.upsertIngredient(ingredientClone).then((updatedIngrediend) => {
        commit({type: 'editIngredientAttribute', ingredient: updatedIngrediend, attribute, value})
      })
    }
  }
}

let validateIngredientForUpdate = (state, ingredient) => {
  if (!ingredient.id) { return false }
  let oldIngredient = state.ingredients.find(i => i.id === ingredient.id)
  if (!oldIngredient) { return false }
  return true
}
