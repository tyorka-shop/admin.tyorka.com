import { useEffect } from "react";

export const useButton = () => {
  useEffect(() => {
    init(); 
  }, []);
};

const loadScript = async (src: string) =>
  new Promise((resolve) => {
    const js = document.createElement("script");
    js.src = src;
    js.onerror = () => console.log("Can not load", src);
    js.onload = resolve;
    js.defer = true;
    js.async = true;
    document.head.appendChild(js);
  });

const init = async () => {
  await loadScript('https://accounts.google.com/gsi/client');
  // @ts-ignore
  window.google.accounts.id.initialize({
    client_id: "",
    callback: (resp: string) => console.log(resp),
  });
  // @ts-ignore
  window.google.accounts.id.prompt();
};
