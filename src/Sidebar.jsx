import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
//import { checkAuthentication } from './helpers';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWrench, faChartLine, faClipboardList, faLink, faEnvelope, faTimes, faHome } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css';

export default withAuth(class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }
  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <Nav defaultActiveKey="/" className="d-flex flex-row flex-md-column sidebar">
        <Nav.Link className="nav-link-light" href="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Nav.Link>
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/home"><FontAwesomeIcon icon={faPlus} fixedWidth /> Platform</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" eventKey="link-1"><FontAwesomeIcon icon={faWrench} fixedWidth /> Pipeline</Nav.Link>}
        {/* {this.state.authenticated && <Nav.Link className="nav-link-light" eventKey="link-2"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Analytics</Nav.Link>} */}
        
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/inventory"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" href="/api_connector"><FontAwesomeIcon icon={faLink} fixedWidth /> Connectors</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" eventKey="link-2"><FontAwesomeIcon icon={faEnvelope} fixedWidth /> Upgrades</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" eventKey="link-2"><FontAwesomeIcon icon={faChartLine} fixedWidth /> Reporting</Nav.Link>}
        {this.state.authenticated && <Nav.Link className="nav-link-light" disabled eventKey="link-2"><FontAwesomeIcon icon={faTimes} fixedWidth /> Delete Tools</Nav.Link>}

        {/* {!this.state.authenticated && <Nav.Link className="nav-link-light" href="/about">Customers</Nav.Link>}      
        {!this.state.authenticated && <Nav.Link className="nav-link-light" href="/about/solutions">Solutions</Nav.Link>}
        {!this.state.authenticated && <Nav.Link className="nav-link-light" href="/about/pricing">Services</Nav.Link>}
        {!this.state.authenticated && <Nav.Link className="nav-link-light" href="/about">Company</Nav.Link>}
        {!this.state.authenticated && <Nav.Link className="nav-link-light" href="/about">Contact Us</Nav.Link>} */}
      </Nav>
    );
  }
});
