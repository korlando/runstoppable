export default (state = {}, action) => {
  switch(action.type) {
    case 'SET_SETTING':
      return Object.assign({}, {
        type: action.settingType
      });
    default:
      return state;
  }
};