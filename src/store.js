import { configureStore } from '@reduxjs/toolkit';
import BreedReducer from './reducer/BreedReducer';

export default configureStore({
  reducer: {
    breed: BreedReducer,
  },
});
