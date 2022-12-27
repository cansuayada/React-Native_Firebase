import * as constants from '../constans';
import * as auth from '../../firebase/auth';
import * as products from '../../firebase/products';

export const setAccount = (key, value) => ({
  type: constants.SET_ACCOUNT,
  key,
  value,
});

export const userSignUp = payload => async (dispatch, getState) => {
  //loginuser
  const {email, password} = getState().app;
  dispatch({type: constants.REQUEST_SIGN_IN, payload: user});

  try {
    await auth.userSignUp(email, password);
    const user = await auth.getUserInfo(user);
    console.log(user);
    dispatch({
      type: constants.REQUEST_SIGN_IN,
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUserFb = payload => async (dispatch, getState) => {
  //createuser
  const {email, password, username, lastname} = getState().app;
  dispatch({type: constants.REQUEST_SIGN_UP});
  try {
    await auth.createUserFb(email, password);
    dispatch({
      type: constants.REQUEST_SIGN_UP,
      payload: username,
      lastname,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userSignout = payload => async dispatch => {
  //logout user
  dispatch({type: constants.REQUEST_SIGN_OUT});
  try {
    await auth.userSignout();
  } catch (error) {
    console.log(error);
  }
};

//* DB Firebase *//

export const requestAllProducts = payload => async (dispatch, getState) => {
  //axios ile dataları çekmek için
  try {
    const response = await products.getAllProducts(response);

    dispatch({type: constants.REQUEST_GET_ALL_PRODUCTS, payload: response});
  } catch (error) {
    console.log('DATA ERROR', error);
  }
};

export const favoritesProducts = payload => async (dispatch, getState) => {
  //favoriye eklemek için
  const user = auth.getUserInfo();
  //const {user} = getState().app;
  const favs = await products.addProductToFirebase(payload, user);
  dispatch({type: constants.FAVORITES_PRODUCTS, payload: favs});
};

export const getAllProductsToFirebase =
  payload => async (dispatch, getState) => {
    const user = auth.getUserInfo();
    const favs = await products.getAllProductToFirebase(user);
    dispatch({type: constants.GET_FAVORITES_PRODUCTS, payload: favs});
  };

export const selectProduct = (payload = async (dispatch, getState) => {
  const select = dispatch({
    type: constants.SELECT_PTODUCT,
    payload: selectProduct,
  });
  console.log('Select Product Actions', select);

  try {
    return select;
  } catch (error) {
    console.log('Select Product Actions', error);
  }
});

export const requestAddProductsToFirebase =
  payload => async (dispatch, getState) => {
    const {user} = getState().app;

    const {data, success} = await products.addProductToFirebase(
      payload,
      user.user.uid,
    );

    if (success) {
      dispatch({
        type: constants.REQUEST_ADD_PRODUCT_FB,
        payload: data,
      });
    } else {
    }
  };

export const requestGetAllProductsFromFirebase =
  payload => async (dispatch, getState) => {
    const {userInfo} = getState().app;
    console.log('user info', userInfo);

    const data = await products.getAllPRoductsFromFirebase(userInfo.user.uid);
    console.log(
      'DATA',
      dispatch({
        type: constants.REQUEST_GET_PRODUCTS_FB,
        payload: data,
      }),
    );
  };

export const firebaseProductsListener =
  payload => async (dispatch, getState) => {
    const {user} = getState().app;

    const {off, data, success} = await products.firebaseProductsListener(
      user.user.uid,
      d => {
        dispatch(requestAddProductsToFirebase());
      },
    );

    if (success) {
      dispatch({
        type: constants.FIREBASE_PRODUCTS_LISTENER,
        payload: off,
      });
    } else {
    }
  };
