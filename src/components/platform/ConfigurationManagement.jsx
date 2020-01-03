import React from "react"
import {Card} from "react-bootstrap"

import {NewAppContext} from "./context"

class ConfigurationManagement extends React.PureComponent {
  static contextType = NewAppContext

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {setState} = this.context
    return (
      <div>
        <Card className="newApp__card">
          <h3>Configuration Management</h3>
          <div className="newApp__card-content">
            <div
              className="newApp__service-logo"
              onClick={() =>
                setState({
                  open: true,
                  category: "Configuration Management",
                  service: "Ansible",
                })
              }
            >
              <img src={require("./imgs/ansible.png")} />
              <span className="newApp__service-title">Ansible</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Configuration Management",
                  service: "Chef",
                })
              }
            >
              <img src={require("./imgs/chef.png")} />
              <span className="newApp__service-title">Chef</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Configuration Management",
                  service: "Puppet",
                })
              }
            >
              <img src={require("./imgs/puppet.png")} />
              <span className="newApp__service-title">Puppet</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default ConfigurationManagement
