export default (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_MENU':
      if(action.preventCloseAll) {
        return Object.assign({}, state, {
          [action.name]: !state[action.name]
        });
      } else {
        return {
          [action.name]: !state[action.name]
        };
      }

    case 'CLOSE_ALL_MENUS':
      return {};

    default:
      return state;
  }
};