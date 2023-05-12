import {
  GET_ALL,
  GAME_ID,
  ORDER,
  RATING,
  DATE,
  GENDER_FILTER,
  SOURCE_FILTER,
  PLATFORM,
  ALL_GENDERS,
} from "./Actions";

const initialState = {
  allVideoGames: [],
  allGenders: [],
  idGame: {},
  filtersGames: [],
};

//   state.allVideogames.Genders.map((game)=>game.name).filter((e)=>e === payload)

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      const newState = { ...state, allVideoGames: [...payload] };

      return newState;
    case ALL_GENDERS:
      return { ...state, allGenders: [payload] };
    case GAME_ID:
      return { ...state, idGame: { ...payload } };

    case ORDER:
      return { ...state, filtersGames: { ...payload } };

    case RATING:
      return { ...state, filtersGames: { ...payload } };

    case DATE:
      return { ...state, filtersGames: { ...payload } };

    case GENDER_FILTER:
      const filteredGames = state.allVideoGames.filter((game) =>
        game.Genders.some((genre) => genre.name === payload)
      );

      return { ...state, filtersGames: filteredGames };

    case SOURCE_FILTER:
      return { ...state, filtersGames: { ...payload } };

    case PLATFORM:
      return { ...state, filtersGames: { ...payload } };
    default:
      return state;
  }
};

export default reducer;
