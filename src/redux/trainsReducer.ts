import {
  GET_TRAINS_ACTION,
  CHANGE_CHARACTERISTICS_ACTION, ProjectActions, SET_TRAINS_ACTION, RESET_TRAINS_ACTION
} from './actions'
import {TrainType} from "../type/type";
import {isValidList} from "../utils/isValidList";

const initialTrains: { trainList: TrainType[], loading: boolean } = {
  trainList: [],
  loading: false,
}

export function trainsReducer(state = initialTrains, action: ProjectActions) {
  switch (action.type) {
    case GET_TRAINS_ACTION:
      return {
        ...state,
        loading: true
      }

    case SET_TRAINS_ACTION:
      return {
        trainList: action.payload.trainList.map((train) => ({
          ...train,
          characteristics: {data: train.characteristics, isValid: true}
        })),
        loading: false
      }

    case RESET_TRAINS_ACTION:
      return {
        ...state,
        loading: false
      }

    case CHANGE_CHARACTERISTICS_ACTION:
      let isValid: boolean = true
      const res = state.trainList.map((train) => {
        if (train.name === action.payload.name) {
          isValid = isValidList(action.payload.characteristics)
          return {
            ...train,
            characteristics: {data: action.payload.characteristics, isValid: isValid}
          }
        }
        return train;
      })
      return {
        loading: false,
        trainList: res,
      }

    default:
      break;
  }

  return state;
}
