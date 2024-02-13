import {createStore, applyMiddleware} from "redux";
import {trainsReducer} from "./trainsReducer";
import {thunk} from 'redux-thunk';


export const store = createStore(
  trainsReducer,
  applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof store.getState>
