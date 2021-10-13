import { API_URL } from "../utils/Constants";

export async function preguntasApi(formData) {
  try {
      const url = `${API_URL}/preguntas`;
      const params = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
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




export async function getOrdersApi() {
    try {
      const url = `${API_URL}/preguntas`;
      const params = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
