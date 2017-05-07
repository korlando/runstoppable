export const toggleModal = (modalType) => {
  return {
    type: 'TOGGLE_MODAL',
    modalType
  };
};

export const setModal = (modalType) => {
  return {
    type: "SET_MODAL",
    modalType
  };
};