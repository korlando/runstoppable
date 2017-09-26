export default (state = { collapsed: false }, action) => {
  switch(action.type) {
    case 'TOGGLE_SIDEBAR':
      return Object.assign({}, state, {
        collapsed: !state.collapsed
      });

    default:
      return state;
  }
};