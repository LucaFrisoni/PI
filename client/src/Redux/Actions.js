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
export const APPLY_FILTERS = "APPLY_FILTERS";
export const RESET_ID = "RESET_ID";
export const GAME_NAME = "GAME_NAME";
export const ALL_FAV = "ALL_FAV";
export const APPLY_FILTERS_FAV = "APPLY_FILTERS_FAV";
export const ALL_PLATFORMS_FAV = "ALL_PLATFORMS_FAV";
export const ALL_DATES_FAV = "ALL_DATES_FAV";
export const DARK_MODE = "DARK_MODE";

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

export const getGameByName = (payload) => ({ type: GAME_NAME, payload });

export const getPlatforms = (payload) => ({ type: ALL_PLATFORMS, payload });

export const getDates = (payload) => ({ type: ALL_DATES, payload });

// ----------------------------------------------------------------Reset------------------------------------------------------------------------------
export const reset = () => ({ type: RESET });

export const resetId = () => ({ type: RESET_ID });

// ----------------------------------------------------------------Filters------------------------------------------------------------------------------
export const GenderFilter = (payload) => ({ type: GENDER_FILTER, payload });

export const ratingFilter = (payload) => ({ type: RATING, payload });

export const orderFilter = (payload) => ({ type: ORDER, payload });

export const sorceFilter = (payload) => ({ type: SOURCE_FILTER, payload });

export const platformFilter = (payload) => ({ type: PLATFORM, payload });

export const dateFilter = (payload) => ({ type: DATE, payload });

export const allFilts = (payload) => ({ type: APPLY_FILTERS, payload });

export const allFiltsFav = (payload) => ({ type: APPLY_FILTERS_FAV, payload });
// ----------------------------------------------------------------Favs------------------------------------------------------------------------------

export const getPlatformsFav = (payload) => ({
  type: ALL_PLATFORMS_FAV,
  payload,
});

export const getDatesFav = (payload) => ({ type: ALL_DATES_FAV, payload });

export const getFavs = () => {
  return async function (dispatch) {
    try {
      const respone = await axios.get("http://localhost:3001/favorites");
      return dispatch({ type: ALL_FAV, payload: respone.data.allFavorites });
    } catch (error) {}
  };
};

export const setMode = (payload) => ({ type: DARK_MODE, payload });
