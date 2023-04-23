import "core-js";
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (typeof window["TextEncoder"] !== "function") {
  console.log("Using text-encoding shim");
  const TextEncodingPolyfill = require("text-encoding");
  window["TextEncoder"] = TextEncodingPolyfill.TextEncoder;
  window["TextDecoder"] = TextEncodingPolyfill.TextDecoder;
}

const browserNotSupported = (function (agent) {
  switch (true) {
  case agent.indexOf("edge") > -1: return false; // "edge";
  case agent.indexOf("edg") > -1: return false; //"chromium based edge (dev or canary)";
  case agent.indexOf("opr") > -1 && !!window.opr: return false; // "opera";
  case agent.indexOf("chrome") > -1 && !!window.chrome: return false; // "chrome";
  case agent.indexOf("trident") > -1: return "ie";
  case agent.indexOf("firefox") > -1: return false; // "firefox";
  case agent.indexOf("safari") > -1: return false; // "safari";
  default: return false;
  }
})(window.navigator.userAgent.toLowerCase());

if (window.location.hostname.toLowerCase() === "freetrial.opsera.io") {
  console.log("Directing user to proper URL for Free Trial App");
  window.location.replace("https://portal.freetrial.opsera.io");
}

if (browserNotSupported) {
  let uiMessage = "<div style='margin:25px; top: 150px; position: absolute;'>This portal is designed to use the latest, \
  secure web technology and as such requires modern versions of Chrome, Firefox, Safari, Opera or the brand new Microsoft \
  Chromium Edge browser (released January 2020).  Please return with one of those browsers to ensure a secure experience.</div>";
  document.body.innerHTML = uiMessage;
} else {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
