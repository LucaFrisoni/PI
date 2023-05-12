import axios from "axios";
import thunk from "redux-thunk";
import reducer from "./reducer";

export const GET_ALL = "GET_ALL";
export const GAME_ID = "GAME_ID";
export const GENDER_FILTER = "GENDER_FILTER";
export const SOURCE_FILTER = "SOURCE_FILTER";
export const ORDER = "ORDER";
export const RATING = "RATING";
export const PLATFORM = "RATING";
export const DATE = "RATING";
export const ALL_GENDERS = "ALL_GENDERS";

const URL = "http://localhost:3001/genres";

export const getAll = (data) => ({
  type: GET_ALL,
  payload: data,
});
export const getGenders = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL);
      return dispatch({ type: ALL_GENDERS, payload: response.data });
    } catch (error) {}
  };
};

export const getGameById = (data) => ({ type: GAME_ID, payload: data });

export const GenderFilter = (payload) => ({ type: GENDER_FILTER, payload });
