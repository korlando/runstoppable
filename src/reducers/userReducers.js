const defaultState = {
  name: 'Ron Stoppable',
  photo: 'images/default-ron.jpg',
  shoes: [],
  heightFt: '5',
  heightIn: '6',
  weight: '140',
  units: 'metric',
  timezone: 'America/New_York',
};

export default (state = defaultState, action) => {
  switch(action.type) {
  	case 'EDIT_PROFILE':
	    return Object.assign({}, state, action.changes);
    default:
      return state;
  }
};