export default (state = { show: false }, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
        show: !state.show
      });

    default:
      return state;
  }
};