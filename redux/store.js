import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expensesSlice';
import dateReducer from './slices/dateSlice';
import userReducer from './slices/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        expense: expenseReducer,
        date: dateReducer,
    }
  })
}