export const toggleModal = () => {
  return {
    type: 'TOGGLE_MODAL',
  };
};

export const setModal = (modalType) => {
  return {
    type: "SET_MODAL",
    modalType
  }
}