export const SHOW_ASIDE = 'showAside';
export const SHOW_SEARCH = 'showSearch';
export const SHOW_LOGIN = 'showLogin';
export const SHOW_ALBUM = 'showAlbum';
export const SHOW_JASON = 'showJason';

export const state = () => ({
  [ SHOW_ASIDE ]: true,
  [ SHOW_SEARCH ]: false,
  [ SHOW_LOGIN ]: false,
  [ SHOW_ALBUM ]: false,
  [ SHOW_JASON ]: false
});

export const mutations = {
  [ SHOW_ASIDE ] (state, bl) {
    state[ SHOW_ASIDE ] = bl;
  },
  [ SHOW_SEARCH ] (state, bl) {
    state[ SHOW_SEARCH ] = bl;
  },
  [ SHOW_LOGIN ] (state, bl) {
    state[ SHOW_LOGIN ] = bl;
  },
  [ SHOW_ALBUM ] (state, bl) {
    state[ SHOW_ALBUM ] = bl;
  },
  [ SHOW_JASON ] (state, bl) {
    state[ SHOW_JASON ] = bl;
  }
};
