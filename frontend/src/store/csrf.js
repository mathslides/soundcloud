import Cookies from "js-cookie";
import { BASEURL } from "../constants";
//creates a helper function for fetching URLs

export async function csrfFetch(url, options = {}) {

  // set options.method to 'GET' if there is no method
  options.method = options.method || "GET";
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== "GET") {
    if (options.headers["Content-Type"] === "multipart/form-data") {
      delete options.headers["Content-Type"];
    } else {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }


  // Call the default window's fetch with the url and the options passed in
  const res = await window.fetch(BASEURL + url, options);
  // call the default window's fetch with the url and the options passed in
  // const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch("/server/api/csrf/restore");
}



// import Cookies from "js-cookie";
// import { BASEURL } from "../constants";
// require('dotenv').config()

// // Creates a helper function for fetching URLs
// export async function csrfFetch(url, options = {}) {
//   // Set options.method to 'GET' if there is no method
//   options.method = options.method || "GET";
//   // Set options.headers to an empty object if there are no headers
//   options.headers = options.headers || {};

//   // If the options.method is not 'GET', then set the "Content-Type" header to
//   // "application/json", and set the "XSRF-TOKEN" header to the value of the
//   // "XSRF-TOKEN" cookie
//   if (options.method.toUpperCase() !== "GET") {
//     if (options.headers["Content-Type"] === "multipart/form-data") {
//       delete options.headers["Content-Type"];
//     } else {
//       options.headers["Content-Type"] =
//         options.headers["Content-Type"] || "application/json";
//     }
//     options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
//   }

//   console.log("BASEURL", BASEURL);
//   // Call the default window's fetch with the url and the options passed in
//   const res = await window.fetch(BASEURL + url, options);

//   // If the response status code is 400 or above, then throw an error with the
//   // error being the response
//   if (res.status >= 400) throw res;

//   // If the response status code is under 400, then return the response to the
//   // next promise chains
//   return res;
// }

// // Call this to get the "XSRF-TOKEN" cookie, should only be used in development
// export function restoreCSRF() {
//   return csrfFetch("/server/api/csrf/restore");
// }
