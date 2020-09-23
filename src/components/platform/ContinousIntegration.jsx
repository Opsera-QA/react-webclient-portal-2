import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function ContinousIntegration(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools, isEKS  } = props;
  const [isChecked, setCheckbox] = useState({
    Jenkins: tools.includes("Jenkins") ? true : false,
    Teamcity: tools.includes("Teamcity") ? true : false,
    Argocd: tools.includes("Argocd") ? true : false,
    Spinnaker: tools.includes("Spinnaker") ? true : false,
    FluxCD: tools.includes("FluxCD") ? true : false,
  });

  useEffect(() => {
    setCheckbox({ 
      Jenkins: false,
      Teamcity: false,
      Argocd: false,
      Spinnaker: false,
      FluxCD: false, 
    });
    if(tools.length > 0) {
      tools.map((tool) => {
        if(isChecked[tool] !== undefined) {
          setCheckbox({ 
            ...isChecked, 
            [tool] : true 
          });
        }
      });
    }
  }, [tools]);


  const selectCard = (serviceType) => {
    //On each click, check if it's already selected 
    if(isChecked[serviceType] ) {
      //de-select the checkbox
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : false
      });
      //remove the entry from master dataset ( data from context here )
      // delete data[serviceType];
      handleCancel();
    }else {
      //If it's a new selection, select the checkbox, show the modal and update the dataset (data from context here )
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : true
      });
      setState({
        open: true,
        category: "Continuous Integration And Deployment",
        service: serviceType,
      });
    }
  };


  return (
    <>
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>CI/CD</Card.Title>
          <div>
            <div
              className={`newApp__service-logo ${tools.includes("Jenkins") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() => selectCard("Jenkins")}
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Jenkins") ? true : false}
                checked={isChecked.Jenkins && data["Jenkins"]}
                className="newApp__checkbox"
                onClick={() => selectCard("Jenkins")}
              />
              <img src={require("./imgs/jenkins.png")} alt="Jenkins" />
              <span className="newApp__service-title">Jenkins</span>
            </div>

            <div
                className={`newApp__service-logo ${tools.includes("TeamCity") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
                onClick={() => selectCard("TeamCity")}
              >
                <input type="checkbox"
                  inline
                  disabled={tools.includes("TeamCity") ? true : false}
                  checked={isChecked.TeamCity && data["TeamCity"]}
                  className="newApp__checkbox"
                /> 
                <img src={require("./imgs/team-city.png")} alt="Team City"/>
                <span className="newApp__service-title">Team City</span>
              </div>

              <div
              className={`newApp__service-logo ${tools.includes("Argocd") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
              onClick={() => selectCard("Argocd")}
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Argocd") ? true : false}
                checked={isChecked.Argocd && data["Argocd"]}
                className="newApp__checkbox"
                onClick={() => selectCard("Argocd")}
              />
              <img src={require("./imgs/argocd.png")} />
              <span className="newApp__service-title">Argocd</span>
            </div>

            <div
              className={`newApp__service-logo ${tools.includes("Spinnaker") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
              onClick={() => selectCard("Spinnaker")}       
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Spinnaker") ? true : false}
                checked={isChecked.Spinnaker && data["Spinnaker"]}
                className="newApp__checkbox"
                onClick={() => selectCard("Spinnaker")}
              />
              <img src={require("./imgs/spinnaker.png")} />
              <span className="newApp__service-title">Spinnaker</span>
            </div>

            <div
              className={`newApp__service-logo ${tools.includes("FluxCD") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
              onClick={() => selectCard("FluxCD")}>
              <input type="checkbox"
                inline
                disabled={tools.includes("FluxCD") ? true : false}
                checked={isChecked.FluxCD && data["FluxCD"]}
                className="newApp__checkbox"
                onClick={() => selectCard("FluxCD")}
              />
              <img src={require("./imgs/flux.png")} />
              <span className="newApp__service-title">FluxCD</span>
            </div> 
                       
          </div>
        </Card.Body>
      </Card>
    </>
  );
} 

ContinousIntegration.propTypes = {
  tools: PropTypes.array,
  isEKS: PropTypes.bool,
};

export default ContinousIntegration;
