import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { API_URL, CART } from "../utils/Constants";
import { updateProductoApi, getProductApi } from "./product";

export async function getProductCartApi() {
  try {
    const cart = await AsyncStorage.getItem(CART);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch (e) {
    return null;
  }
}

export async function addProductCartApi(idProduct, quantity) {
  try {
    const cart = await getProductCartApi();

    if (size(cart) === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;

      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return false;
  }
}

export async function deleteProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    const newCart = filter(cart, (product) => {
      return product.idProduct !== idProduct;
    });
    await AsyncStorage.setItem(CART, JSON.stringify(newCart));
    return true;
  } catch (error) {
    return false;
  }
}

export async function increaseProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        return (product.quantity += 1);
      }
    });
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    return false;
  }
}

export async function decreaseProductCartApi(idProduct) {
  let isDelete = false;
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });
    if (isDelete) {
      await deleteProductCartApi(idProduct);
    } else {
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function paymentCartApi(
  auth,
  tokenStripe,
  products,
  totalPayment
) {
  try {
    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        tokenStripe: tokenStripe,
        product: products,
        idUser: auth.idUser,
        totalPayment: totalPayment,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    //const responseProduct = await getProductApi(products._id);
    //console.log(responseProduct.financiado);

    let a = products.financiado;
    let b = totalPayment;
    let c = parseFloat(a) + parseFloat(b);

    products.financiado = c;

    const responseUpdate = await updateProductoApi(products, auth);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCartApi() {
  try {
    await AsyncStorage.removeItem(CART);
    return true;
  } catch (error) {
    return null;
  }
}
