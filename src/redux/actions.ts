import {CharacteristicsType, GetTrainType, TrainType} from "../type/type";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";

export const CHANGE_CHARACTERISTICS_ACTION = 'CHANGE_CHARACTERISTICS_ACTION';
export const GET_TRAINS_ACTION = 'GET_TRAINS_ACTION';
export const SET_TRAINS_ACTION = 'SET_TRAINS_ACTION';
export const RESET_TRAINS_ACTION = 'RESET_TRAINS_ACTION';

const urlGetTrains = "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json"

interface GetTrainsAction {
  type: typeof GET_TRAINS_ACTION
}

interface SetTrainsAction {
  type: typeof SET_TRAINS_ACTION
  payload: {
    trainList: GetTrainType[]
  }
}

interface ResetTrainsAction {
  type: typeof RESET_TRAINS_ACTION
}

interface ChangeCharacteristicsAction {
  type: typeof CHANGE_CHARACTERISTICS_ACTION
  payload: {
    name: TrainType["name"],
    characteristics: CharacteristicsType[],
  }
}

export function getTrainsActionCreator(): ThunkAction<void, RootState, void, ProjectActions> {
  return async (dispatch) => {
    dispatch({type: GET_TRAINS_ACTION});
    const res = await fetch(urlGetTrains)
    const data: GetTrainType[] = await res.json();

    if (data) {
      dispatch({type: SET_TRAINS_ACTION, payload: {trainList: data}})
    } else {
      dispatch({type: RESET_TRAINS_ACTION})
    }

  }
}

export function setCharacteristicsActionCreator(characteristics: CharacteristicsType[]): ThunkAction<void, RootState, void, ProjectActions> {
  return function () {
    const res = characteristics.map((characteristic) => Number(characteristic.speed)).sort(function (a, b) {
      return a - b;
    })
    console.log("Список скоростных ограничений: ", res)
  }
}

export function changeCharacteristicsActionCreator(name: TrainType["name"], characteristics: CharacteristicsType[]): ChangeCharacteristicsAction {
  return {type: CHANGE_CHARACTERISTICS_ACTION, payload: {name, characteristics}}
}

export type ProjectActions =
  | GetTrainsAction
  | SetTrainsAction
  | ResetTrainsAction
  | ChangeCharacteristicsAction
