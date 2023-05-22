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
  APPLY_FILTERS,
  RESET_ID,
  GAME_NAME,
  ALL_FAV,
  APPLY_FILTERS_FAV,
  ALL_DATES_FAV,
  ALL_PLATFORMS_FAV,
  DARK_MODE,
} from "./Actions";

const initialState = {
  allVideoGames: [],
  allGenders: [],
  allPlatforms: [],
  allPlatformsFav: [],
  allDates: [],
  allDatesFav: [],
  allFavs: [],
  filterFavs: [],
  idGame: {},
  filtersGames: [],
  filters: {
    gender: "",
    rating: "",
    order: "",
    source: "",
    platform: "",
    date: "",
  },
  filtersFav: {
    gender: "",
    rating: "",
    order: "",
    source: "",
    platform: "",
    date: "",
  },
  mode: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      const newState = {
        ...state,
        allVideoGames: [...payload],
        filtersGames: [...payload],
      };
      return newState;
    case ALL_FAV:
      return { ...state, allFavs: [...payload], filterFavs: [...payload] };
    case ALL_GENDERS:
      return { ...state, allGenders: [...payload] };

    case ALL_PLATFORMS:
      return { ...state, allPlatforms: [...payload] };
    case ALL_PLATFORMS_FAV:
      return { ...state, allPlatformsFav: [...payload] };

    case ALL_DATES:
      return { ...state, allDates: [...payload] };
    case ALL_DATES_FAV:
      return { ...state, allDatesFav: [...payload] };

    case GAME_ID:
      return { ...state, idGame: { ...payload } };

    case RESET_ID:
      return { ...state, idGame: {} };

    case GAME_NAME:
      return { ...state, filtersGames: payload };

    case ORDER:
      return {
        ...state,
        filters: { ...state.filters, order: payload },
        filtersFav: { ...state.filtersFav, order: payload },
      };

    case PLATFORM:
      return {
        ...state,
        filters: { ...state.filters, platform: payload },
        filtersFav: { ...state.filtersFav, platform: payload },
      };

    case DATE:
      return {
        ...state,
        filters: { ...state.filters, date: payload },
        filtersFav: { ...state.filtersFav, date: payload },
      };

    case RATING:
      return {
        ...state,
        filters: { ...state.filters, rating: payload },
        filtersFav: { ...state.filtersFav, rating: payload },
      };

    case RESET:
      return {
        ...state,
        filtersGames: [],
        filterFavs: [],
        filters: {
          ...state.filters,
          gender: "",
          rating: "",
          order: "",
          source: "",
          platform: "",
          date: "",
        },
        filtersFav: {
          ...state.filtersFav,
          gender: "",
          rating: "",
          order: "",
          source: "",
          platform: "",
          date: "",
        },
      };

    case GENDER_FILTER:
      return {
        ...state,
        // filtersGames: filteredByGender,
        filters: { ...state.filters, gender: payload },
        filtersFav: { ...state.filtersFav, gender: payload },
      };

    case SOURCE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, source: payload },
        filtersFav: { ...state.filtersFav, source: payload },
      };

    case APPLY_FILTERS:
      var filterssGames = state.allVideoGames;
      // ----------------------------------------------------------------Gender------------------------------------------------------------------------------
      if (payload.gender) {
        filterssGames = filterssGames.filter((game) =>
          game.Genders.some((gender) => gender.name === payload.gender)
        );
        if (filterssGames.length === 0) {
          alert("There are no games with such filters");
          return state;
        }
      }
      // ----------------------------------------------------------------Platform------------------------------------------------------------------------------
      if (payload.platform) {
        filterssGames = filterssGames.filter((game) => {
          return game.platforms.some((plat) => plat === payload.platform);
        });
        if (filterssGames.length === 0) {
          alert("There are no games with such filters");
          return state;
        }
      }

      // ----------------------------------------------------------------Rating------------------------------------------------------------------------------

      if (payload.rating) {
        if (payload.rating === "one") {
          filterssGames = filterssGames.filter(
            (game) => game.rating >= 1 && game.rating < 2
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
        if (payload.rating === "two") {
          filterssGames = filterssGames.filter(
            (game) => game.rating >= 2 && game.rating <= 3
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
        if (payload.rating === "three") {
          filterssGames = filterssGames.filter(
            (game) => game.rating >= 3 && game.rating < 4
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
        if (payload.rating === "four") {
          filterssGames = filterssGames.filter(
            (game) => game.rating >= 4 && game.rating <= 5
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
        if (payload.rating === "five") {
          filterssGames = filterssGames.filter((game) => game.rating === 5);
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
      }
      // ----------------------------------------------------------------Source------------------------------------------------------------------------------

      if (payload.source) {
        if (payload.source === "Api") {
          filterssGames = filterssGames.filter(
            (game) => typeof game.id === "number"
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
        if (payload.source === "dataBase") {
          filterssGames = filterssGames.filter(
            (game) => typeof game.id === "string"
          );
          if (filterssGames.length === 0) {
            alert("There are no games with such filters");
            return state;
          }
        }
      }

      // ----------------------------------------------------------------Date------------------------------------------------------------------------------

      if (payload.date) {
        filterssGames = filterssGames.filter(
          (game) => game.released.slice(0, 4) === payload.date
        );
        if (filterssGames.length === 0) {
          alert("There are no games with such filters");
          return state;
        }
      }

      // ----------------------------------------------------------------Order------------------------------------------------------------------------------

      if (payload.order) {
        console.log("estoy aqui");
        if (filterssGames.length === state.allVideoGames.length) {
          const sortedGames = [...filterssGames]; // Crear una copia del arreglo de juegos filtrados

          sortedGames.sort((a, b) => {
            if (payload.order === "Ascendent") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });

          return {
            ...state,
            filtersGames: sortedGames,
          };
        }
        if (filterssGames.length < state.allVideoGames.length)
          payload.order === "Ascendent"
            ? filterssGames.sort((a, b) => a.name.localeCompare(b.name))
            : filterssGames.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filtersGames: filterssGames,
      };
    case APPLY_FILTERS_FAV:
      var filtersssGames = state.allFavs;
      // ----------------------------------------------------------------Gender------------------------------------------------------------------------------
      if (payload.gender) {
        filtersssGames = filtersssGames.filter((game) =>
          game.genders.some((gender) => gender.name === payload.gender)
        );
        if (filtersssGames.length === 0) {
          alert("There are no favs with such filters");
          return state;
        }
      }
      // ----------------------------------------------------------------Platform------------------------------------------------------------------------------
      if (payload.platform) {
        filtersssGames = filtersssGames.filter((game) => {
          return game.platforms.some((plat) => plat === payload.platform);
        });
        if (filtersssGames.length === 0) {
          alert("There are no favs with such filters");
          return state;
        }
      }

      // ----------------------------------------------------------------Rating------------------------------------------------------------------------------

      if (payload.rating) {
        if (payload.rating === "one") {
          filtersssGames = filtersssGames.filter(
            (game) => game.rating >= 1 && game.rating < 2
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
        if (payload.rating === "two") {
          filtersssGames = filtersssGames.filter(
            (game) => game.rating >= 2 && game.rating <= 3
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
        if (payload.rating === "three") {
          filtersssGames = filtersssGames.filter(
            (game) => game.rating >= 3 && game.rating < 4
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
        if (payload.rating === "four") {
          filtersssGames = filtersssGames.filter(
            (game) => game.rating >= 4 && game.rating <= 5
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
        if (payload.rating === "five") {
          filtersssGames = filtersssGames.filter((game) => game.rating >= 4.99);
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
      }
      // ----------------------------------------------------------------Source------------------------------------------------------------------------------

      if (payload.source) {
        if (payload.source === "Api") {
          filtersssGames = filtersssGames.filter(
            (game) => typeof game.id === "number"
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
        if (payload.source === "dataBase") {
          filtersssGames = filtersssGames.filter(
            (game) => typeof game.id === "string"
          );
          if (filtersssGames.length === 0) {
            alert("There are no favs with such filters");
            return state;
          }
        }
      }

      // ----------------------------------------------------------------Date------------------------------------------------------------------------------

      if (payload.date) {
        filtersssGames = filtersssGames.filter(
          (game) => game.released.slice(0, 4) === payload.date
        );
        if (filtersssGames.length === 0) {
          alert("There are no favs with such filters");
          return state;
        }
      }

      // ----------------------------------------------------------------Order------------------------------------------------------------------------------

      if (payload.order) {
        console.log("estoy aqui");
        if (filtersssGames.length === state.allFavs.length) {
          const sortedGamesFav = [...filtersssGames]; // Crear una copia del arreglo de juegos filtrados

          sortedGamesFav.sort((a, b) => {
            if (payload.order === "Ascendent") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });

          return {
            ...state,
            filterFavs: sortedGamesFav,
          };
        }
        if (filtersssGames.length < state.allFavs.length)
          payload.order === "Ascendent"
            ? filtersssGames.sort((a, b) => a.name.localeCompare(b.name))
            : filtersssGames.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filterFavs: filtersssGames,
      };
      case DARK_MODE:
        return{
          ...state,
          mode:payload
        }

    default:
      return state;
  }
};

export default reducer;
