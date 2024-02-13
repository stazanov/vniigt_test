import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ProjectActions} from "./actions";
import {RootState} from "./store";
import {ThunkDispatch} from "redux-thunk";

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, ProjectActions>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector