import { API_URL, IMG_URL } from "../utils/Constants";

export async function getLastProductsApi(limit = 30) {
  try {
    const url = `${API_URL}/productos?_limit=${limit}&_sort=createAt:DESC`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductApi(id) {
  try {
    const url = `${API_URL}/productos/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//agregas esto: es la del registro de pry
export async function registerApi(formData) {
  try {
    const url = `${API_URL}/productos`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    //returnamos el datos
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function registerImgApi(formData) {
  try {
    const url = `${IMG_URL}/PruebaIMG/PruebaIMG.php`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    };

    //returnamos el datos
    const response = await fetch(url, formData);
    //const result = await response.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function registerIMGXDApi(formData) {
  try {
    const url = `${API_URL}/productos`;
    /*const params = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.parse(formData),
    };*/

    //returnamos el datos
    //const response = await fetch(url, params);
    const response = await axios({
      method: "POST",
      url,
      formData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
