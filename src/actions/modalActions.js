export const toggleModal = (modalType, data) => {
  return {
    type: 'TOGGLE_MODAL',
    modalType,
    data,
  };
};

export const openModal = (modalType, data) => {
  return {
    type: 'OPEN_MODAL',
    modalType,
    data,
  };
};

export const setModal = (modalType) => {
  return {
    type: 'SET_MODAL',
    modalType,
  };
};