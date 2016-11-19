import Dexie from 'dexie'

let migrations = (db) => {
  db.version(1).stores({
    users: '++id, nickname, password, email',
    ingredients: '++id, name, parentID, parentQuantity, quantity, unit, calories, protein, carbs, fats',
    entries: '++id, weekName, dayName, userID',
    entryIngredients: '++id, entryID, quantity, unit'
  })

  db.version(2).stores({
    users: '++id, nickname, password, email, dateActivated, dateRegistered',
    ingredients: '++id, name, parentID, parentQuantity, quantity, unit, calories, protein, carbs, fats, *childrenIngredients',
    entries: '++id, weekName, dayName, userID, *meals',
  })
}

export const createDatabasePersistence = (databaseName) => {
  let connected = false
  let recreate = false

  let getDb = (() => {
    let db = null
    let initializeDatabase = () => {
      if (connected) {
        return Dexie.Promise.resolve(db)
      }

      migrations(db)

      return db.open().then(() => {
        connected = true
        return db
      })
    }
    return () => {
      if (db) {
        return Dexie.Promise.resolve(db)
      }

      return new Dexie.Promise((resolve, reject) => {
        db = new Dexie(databaseName)
        if (recreate) {
          db.delete().then(() => {
            initializeDatabase().then(() => resolve(db))
          }).catch(e => reject(e))
        } else {
          initializeDatabase().then(() => resolve(db)).catch(e => reject(e))
        }
      })
    }
  })()

  let upsertIngredient = (ingredient) => {
    console.log('Upserting ' + ingredient)
    if (!ingredient.id) {
      delete ingredient.id // to makesure this is really not there
    }
    return getDb().then(db => {
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
    return getDb().then(db => {
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
    return getDb().then(db => {
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

// export const dbPersistence = createDatabasePersistence('HmgfDb2')
