import axios from "axios";
import { apiBase } from "./config";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOSwiZnVsbG5hbWUiOiJ0ZXN0dHR0dCIsImVtYWlsIjoidGVzdHRAZ21haWwuY29tIiwicGhvbmUiOiIwOTExMTExMTExIiwiaWF0IjoxNTQ5OTc3NTU3LCJleHAiOjE1NTAwNjM5NTd9.m-uZHxWKqM7QK6BkTraQkCBZ5_Tj2StHv8zD7BSS6Ug'
let headers = null
if (typeof window !== 'undefined') {
  headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", "true");
}

// headers.append('Authorization','Bearer ' + token)

var request = axios.create({
  // baseURL: apiBase,
  headers: headers !== null ? headers : {}
});

function validateData(data) {
  for (var prop in data) {
    let dataElement = data[prop];
    if (
      dataElement === null ||
      dataElement === undefined ||
      dataElement === "null" ||
      dataElement === "" ||
      dataElement === "undefined"
    ) {
      delete data[prop];
    }
  }

  return data;
}

// axios.defaults.baseURL = apiBase;
// axios.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };
// axios.defaults.baseURL = process.env.NODE_ENV !== "production" ? apiBase : "";
// const methods = ["get", "put", "post", "delete", "patch"];

export const get = (endpoint, config = {}) => {
  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    config = {
      ...config,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
  }
  return request.get(endpoint, config);
};
export const post = (
  endpoint,
  data,
  config = {
    headers: {}
  }
) => {
  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    config = {
      ...config,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
  }
  data = validateData(data);

  let formData = new FormData();
  if (data && data.hasFile) {
    config = {
      ...config,
      header: { ...config.headers, "Content-Type": "multipart/form-data" }
    };
    delete data["hasFile"];
    for (var prop in data) {
      formData.append(prop, data[prop]);
      delete data[prop];
    }
    data = formData;
  }
  return request.post(endpoint, data, config);
};

export const puts = (
  endpoint,
  data,
  config = {
    headers: {}
  }
) => {
  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    config = {
      ...config,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
  }
  return request.put(endpoint, data, config);
};

export const deletes = (endpoint, config = {
  headers: {}
}) => {
  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    config = {
      ...config,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
  }
  return request.delete(endpoint, config);
}


