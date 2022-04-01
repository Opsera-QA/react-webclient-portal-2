import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {faHandshake, faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "contexts/AuthContext";
import parametersActions from "components/inventory/parameters/parameters-actions";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import InfoContainer from "components/common/containers/InfoContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {parseError} from "components/common/helpers/error-helpers";
import InputContainer from "components/common/inputs/InputContainer";
import {Button} from "react-bootstrap";
import CustomParameterInputRow from "components/common/list_of_values_input/parameters/list/CustomParameterInputRow";
import ButtonBase from "components/common/buttons/ButtonBase";

function CustomParameterMultiSelectListInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    titleIcon,
    titleText,
    disabled,
    terraformStepId,
    className,
    height,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [field] = useState(model.getFieldById(fieldName));
  const [error, setError] = useState("");
  const [selectedParameter, setSelectedParameter] = useState(undefined);
  const [parametersList, setParametersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await getCustomParameters(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCustomParameters = async (cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(getAccessToken, cancelSource);
    const parameters = response?.data?.data;

    if (isMounted?.current === true && parameters) {
      setParametersList(parameters);
    }
  };

  const validateAndSetData = (newParametersList) => {
    const newModel = { ...model };

    if (hasMaximumItems() === true) {
      setError(`You have reached the maximum allowed number of parameters. Please remove one to add another.`);
      return;
    }

    newModel.setData(fieldName, newParametersList);
    setModel({ ...newModel });
  };

  const updateValue = (newParameterList) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newParameterList);
    }
    else {
      validateAndSetData(newParameterList);
    }
  };

  const addParameter = () => {
    setError("");
    const currentParameters = model?.getArrayData(fieldName);
    const matchingParameter = currentParameters.find((parameter) => parameter?._id === selectedParameter?._id);

    if (matchingParameter) {
      setError("Existing parameters can not be added again");
      return;
    }

    currentParameters.push({
      parameterName: selectedParameter?.name,
      parameterId: selectedParameter?._id,
    });
    updateValue(currentParameters);
    setSelectedParameter(undefined);
  };

  const deleteParameter = (index) => {
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    updateValue(currentData);
  };

  const getFieldBody = () => {
    const currentParameters = model?.getArrayData(fieldName);

    if (!Array.isArray(currentParameters) || currentParameters?.length === 0) {
      return (
        <div className={"d-flex h-100"}>
          <div className={"m-auto"}>
            <span>No Parameters Added</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>{getHeaderBar()}</div>
        {currentParameters.map((parameter, index) => {
          return (
            <div
              className={index % 2 === 0 ? "odd-row-background-color px-3" : "even-row-background-color px-3"}
              key={index}
            >
              <CustomParameterInputRow
                parameter={parameter}
                deleteParameterFunction={deleteParameter}
                disabled={disabled}
                index={index}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className={"d-flex justify-content-between page-description py-2 text-muted"}>
        <Col xs={5}>
          <span>Parameter</span>
        </Col>
        <Col xs={5}>
          <span>Parameter Origin</span>
        </Col>
        <Col xs={2}/>
      </div>
    );
  };

  const syncTerraformStepParameters = (terraformStepParameters) => {
    const currentParameters = model?.getArrayData(fieldName);
    const newArray = currentParameters?.filter((parameter) => parameter?.outputKey == null);

    if (Array.isArray(terraformStepParameters) && terraformStepParameters > 0) {
      terraformStepParameters.forEach((terraformParameter) => {
        if (terraformParameter?.outputKey) {
          newArray.push(terraformParameter);
        }
      });
    }

    updateValue(newArray);
  };

  const getTerraformButton = () => {
    // if (isMongoDbId(terraformStepId) === true) {
      return (
        <div className={"mr-1"}>
          <div style={{minWidth: "275px"}}>
            <ButtonBase
              variant={"primary"}
              disabled={disabled || hasMaximumItems() || isPotentialValueADuplicate()}
              onClickFunction={syncTerraformStepParameters}
              buttonText={"Sync Terraform Output Parameters"}
            />
          </div>
        </div>
      );
    // }
  };

  // const getRefreshButton = () => {
  //   if (isMongoDbId(terraformStepId) === true) {
  //     return (
  //       <OverlayTrigger
  //         trigger="hover"
  //         rootClose
  //         placement="top"
  //         overlay={
  //           <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
  //             <Popover.Content>
  //               <div className="text-muted mb-2">
  //                 Refresh Terraform Output Parameters
  //               </div>
  //             </Popover.Content>
  //           </Popover>
  //         }
  //       >
  //         <IconBase icon={faSync} className={"fa-pull-right pointer pr-2 mt-1 pl-0"} onClickFunction={() => refreshParameters()}/>
  //       </OverlayTrigger>
  //     );
  //   }
  // };

  const getTerraformStepText = () => {
    if (isMongoDbId(terraformStepId) === true) {
      return (
        <div>
          <H5FieldSubHeader
            subheaderText={"Pipelines with Terraform Steps"}
          />
          <div>If the <strong>Use Terraform Output</strong> checkbox has been
          selected, the available parameters will
          appear in the Parameter selection option with <strong>Terraform Output</strong> as the Parameter Origin.</div>
            <div>They must use the same syntax mentioned above in order to be used in the commands.</div>
        </div>
      );
    }
  };

  const hasMaximumItems = () => {
    const currentParameters = model?.getArrayData(fieldName);
    return currentParameters?.length >= field?.maxItems;
  };

  const isPotentialValueADuplicate = () => {
    if (selectedParameter == null) {
      return false;
    }

    const currentParameters = model?.getArrayData(fieldName);
    const foundParameter = currentParameters.find((parameter) => parameter.name === selectedParameter?.parameterName);
    return foundParameter != null;
  };

  const getErrorMessage = () => {
    if (isPotentialValueADuplicate() === true) {
      return (`The entered Parameter is a duplicate. Duplicate Parameters are not allowed.`);
    }

    if (error) {
      return error;
    }

    if (hasStringValue(error) === true) {
      return error;
    }
  };

  const getInfoText = () => {
    if (hasMaximumItems() === true) {
      return ("You have reached the maximum allowed number of parameters. Please remove one to add another.");
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InfoContainer
        titleText={titleText}
        titleIcon={titleIcon}
      >
        <div
          style={{height: height, maxHeight: height}}
          className={"scroll-y"}
        >
          {getFieldBody()}
        </div>
      </InfoContainer>
      <div className={"mt-3"}>
        <div className={"d-flex"}>
          {getTerraformButton()}
          <StandaloneSelectInput
            selectOptions={parametersList}
            valueField={"_id"}
            textField={"name"}
            value={selectedParameter}
            busy={isLoading}
            setDataFunction={(data) => setSelectedParameter(data)}
            disabled={disabled}
            dropUp={true}
          />
          <div className={"ml-2"} style={{minWidth: "156px"}}>
            <NewRecordButton
              size={"md"}
              variant={"primary"}
              disabled={disabled || hasMaximumItems() || isPotentialValueADuplicate()}
              addRecordFunction={addParameter}
              customButtonText={"Add Parameter"}
            />
          </div>
        </div>
      </div>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={getErrorMessage()}
        customMessage={getInfoText()}
      />
      <div className={"text-muted my-2"}>
        <div className={"mb-2"}>
          In order to use Opsera Parameters during the step execution, please reference them in the scripts or commands
          by using the following syntax: <strong>{"${parameter_name}"}</strong> where <strong>parameter_name </strong>
          matches an Opsera Parameter name.
        </div>
        <div className={"mb-2"}>
          All Parameters passed in the commands or scripts must be selected in
          order for the details to be fetched during runtime.
        </div>
        <div>
          Opsera Parameters are defined under the Parameters tab in Tool Registry.
        </div>
        {getTerraformStepText()}
      </div>
    </InputContainer>
  );
}

CustomParameterMultiSelectListInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  disabled: PropTypes.bool,
  terraformStepId: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
};

CustomParameterMultiSelectListInput.defaultProps = {
  titleIcon: faHandshake,
  titleText: "Parameter Selection",
  disabledFields: [],
  height: "250px",
};

export default CustomParameterMultiSelectListInput;
