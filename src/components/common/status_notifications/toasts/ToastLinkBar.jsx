import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {Link, useHistory} from "react-router-dom";
import {IconBase} from "@opsera/react-vanity-set";
import {faLink} from "@fortawesome/pro-light-svg-icons";

export default function ToastLinkBar(
  {
    link,
  }) {
  const history = useHistory();

  if (hasStringValue(link) !== true) {
    return null;
  }

  return (
    <div className={"d-flex"}>
      <div className={"mr-3 d-flex"}>
        <IconBase
          icon={faLink}
          className={"mr-2"}
          onClickFunction={() => history.push(link)}
        />
        <Link to={link}>View Item</Link>
      </div>
      <div className={"d-flex"}>
        <CopyToClipboardIconBase
          copyText={"Copy Link"}
          copiedText={"Copied Link"}
          copyString={`${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}${link}`}
          showCopyTextLabel={true}
        />
      </div>
    </div>
  );
}

ToastLinkBar.propTypes = {
  link: PropTypes.string,
};
