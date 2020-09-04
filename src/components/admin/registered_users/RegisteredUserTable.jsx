import React, {Fragment, useContext, useMemo, useState} from "react";
import {Table, Button, Row, Col, Spinner} from "react-bootstrap";
import { useTable, useExpanded, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

import "../admin.css";
import ModalActivityLogs from "../../common/modal/modalActivityLogs";
import {faSearchPlus} from "@fortawesome/pro-regular-svg-icons";
import RegisteredUserActions from "./registered-user-actions";
import {AuthContext} from "../../../contexts/AuthContext";

function RegisteredUserTable({  data, deployingElk, handleDeletePress, handleDeployElkStack, gotoProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { getAccessToken } = useContext(AuthContext);

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "_id",
      },
      {
        Header: "User Info",
        accessor: "row",
        Cell: (props) => {
          return (
            <>
              <FontAwesomeIcon icon={faSearchPlus}
                             style={{ cursor: "pointer" }}
                             onClick= {() => { selectRow(props, props.row, props.row["index"]); }} />
            </>
          );
        },
      },
      {
        Header: "Name",
        accessor: "firstName"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Organization",
        accessor: "organizationName"
      },
      {
        Header: "Domain",
        accessor: "domain"
      },
      {
        Header: "Created",
        accessor: "createdAt",
        class: "cell-center no-wrap-inline"
      },
      {
        Header: "Actions",
        Cell: (cellData) => actionButtons(cellData)
      }
    ],
    []
  );

  const selectRow = (rows, row, index) => {
    return getUserData(rows["data"][index]["_id"]);
  };

  const getUserData = async (userId) => {
    try {
      setShowModal(true);
      const response = await RegisteredUserActions.getUserRecord(userId, getAccessToken);
      // console.log("[LdapOrganizationDetailView] Response: ", response.data);
      setModalData(response.data);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      // setError(error);
    }
  }

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="primary" size="sm" onClick={() => { gotoProfile(cellData.row.original._id); }} className="mr-4"> Analytics Profile</Button> 
        <Button variant="danger" size="sm" onClick={() => { handleDeletePress(cellData.row.original._id); }} > Deactivate User</Button>     
      </>
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, 
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useExpanded
  );

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <th key={j} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon icon={faSortDown} className="float-right" />
                        : <FontAwesomeIcon icon={faSortUp} className="float-right" />
                      : <FontAwesomeIcon icon={faSort} className="float-right"/>}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return <td key={j} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>

                {/* Sub block code goes here */}

                {Object.keys(row.original.tools).length > 0 && <tr><td colSpan="7">Tools:</td></tr>}
                {Object.keys(row.original.tools).length > 0 ? (
                  <tr key={i} className="tools-block">
                    <td colSpan="7">
                      {row.original.tools.map((tool, index) => (
                        <Row key={index} style={{ marginLeft: "10px", fontSize: ".9em" }}>
                          <Col xs={3}>{tool._id}</Col>
                          <Col xs={2}>{tool.name}</Col>
                          <Col xs={2}>{tool.toolStatus}</Col>
                          <Col>{tool.dnsName}</Col>                              
                        </Row>
                      ))}
                    </td>
                  </tr>) :
                  <tr className="tools-block">
                    <td colSpan="2" className="text-muted text-center"> No tools are associated with this user account! </td>
                    <td colSpan="2" className="text-muted text-center">
                      <Button variant="outline-secondary" disabled={deployingElk} size="sm" 
                        onClick={() => { handleDeployElkStack(row.original._id); }} >
                            Deploy ELK Stack Now</Button> 
                    </td>
                  </tr>
                }

              </Fragment>
            );
          })}
        </tbody>
      </Table>
      <ModalActivityLogs header="User Information" size="lg" jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}


export default RegisteredUserTable;