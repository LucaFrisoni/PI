import axios from "axios";
// ----------------------------------------------------------------typeActions------------------------------------------------------------------------------
export const GET_ALL = "GET_ALL";
export const GAME_ID = "GAME_ID";
export const GENDER_FILTER = "GENDER_FILTER";
export const SOURCE_FILTER = "SOURCE_FILTER";
export const ORDER = "ORDER";
export const RATING = "RATING";
export const PLATFORM = "PLATFORM";
export const DATE = "DATE";
export const ALL_GENDERS = "ALL_GENDERS";
export const RESET = "RESET";
export const ALL_PLATFORMS = "ALL_PLATFORMS";
export const ALL_DATES = "ALL_DATES";
export const APPLY_FILTERS ="APPLY_FILTERS"

const URL = "http://localhost:3001/genres";

// ----------------------------------------------------------------Getters------------------------------------------------------------------------------
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

export const getPlatforms = (payload) => ({ type: ALL_PLATFORMS, payload });

export const getDates = (payload) => ({ type: ALL_DATES, payload });
// ----------------------------------------------------------------Reset------------------------------------------------------------------------------
export const reset = () => ({ type: RESET });

// ----------------------------------------------------------------Filters------------------------------------------------------------------------------
export const GenderFilter = (payload) => ({ type: GENDER_FILTER, payload });

export const ratingFilter = (payload) => ({ type: RATING, payload });

export const orderFilter = (payload) => ({ type: ORDER, payload });

export const sorceFilter = (payload) => ({ type: SOURCE_FILTER, payload });

export const platformFilter = (payload) => ({ type: PLATFORM, payload });

export const dateFilter = (payload) => ({ type: DATE, payload });

export const allFilts =(payload) => ({type:APPLY_FILTERS,payload})