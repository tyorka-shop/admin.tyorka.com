import React, { useEffect, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { Config } from "../../types/common";

let initialized = false;

export const useButton = () => {
  const container = React.createRef<HTMLDivElement>();
  const [inited, setInited] = useState(false);
  const { siwg } = useConfig();

  useEffect(() => {
    init(siwg, () => setInited(true));
  }, []);

  useEffect(() => {
    if (!container.current || !inited) {
      return;
    }
    // @ts-ignore
    window.google.accounts.id.renderButton(container.current, {});
  }, [container.current || !inited]);

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

const init = async (config: Config["siwg"], callback: () => void) => {
  if (!initialized) {
    await loadScript("https://accounts.google.com/gsi/client");
    // @ts-ignore
    window.google.accounts.id.initialize({
      ...config,
      ux_mode: "redirect",
    });
    initialized = true;
  }
  callback();
};
