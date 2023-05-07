import "@/styles/globals.scss";
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { setupIonicReact } from "@ionic/react";

setupIonicReact();

import type { AppProps } from "next/app";
import NonSSRWrapper from "@/components/ui/NonSSRWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NonSSRWrapper>
      <Component {...pageProps} />
    </NonSSRWrapper>
  );
}
