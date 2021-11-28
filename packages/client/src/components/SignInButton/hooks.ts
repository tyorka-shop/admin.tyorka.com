import React, { useEffect } from "react";

export const useButton = () => {
  const container = React.createRef<HTMLDivElement>();
  useEffect(() => {
    init(container);
  }, []);

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

const init = async (container: React.RefObject<HTMLDivElement>) => {
  if (!container || !container.current) {
    return;
  }
  await loadScript("https://accounts.google.com/gsi/client");
  // @ts-ignore
  window.google.accounts.id.initialize({
    client_id:
      "1020162780981-ekmcic9v67h6juo6au1hec2k4vfnc1c4.apps.googleusercontent.com",
    ux_mode: "redirect",
    login_uri: "http://localhost:3000/login",
  });
  // @ts-ignore
  window.google.accounts.id.renderButton(container.current, {});
};
