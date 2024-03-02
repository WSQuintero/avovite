import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MasterProvider from "./Providers/index.jsx";
import App from "./App.jsx";

import "./assets/css/_default.css";
import "react-phone-input-2/lib/material.css";
import { GeneralContextProvider } from "./context/GeneralContext.jsx";
import * as Sentry from "@sentry/react";

const hostname = window.location.hostname;
const isDev = hostname === "appdev.avovite.com" || hostname === "localhost";

let sentryDSN;
if (isDev) {
  sentryDSN = "https://770c39cef117658f85797a931ce17681@o4505030736347136.ingest.sentry.io/4506836583448576";
} else {
  sentryDSN = "https://2e4b2df4cad64511ea10b948531d888d@o4505030736347136.ingest.sentry.io/4506836592164864";
}
Sentry.init({
  dsn: sentryDSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /\/api\/v1$/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GeneralContextProvider>
    <MasterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MasterProvider>
  </GeneralContextProvider>
);
