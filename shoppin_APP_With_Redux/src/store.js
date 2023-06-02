import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Define your reducers and initial state here
const store = configureStore({
    reducer: rootReducer,

});

export default store;