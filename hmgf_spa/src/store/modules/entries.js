// entries: [
//   {
//     weekName: 'Week 1',
//     dayName: 'Day 1',
//     meals: [
//       {
//         title: 'Main meal',
//         ingredients: [
//           {
//             ingredientID: 1,
//             quantity: 650
//           },
//           {
//             ingredientID: 2,
//             quantity: 482
//           }
//         ]
//       },
//       {
//         title: 'Snack',
//         ingredients: [
//           {
//             ingredientID: 3,
//             quantity: 225
//           }
//         ]
//       }
//     ]
//   }
// ]
// import * as FoodEntries from './../../models/FoodEntries'

export default {
  state: {
    entries: []
  },
  mutations: {
    addEntry (state, {entry}) {
      state.entries.push(entry)
    },
    deleteEntry (state, {entry}) {
    },
    updateEntry (state, {entry}) {
    }
  }
}
