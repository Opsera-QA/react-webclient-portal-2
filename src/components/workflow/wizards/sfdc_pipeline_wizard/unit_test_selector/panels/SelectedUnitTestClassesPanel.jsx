import React, {useState} from "react";
import PropTypes from "prop-types";
import UnitTestClassCard from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/panels/UnitTestClassCard";
import {faArrowLeft, faMinusCircle, faCode} from "@fortawesome/pro-light-svg-icons";
import ClientSideBottomPaginator from "components/common/pagination/client_side/ClientSideBottomPaginator";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function SelectedUnitTestClassesPanel({selectedMembers, setSelectedMembers, nonMembers, setNonMembers, members, setMembers, setShowUnsavedChangesMessage, filteredMembers}) {
  const [shownMembers, setShownMembers] = useState([]);

  if (members == null) {
    return <></>;
  }

  const removeAllMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newNonMembers = nonMembers;
    newNonMembers.push(...filteredMembers);
    let newMembers = members.filter(user => !newNonMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
  };

  const removeAllShownMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newNonMembers = nonMembers;
    newNonMembers.push(...shownMembers);
    let newMembers = members.filter(user => !newNonMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedMembers([]);
  };

  const addSelectedToNonMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newNonMembers = nonMembers;
    newNonMembers.push(...selectedMembers);
    let newMembers = members.filter(user => !newNonMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedMembers([]);
  };

  const formatUser = (user, index) => {
    return (
      <div key={user} className={index % 2 === 0 ? "even-row" : "odd-row"}>
        <UnitTestClassCard selectedUsers={selectedMembers} setSelectedUsers={setSelectedMembers} user={user}/>
      </div>
    );
  };

  const formatUsers = () => {
    if (shownMembers.length === 0) {
      return (
        <div className="h-100 m-auto text-center">
          <span>No Records Found</span>
        </div>
      );
    }

    return (shownMembers.map((user, i) => {return (formatUser(user, i));}));
  };

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <Button size="sm" variant="danger" onClick={removeAllMembers}>
          <span className="mr-2"><IconBase icon={faMinusCircle} className={"mr-2"} />Remove All</span>
          <span className="badge badge-secondary">{filteredMembers.length}</span>
        </Button>
        <Button disabled={selectedMembers.length === 0} size="sm" variant="outline-primary" onClick={() => addSelectedToNonMembers()}>
          <div className="d-flex justify-content-between">
            <div><IconBase icon={faArrowLeft} /></div>
            <div className="mx-2">Remove Selected</div>
            <div><span className="badge badge-secondary">{selectedMembers.length}</span></div>
          </div>
        </Button>
        <Button size="sm" variant="outline-danger" onClick={removeAllShownMembers}>
          <span className="mr-2"><IconBase icon={faMinusCircle} className={"mr-2"} />Remove All Shown</span>
          <span className="badge badge-secondary">{shownMembers.length}</span>
        </Button>
      </div>
      <div className="content-card-1 content-container">
        <div className="p-2 d-flex content-block-header members-title justify-content-between">
          <div><IconBase icon={faCode} className={"mr-2"}/>Selected Unit Test Classes</div>
          <div>{members.length} {members.length !== 1 ? "classes" : "class"}</div>
        </div>
        <ul className="list-group membership-list">
          {formatUsers()}
        </ul>
        <div className="px-3 mt-2">
          <ClientSideBottomPaginator items={filteredMembers} setShownItems={setShownMembers} paginationStyle={"stacked"} pageSize={20} />
        </div>
      </div>
    </div>
  );
}

SelectedUnitTestClassesPanel.propTypes = {
  members: PropTypes.array,
  setMembers: PropTypes.func,
  nonMembers: PropTypes.array,
  setNonMembers: PropTypes.func,
  selectedMembers: PropTypes.array,
  filteredMembers: PropTypes.array,
  setSelectedMembers: PropTypes.func,
  setShowUnsavedChangesMessage: PropTypes.func
};

export default SelectedUnitTestClassesPanel;