export default (state = { show: false }, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
        show: !state.show,
        type: action.modalType || state.type,
        data: action.data,
      });
    case 'OPEN_MODAL':
      return Object.assign({}, state, {
        show: true,
        type: action.modalType,
        data: action.data,
      });
    case 'SET_MODAL':
      return Object.assign({}, state, {
        type: action.modalType
      });
    default:
      return state;
  }
};