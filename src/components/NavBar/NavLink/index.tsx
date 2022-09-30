import React from "react";
import { Link, LinkProps } from "@reach/router";

export const NavLink: React.FC<LinkProps<{}>> = (props) => {
  return (
    // @ts-ignore
    <Link
      {...props}
      getProps={({ isCurrent }) => ({
        className: `${props.className || ""}${isCurrent ? " active" : ""}`,
      })}
    />
  );
};
