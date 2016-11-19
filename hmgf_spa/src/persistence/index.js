import Dexie from 'dexie'

export default class DatabasePersistence {

  connected = false
  db = null

  constructor (dbname, {recreate}) {
    this.dbname = dbname
    this.recreate = recreate || false
  }

  getDb () {
    if (this.db) {
      return Dexie.Promise.resolve(this.db)
    }

    return new Dexie.Promise((resolve, reject) => {
      this.db = new Dexie(this.dbname)
      if (this.recreate) {
        this.db.delete().then(() => {
          this.initializeDatabase().then(db => resolve(db))
        }).catch(e => reject(e))
      } else {
        this.initializeDatabase().then(db => resolve(db)).catch(e => reject(e))
      }
    })
  }

  initializeDatabase () {
    if (this.connected) {
      return Dexie.Promise.resolve(this.db)
    }

    this.db.version(1).stores({
      users: '++id, nickname, password, email',
      ingredients: '++id, name, parentID, parentQuantity, quantity, unit, calories, protein, carbs, fats',
      entries: '++id, weekName, dayName, userID',
      entryIngredients: '++id, entryID, quantity, unit'
    })

    return this.db.open().then(() => {
      this.connected = true
      return this.db
    })
  }
}
