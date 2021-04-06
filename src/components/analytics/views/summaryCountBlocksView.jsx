/* This controls layout of the "count" blocks at the top of a dashboard layout
 this accepts a data object with the necessary block values and is only for UI rendering

Expecting data in this format:
[{ name: "Successful Builds", value: "1" footer: "footer text", status: "success" }]

 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTimes } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function SummaryCountBlocksView({ data, view }) {
  useEffect(() => {
    // console.log("Rendering Blocks for data", data);
  }, [data]);

  const setStatusLevel = (status) => {
    if (status === "danger") return "#E57373";
    if (status === "warning") return "#F1AD0F";
    if (status === "success") return "#00897b";

    return null;
  };

  const infoPopover = (item) => {
    return (
      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
        <Popover.Title as="h3">
          {item.name}
          <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
        </Popover.Title>
        <Popover.Content>
          <div className="text-muted mb-2">{item.info}</div>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <>
      {data !== undefined && data.length > 0 ? (
        <CardGroup className="w-100 p-2 d-flex justify-content-center">
          {data.map(function (item, index) {
            return (
              <TooltipWrapper key={index} innerText={item.name}>
                <Card style={view !== "small" ? 
                      { width: "100%", height: "100px" } : { width: "100%" }}>
                  <Card.Body className="summary-count-blocks-card-body">
                    <div className="summary-count-blocks-status"
                        style={{backgroundColor: setStatusLevel(item.status)}}></div>
                    <Card.Title className="summary-count-blocks-card-title">
                      {item.value}
                    </Card.Title>
                    <Card.Subtitle className="summary-count-blocks-card-subtitle">
                      <div> {item.name} </div>
                    </Card.Subtitle>
                      {item.info && (
                        <Card.Text style={{ position: "absolute", right: "10px", bottom: "15px" }}>
                          <OverlayTrigger trigger="click" rootClose placement="top" overlay={infoPopover(item)}>
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className="fa-pull-right pointer pr-1"
                              onClick={() => document.body.click()}
                            />
                          </OverlayTrigger>
                        </Card.Text>
                      )}
                  </Card.Body>
                  {item.footer && <Card.Text className="w-100 text-muted mb-1">{item.footer}</Card.Text>}
                </Card>
              </TooltipWrapper>
            );
          })}
        </CardGroup>
      ) : null}
    </>
  );
}

SummaryCountBlocksView.propTypes = {
  data: PropTypes.array,
  view: PropTypes.string,
};

export default SummaryCountBlocksView;