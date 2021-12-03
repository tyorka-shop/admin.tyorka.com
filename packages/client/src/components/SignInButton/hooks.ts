import React, { useEffect } from "react";
import { useConfig } from "../../hooks/useConfig";
import { Config } from "../../types/common";

let initialized = false;

export const useButton = () => {
  const container = React.createRef<HTMLDivElement>();
  const { siwg } = useConfig();
  
  useEffect(() => {
    container.current && init(container, siwg);
  }, [container.current]);

  return {
    container,
  };
};

const loadScript = async (src: string) =>
  new Promise((resolve) => {
    const js = document.createElement("script");
    js.src = src;
    js.onerror = () => console.log("Can not load", src);
    // @ts-ignore
    window.onGoogleLibraryLoad = resolve;
    js.defer = true;
    js.async = true;
    document.head.appendChild(js);
  });

const init = async (
  container: React.RefObject<HTMLDivElement>,
  config: Config["siwg"]
) => {
  if (!container.current) {
    return;
  }

  if (!initialized) {
    await loadScript("https://accounts.google.com/gsi/client");
    // @ts-ignore
    window.google.accounts.id.initialize({
      ...config,
      ux_mode: "redirect",
    });
    initialized = true;
  }
  // @ts-ignore
  window.google.accounts.id.renderButton(container.current, {});
};
