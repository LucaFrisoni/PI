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
  RESET,
  ALL_PLATFORMS,
  ALL_DATES,
} from "./Actions";

const initialState = {
  allVideoGames: [],
  allGenders: [],
  allPlatforms: [],
  allDates: [],
  idGame: {},
  filtersGames: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      const newState = {
        ...state,
        allVideoGames: [...payload],
      };
      return newState;

    case ALL_GENDERS:
      return { ...state, allGenders: [...payload] };

    case ALL_PLATFORMS:
      return { ...state, allPlatforms: [...payload] };
    case ALL_DATES:
      return { ...state, allDates: [...payload] };

    case GAME_ID:
      return { ...state, idGame: { ...payload } };

    case ORDER:
      const compareById = (a, b) => {
        if (a.id < b.id) {
          return payload === "Ascendent" ? -1 : 1;
        }
        if (a.id > b.id) {
          return payload === "Ascendent" ? 1 : -1;
        }
        return 0;
      };
      const copyAllVideoGames = [...state.allVideoGames];
      const sortedGames = copyAllVideoGames.sort(compareById);
   
      return {
        ...state,
        filtersGames: sortedGames,
      };

    case PLATFORM:
      const platGames = state.allVideoGames.filter((game) =>
        game.platforms.includes(payload)
      );
  
      return { ...state, filtersGames: platGames };

    case DATE:
      const dateGame = state.allVideoGames.filter(
        (game) => game.released.slice(0, 4) === payload
      );
      
      
      return { ...state, filtersGames: dateGame };

    case RATING:
      let filterByRating;
    
      if (payload === "one") {
        filterByRating = state.allVideoGames.filter((game) => game.rating <= 1);
        if (filterByRating.length === 0) {
          alert("There are no games with that Rating");
          return state;
        }
      }
      if (payload === "two") {
        filterByRating = state.allVideoGames.filter(
          (game) => game.rating > 1 && game.rating <= 2
        );
        if (filterByRating.length === 0) {
          alert("There are no games with that Rating");
          return state;
        }
      }
      if (payload === "three") {
        filterByRating = state.allVideoGames.filter(
          (game) => game.rating > 2 && game.rating <= 3
        );
        if (filterByRating.length === 0) {
          alert("There are no games with that Rating");
          return state;
        }
      }
      if (payload === "four") {
        filterByRating = state.allVideoGames.filter(
          (game) => game.rating > 3 && game.rating <= 4
        );
        if (filterByRating.length === 0) {
          alert("There are no games with that Rating");
          return state;
        }
      }
      if (payload === "five") {
        filterByRating = state.allVideoGames.filter(
          (game) => game.rating > 4 && game.rating <= 5
        );
        if (filterByRating.length === 0) {
          alert("There are no games with that Rating");
          return state;
        }
      }

      return { ...state, filtersGames: filterByRating };

    case RESET:
      return { ...state, filtersGames: [] };

    case GENDER_FILTER:
      const filteredByGender = state.allVideoGames.filter((game) =>
        game.Genders.some((genre) => genre.name === payload)
      );
      if (filteredByGender.length === 0) {
        alert("There are no games with that Genre");
        return state;
      }
  
      return { ...state, filtersGames: filteredByGender };

    case SOURCE_FILTER:
      let sourceGames;

      if (payload === "Api") {
        sourceGames = state.allVideoGames.filter(
          (game) => typeof game.id === "number"
        );
      }
      if (payload === "dataBase") {
        sourceGames = state.allVideoGames.filter(
          (game) => typeof game.id === "string"
        );
      }
      return { ...state, filtersGames: sourceGames };

    default:
      return state;
  }
};

export default reducer;
