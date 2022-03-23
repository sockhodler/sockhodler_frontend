import React from "react";

import { ReactComponent as NotAllowedIcon } from "assets/icons/not-allowed-circle.svg";
import { ReactComponent as ExpiredIcon } from "assets/icons/expired-circle.svg";
import { ReactComponent as NFCIcon } from "assets/icons/nfc-circle.svg";
import { LayoutTab } from "components";
import classes from "./AuthenticateTabError.module.scss";

interface Props {
  for: string;
  type: "not-active" | "expired" | "auth-code-not-valid" | "scan" | "error";
}

export const AuthenticateTabError: React.FunctionComponent<Props> = ({
  for: tabFor,
  type,
}) => {
  const types = {
    "not-active": {
      icon: <NotAllowedIcon className={classes["check-icon"]} />,
      title: "Tag Not Active",
      subtitle: "This tag is not currently activated.",
    },
    expired: {
      icon: <ExpiredIcon className={classes["check-icon"]} />,
      title: "Authentication Token Expired",
      subtitle: "Please rescan Tag.",
    },
    "auth-code-not-valid": {
      icon: <NotAllowedIcon className={classes["check-icon"]} />,
      title: "Authentication Code not Valid",
      subtitle: (
        <>
          This authentication code is not valid. Please contact
          <a href="mailto:sockmaster@sockhodler.com">
            sockmaster@sockhodler.com
          </a>
          for more information.
        </>
      ),
    },
    scan: {
      icon: <NFCIcon className={classes["check-icon"]} />,
      title: "Please Scan Your Socks.",
      subtitle: "To access authentication data, please scan your NFT Socks.",
    },
    error: {
      icon: <NotAllowedIcon className={classes["check-icon"]} />,
      title: "Error",
      subtitle: (
        <>
          There was a problem authenticating this tag. Please contact
          <a href="mailto:sockmaster@sockhodler.com">
            sockmaster@sockhodler.com
          </a>
          for more information. This authentication code is not valid. Please
          contact
        </>
      ),
    },
  };

  return (
    <LayoutTab for={tabFor}>
      <section className={classes.content}>
        {/* @ts-ignore */}
        {types[type].icon}
        {/* @ts-ignore */}
        <h2 className={classes.title}>{types[type].title}</h2>
        <p className={classes.subtitle}>
          {/* @ts-ignore */}
          {types[type].subtitle}
        </p>
        <p className={classes.footer}>
          Powered by
          <a href="#">SockHodler</a>x<a href="#">SmartSeal.io</a>
        </p>
      </section>
    </LayoutTab>
  );
};
