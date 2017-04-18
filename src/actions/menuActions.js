export const toggleMenu = (name, preventCloseAll) => {
  return {
    type: 'TOGGLE_MENU',
    name,
    preventCloseAll
  };
};

export const closeAllMenus = () => {
  return {
    type: 'CLOSE_ALL_MENUS'
  };
};