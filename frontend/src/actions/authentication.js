export const addConnection = signupInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/Users", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signupInformations));
  return xhttp.status === 200 && xhttp.readyState === 4;
};

export const loginConnection = signinInformations => {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/Users/login", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(signinInformations));
  return xhttp.status === 200 && xhttp.readyState === 4 ? xhttp.responseText : null;
};