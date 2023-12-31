import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function TransferOwnershipButton(
  {
    isTransferringOwnership,
    className,
    transferOwnershipFunction,
    disabled,
    buttonSize,
  }) {
  const getButtonText = () => {
    if (isTransferringOwnership === true) {
      return "Transferring Ownership";
    }

    return "Transfer Ownership";
  };

  return (
    <div className={className}>
      <Button
        type={"primary"}
        size={buttonSize}
        disabled={isTransferringOwnership || disabled}
        onClick={() => transferOwnershipFunction()}
        className={"w-100"}
      >
        <IconBase
          isLoading={isTransferringOwnership}
          icon={faShareAlt}
          className={"mr-2"}
        />
        {getButtonText()}
      </Button>
    </div>
  );
}

TransferOwnershipButton.propTypes = {
  isTransferringOwnership: PropTypes.bool,
  transferOwnershipFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  buttonSize: PropTypes.string,
};

TransferOwnershipButton.defaultProps = {
  buttonSize: "sm",
};

export default TransferOwnershipButton;