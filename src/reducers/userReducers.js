const defaultState = {
  name: 'Ron Stoppable',
  photo: 'https://avatars.slack-edge.com/2017-03-24/158411923920_7614b17cc53af6223f1b_72.jpg',
  shoes: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};