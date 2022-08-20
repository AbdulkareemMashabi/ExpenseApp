import { createSlice } from "@reduxjs/toolkit";
const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    expenses: [],
    totalExpenses: 0,
    expensesForLast7Days: [],
    totalExpensesForLast7Days: 0,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.expenses.push(action.payload);
      state.totalExpenses = state.totalExpenses + action.payload.expense;
      state.expenses = state.expenses.sort(
        (objA, objB) => new Date(objA.year,objA.month,objA.date).getTime() - new Date(objB.year,objB.month,objB.date).getTime()
      );

      const todayDate = new Date();
      const timeTodayDate = todayDate.getTime() / (1000 * 60 * 60 * 24);

      const temp = new Date(
        action.payload.year,
        action.payload.month,
        action.payload.date
      );
      const timeTemp = temp.getTime() / (1000 * 60 * 60 * 24);

      if (timeTodayDate - timeTemp <= 7) {
        state.expensesForLast7Days.push(action.payload);
        state.expensesForLast7Days = state.expensesForLast7Days.sort(
          (objA, objB) => new Date(objA.year,objA.month,objA.date).getTime() - new Date(objB.year,objB.month,objB.date).getTime()
        );
        state.totalExpensesForLast7Days =
          state.totalExpensesForLast7Days + action.payload.expense;
      }
    },
    removeFavorite: (state, action) => {
      const temp=state.expenses.findIndex((obj) => obj.id == action.payload)
      state.totalExpenses=state.totalExpenses-state.expenses[temp].expense
      state.expenses.splice(
        temp,
        1
      );
      

      const tempIndex= state.expensesForLast7Days.findIndex((obj) => obj.id == action.payload)
      if(tempIndex!=-1)
      {
      state.totalExpensesForLast7Days=state.totalExpensesForLast7Days-state.expensesForLast7Days[tempIndex].expense
      state.expensesForLast7Days.splice(
        tempIndex,
        1
      );

      }

    },
    update:(state, action)=>{

      state.expenses[state.expenses.findIndex(item=>item.id==action.payload.id)]=action.payload
      const index=state.expensesForLast7Days.findIndex(item=>item.id==action.payload.id)
      if(index!=-1)
      state.expensesForLast7Days[index]=action.payload

    }
  },
});

export const addFavorite = FavoritesSlice.actions.addFavorite;
export const removeFavorite = FavoritesSlice.actions.removeFavorite;
export const update= FavoritesSlice.actions.update;
export default FavoritesSlice.reducer;
