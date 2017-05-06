export default (state = { show: false }, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
        show: !state.show,
        type: action.modalType || state.type
      });
    case 'SET_MODAL':
      return Object.assign({}, state, {
        type: action.modalType
      });
    default:
      return state;
  }
};