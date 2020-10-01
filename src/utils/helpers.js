export function isLocalHost(hostname) {
  return !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
}

// check if char/string is alpha number or has a dash.
export function isAlphaNumeric(str) {
  if (str.length > 0) {
    return /^[a-z0-9-]+$/i.test(str);
  } else {
    return true;
  }
}

export function validateEmail(email) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase());
}

// TODO: Add better regex for domain checking
export function isDomain(domain) {
 var re =  /^[A-Za-z0-9]?[A-Za-z0-9-]*[A-Za-z0-9]$/;
 return re.test(String(domain).toLowerCase());
}

export function handleError(error) {
  let errMessage = null;

  if (typeof(error) === "object"){ 
    if (error.response) {
      errMessage = `Status ${error.response.status}: ${
        error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data)}`;
    } else if (error.message) { 
      errMessage = `Message: ${error.message}`;
    } else {
      errMessage = `Error Reported: ${JSON.stringify(error)}`;
    }
  } else {
    errMessage = `Error Reported: ${error}`;
  }
  console.log(errMessage);
  return errMessage;
}