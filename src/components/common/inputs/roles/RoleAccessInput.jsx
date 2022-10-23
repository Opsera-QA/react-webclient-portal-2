import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faIdCard,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import StandaloneRoleAccessTypeInput from "components/common/inputs/roles/StandaloneRoleAccessTypeInput";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: Create RoleAccessInputRow that holds the actual inputs to clean this up.
export default function RoleAccessInput(
  {
    fieldName,
    model,
    setModel,
    helpComponent,
    disabled,
    visible,
  }) {
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [roles, setRoles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const {
    cancelTokenSource,
    isMounted,
    isSaasUser,
    accessRoleData,
    userData,
    getAccessToken,
  } = useComponentStateReference();
  const field = model?.getFieldById(fieldName);

  useEffect(() => {
    if (isSaasUser === false && visible !== true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [userData, field]);

  const loadData = async () => {
    unpackData();

    const ldap = userData?.ldap;
    if (accessRoleData) {
      if (ldap.domain != null) {
        await getGroupsByDomain(ldap.domain);
        await getLdapUsers(ldap.domain);
      }
    }
  };

  const getGroupsByDomain = async (ldapDomain) => {
    try {
      setLoadingGroups(true);
      const response = await accountsActions.getLdapUserGroupsWithDomainV2(
        getAccessToken,
        cancelTokenSource,
        ldapDomain,
      );

      const newGroups = DataParsingHelper.parseArray(response?.data?.data, []);
      setGroupList(newGroups);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoadingGroups(false);
    }
  };

  const getLdapUsers = async (ldapDomain) => {
    try {
      setLoadingUsers(true);
      const response = await accountsActions.getLdapUsersWithDomainV2(
        getAccessToken,
        cancelTokenSource,
        ldapDomain,
      );

      if (response?.data) {
        setUserList(response.data);
      }
    } catch (error) {
      console.error("error: " + JSON.stringify(error));
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const unpackData = () => {
    const currentData = model?.getData(fieldName);
    const unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0)
    {
      currentData.map((item) => {
        unpackedRoles.push(
          {
            _id: item["_id"],
            role: item["role"],
            user: item["user"],
            group: item["group"],
            createdAt: item["createdAt"],
            updatedAt: item["updatedAt"],
            roleAccessType: item["user"] !== null ?  "user" : "group"
          }
        );
      });
    }
    else {
      unpackedRoles.push({role: "", user: "", group: "", roleAccessType: "group"});
    }

    setRoles([...unpackedRoles]);
  };

  const validateAndSetData = (newRoleList) => {
    setRoles([...newRoleList]);
    const newDataObject = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of role access items. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
        if (item["role"] === "" || (item["user"] === "" && item["group"] === "")) {
          return;
        }

        newArray.push(
          {
            _id: item["_id"],
            role: item["role"],
            user: item["user"] !== "" ? item["user"] : null,
            group: item["group"] !== "" ? item["group"] : null,
            createdAt: item["createdAt"],
            updatedAt: item["updatedAt"],
          }
        );
      });
    }

    newDataObject.setData(fieldName, [...newArray]);
    setModel({...newDataObject});
  };

  const isRoleComplete = (role) => {
    return !(role?.role === "" || (role?.user === "" && role?.group === ""));
  };

  const lastRoleComplete = () => {
    let newPropertyList = roles;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isRoleComplete(lastObject);
  };

  const addRole = () => {
    let newRoleList = roles;

    if (lastRoleComplete()) {
      let newRow = {role: "", user: "", group: "", roleAccessType: "group"};
      newRoleList.push(newRow);
      validateAndSetData(newRoleList);
    }
  };

  const deleteRole = (index) => {
    let newRoleList = roles;
    newRoleList.splice(index, 1);
    validateAndSetData(newRoleList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = roles;
    let index = newPropertyList.indexOf(row);

    if (newPropertyList[index][innerField] !== newValue) {
      if (innerField === "roleAccessType") {
        newPropertyList[index]["group"] = "";
        newPropertyList[index]["user"] = "";
      }

      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getDisabledUsers = () => {
    if (roles.length > 0) {
      const disabledUsers = [];

      roles.map((property) => {
        if (property.user != null && property.user !== "") {
          disabledUsers.push(property.user);
        }
      });

      return disabledUsers;
    }
  };

  const getDisabledGroups = () => {
    if (roles.length > 0) {
      const disabledGroups = [];

      roles.map((property) => {
        if (property.group != null && property.group !== "") {
          disabledGroups.push(property.group);
        }
      });

      return disabledGroups;
    }
  };

  const getTypeInput = (role, index) => {
    return (
      <div className="mt-2 d-inline-flex role-access-input">
        <div className="m-auto mr-2">
          <input
            className="mr-2"
            type="radio"
            name={`roleAccessType-${index}`}
            value={"group"}
            checked={role["roleAccessType"] === "group"}
            disabled={disabled}
            onChange={() => updateProperty(role, "roleAccessType", "group")}
          />
          <span className={"mr-2"}>Group</span>
        </div>
        <div className="m-auto ml-2">
          <input
            className="mr-2"
            type="radio"
            name={`roleAccessType-${index}`}
            disabled={disabled}
            value={"user"}
            checked={role["roleAccessType"] === "user"}
            onChange={() => updateProperty(role, "roleAccessType", "user")}
          />
          <span>User</span>
        </div>
      </div>
    );
  };

  // TODO: For V2
  // const getButtonTypeInput = (role, index) => {
  //   return (
  //     <div className="d-flex mt-1 justify-content-between">
  //       <Button
  //         name={`roleAccessType-${index}-group`}
  //         variant={role["roleAccessType"] === "group" ? "success" : "outline-secondary"}
  //         size="sm"
  //         onClick={() => updateProperty(role, "roleAccessType", "group")}
  //       >
  //         <FontAwesomeIcon icon={faUserFriends} fixedWidth className={"mr-1"}/>Group
  //       </Button>
  //       <Button
  //         variant={role["roleAccessType"] === "user" ? "success" : "outline-secondary"}
  //         size="sm"
  //         name={`roleAccessType-${index}-user`}
  //         onClick={() => updateProperty(role, "roleAccessType", "user")}
  //       >
  //         <FontAwesomeIcon icon={faUser} fixedWidth className={"mr-1"}/>User
  //       </Button>
  //     </div>
  //   );
  // };

  const getAssigneeInput = (role) => {
    if (role["roleAccessType"] === "user") {
      return (
        <StandaloneSelectInput
          selectOptions={userList}
          valueField={"emailAddress"}
          textField={(item) => item != null && typeof item === "object" ? `${item.name} (${item.emailAddress})` : item}
          value={role["user"]}
          busy={loadingUsers}
          disabled={disabled || getDisabledUsers()}
          placeholderText={"Select A User"}
          setDataFunction={(value) => updateProperty(role, "user", value["emailAddress"])}
        />
      );
    }

    return (
      <StandaloneSelectInput 
        className="input-for-group"
        selectOptions={groupList}
        valueField={"name"}
        textField={"name"}
        value={role["group"]}
        busy={loadingGroups}
        disabled={disabled || getDisabledGroups()}
        placeholderText={"Select A Group"}
        setDataFunction={(value) => updateProperty(role, "group", value["name"])}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteRole(index)}>
          <span><IconBase className="danger-red" icon={faTimes}/></span>
        </Button>
      );
    }
  };

  const getPropertyRow = (role, index) => {
    return (
      <div className="d-flex py-2" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={4} className={"pr-1"}>
              {getTypeInput(role, index)}
            </Col>
            <Col sm={4} className={"pl-1 pr-0"}>
              {getAssigneeInput(role)}
            </Col>
            <Col sm={4} className={"pl-2 pr-2"}>
              <StandaloneRoleAccessTypeInput
                accessRole={role}
                disabled={disabled}
                updateRoleType={updateProperty}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"px-0 mr-auto delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    if (!roles || roles.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No access roles have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {roles.map((property, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              {getPropertyRow(property, index)}
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex py-1">
        <Col sm={11}>
          <Row>
            <Col sm={4}>
              {/*<span className="text-muted ml-5">Type</span>*/}
            </Col>
            <Col sm={4} className={"mx-auto"}>
              <span className="text-muted">Assignee</span>
            </Col>
            <Col sm={4} className={"mx-auto"}>
              <span className="text-muted">Access Type</span>
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteRoleMessage = () => {
    if (!lastRoleComplete()) {
      return (`Incomplete Roles Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getRolesMessage = () => {
    if (!Array.isArray(roles) || roles.length === 0 || (roles.length === 1 && lastRoleComplete() === false)) {
      return (`
        If no Roles are assigned, all users will have access. 
        Once a role is applied, only then will access be restricted to the Roles given. 
        All users given roles will have access. 
        All group members will have access, if a group is assigned a role.
      `);
    }

    return (`
      Only the listed users, all members assigned to the listed groups, and site administrators have access.
    `);
  };

  const getRolesSubMessage = () => {
    return (`
      Please note, if a user selected above is already a member of the Site Administrators or Site Power Users groups, 
      that privilege will supersede these settings where applicable.
    `);
  };

  if (field == null || isSaasUser === true || visible === false) {
    return <></>;
  }

  return (
    <div className={"bg-white"} style={{minWidth: "575px"}}>
      <div className={"mx-2 mb-2"}>
        <InfoText customMessage={getRolesMessage()} />
      </div>
      <PropertyInputContainer
        titleIcon={faIdCard}
        field={field}
        addProperty={addRole}
        titleText={"Roles"}
        errorMessage={errorMessage}
        type={"Role"}
        addAllowed={lastRoleComplete() && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteRoleMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
      <div className={"mx-2"}>
        <InfoText customMessage={getRolesSubMessage()} />
      </div>
    </div>
  );
}

RoleAccessInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

RoleAccessInput.defaultProps = {
  fieldName: "roles",
};