import React, {useState, useEffect} from "react";
import { Row, Col, InputGroup, Button } from "react-bootstrap";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import PropTypes from "prop-types";
import CancelButton from "components/common/buttons/CancelButton";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import MembersPanel from "components/common/inputs/user/membership/manager/user_panel/MembersPanel";
import NonMembersPanel
  from "components/common/inputs/user/membership/manager/user_panel/NonMembersPanel";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import useGetLdapUsersForDomain from "hooks/ldap/users/useGetLdapUsersForDomain";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Split into two separate panels, one for admin section and just use targeted hook for a user's domain users
function LdapGroupMembershipManagementPanel({ldapGroupData, type, orgDomain, setActiveTab, loadData}) {
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const {
    users,
    isLoading,
  } = useGetLdapUsersForDomain(orgDomain);
  const {
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadMemberStatus();
  }, [users]);

  const loadMemberStatus = () => {
    const organizationUsers = Array.isArray(users) ? users : [];
    let unpackedMembers = [...ldapGroupData.getData("members")];
    let unpackedNonMembers = [];

    if (Array.isArray(unpackedMembers) && unpackedMembers.length > 0) {
      if (organizationUsers.length > 0) {
        organizationUsers.forEach((user, index) => {
          let member = unpackedMembers.find((member) => member.emailAddress === user.emailAddress);

          if (member == null) {
            unpackedNonMembers.push(user);
          }
        });
      }

      setMembers([...unpackedMembers]);
      setNonMembers([...unpackedNonMembers]);
    }
    else {
      setMembers([]);
      setNonMembers([...organizationUsers]);
    }
  };

  const sortByFirstName = (users) => {
    if (Array.isArray(users) && users.length > 0) {
      let usersCopy = [...users];

      usersCopy?.sort((member1, member2) => {
        const firstLetter1 = hasStringValue(member1?.name) ? member1?.name?.toLowerCase() : null;
        const firstLetter2 = hasStringValue(member2.name) ? member2.name?.toLowerCase() : null;

        if (firstLetter2 == null) {
          return -1;
        }

        if (firstLetter1 == null) {
          return 1;
        }

        if (firstLetter1 === firstLetter2) {
          return 0;
        }

        return firstLetter1 > firstLetter2 ? 1 : -1;
      });

      return usersCopy;
    }

    return [];
  };

  const updateMembers = async () => {
    try {
      let emailList = members.reduce((acc, item) => {
        acc.push(item.emailAddress);
        return acc;
      }, []);
      await accountsActions.syncMembership(orgDomain, ldapGroupData.getData("name"), emailList, getAccessToken);
      toastContext.showUpdateSuccessResultDialog(`${type} Membership`);
      setShowUnsavedChangesMessage(false);
      loadData();
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return <InlineWarning warningMessage={"You must hit save before changes will take effect"} />;
    }
  };

  const goToSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getSaveAndCancelButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between mt-2 mx-3">
        <div>{getWarningMessage()}</div>
        <div className={"d-flex"}>
          <div>
            <StandaloneSaveButton
              saveFunction={updateMembers}
              type={"Members"}
            />
          </div>
          <div>
            <CancelButton
              isLoading={isLoading}
              cancelFunction={goToSummaryPanel}
              className={"ml-2"}
            />
          </div>
        </div>
      </div>
    );
  };

  const updateSearchText = (value) => {
    setSelectedNonMembers([]);
    setSelectedMembers([]);
    setSearchText(value);
  };

  const getSearchBar = () => {
    return (
      <Row>
        <Col xs={12}>
          <InputGroup className={"flex-nowrap my-2"}>
            <InputGroup.Prepend>
              <Button
                disabled={isLoading}
              >
                <IconBase
                  isLoading={isLoading}
                  icon={faSearch}
                />
              </Button>
            </InputGroup.Prepend>
            <input
              placeholder={"Search by Name or Email"}
              value={searchText}
              className={"form-control"}
              onChange={event => updateSearchText(event.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    );
  };

  const getFilteredMembers = () => {
    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return members.filter((member) => {
        return member.emailAddress.toLowerCase().includes(lowercaseSearchText) || member.name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByFirstName(members)];
  };

  const getFilteredNonMembers = () => {
    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return nonMembers.filter((nonMember) => {
        return nonMember.emailAddress.toLowerCase().includes(lowercaseSearchText) || nonMember.name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByFirstName(nonMembers)];
  };


  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Users"}/>);
  }

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <div><h5>Add or remove Members from the {ldapGroupData.getData("name")} {type}</h5></div>
      </Row>
      <Row>
        <Col xs={12}>
          <MessageFieldBase
            message={` 
            Manage ${type} membership below by adding items from the left column into the right or removing members from the right column.  
            Changes must be saved before being complete. ${type} membership changes take effect after the User logs back in or upon profile Re-sync.
          `}
          />
        </Col>
      </Row>
      <Row>
        {getSaveAndCancelButtonContainer()}
      </Row>
      {getSearchBar()}
      <Row className={"mx-0"}>
        <Col xs={12} sm={6} className={"px-0 mt-2"}>
          <NonMembersPanel
            members={members}
            setMembers={setMembers}
            setSelectedNonMembers={setSelectedNonMembers}
            selectedNonMembers={selectedNonMembers}
            nonMembers={nonMembers}
            setNonMembers={setNonMembers}
            setShowUnsavedChangesMessage={setShowUnsavedChangesMessage}
            filteredNonmembers={getFilteredNonMembers()}
            setSearchText={setSearchText}
          />
        </Col>
        <Col xs={12} sm={6} className={"px-0 mt-2"}>
          <MembersPanel
            members={members}
            setMembers={setMembers}
            setSelectedMembers={setSelectedMembers}
            selectedMembers={selectedMembers}
            nonMembers={nonMembers}
            setNonMembers={setNonMembers}
            setShowUnsavedChangesMessage={setShowUnsavedChangesMessage}
            filteredMembers={getFilteredMembers()}
            setSearchText={setSearchText}
          />
        </Col>
      </Row>
      <Row>
        {getSaveAndCancelButtonContainer()}
      </Row>
    </DetailPanelContainer>
  );
}

LdapGroupMembershipManagementPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  orgDomain: PropTypes.string,
  getGroup: PropTypes.func,
  setActiveTab: PropTypes.func,
  loadData: PropTypes.func,
  type: PropTypes.string,
};

LdapGroupMembershipManagementPanel.defaultProps = {
  type: "Group",
};

export default LdapGroupMembershipManagementPanel;
