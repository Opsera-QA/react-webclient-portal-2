
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
import { Button, Card } from 'react-bootstrap';
import { setOktaUser } from "./actions/thunk"
import { connect } from "react-redux"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
    const { auth, setOktaUser } = this.props
    const [accessToken, user] = await Promise.all([
      auth.getAccessToken(),
      await auth.getUser(),
    ])
    // if user is authenticated then set that user details in local redux store
    setOktaUser({
      accessToken,
      user,
    })
    // persist the store data
    localStorage.setItem("authentication", JSON.stringify(this.props.user))
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  gotoSignUp = () => {
    let path = `/signup`;
    this.props.history.push(path);
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
          <div style={{ marginTop: 15 }}>
            {this.state.authenticated &&
              <div>
                <h2>Welcome back, {this.state.userinfo.name}!</h2>
                <p>
                  You have successfully logged in!  You now have an ID token and access token in local storage.
                  Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
                </p>


                <Card>
                  <Card.Header>Getting Started</Card.Header>
                  <Card.Body>
                    <Card.Title>OpsERA offers multiple ways to work with your DevOps solution.  </Card.Title>
                    <Card.Text>
                    The OpsERA DevOps Product comes up with the best time to market solutions for all your technology 
                    automation and workflow is seamless and optimized throughout your organization.  We deliver solutions 
                    to automate build, deploy, security and testing with open source tools for your development team to 
                    manage application upgrades effectively and in secured way. We also provide pragmatic solutions for 
                    various cloud-based products using open source frameworks and we ensure that enterprise policies are met.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>

                <h4 style={{ marginTop: 25 }}>Features:</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <a href="/inventory">My Application Inventory</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#">Reports and Dashboards</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#">Upgrades and Maintenance</a>
                  </li>
                </ul>

              </div>
            }
            {!this.state.authenticated &&
              <div style={{ marginTop: 25 }}>

                <div className="row">
                  <div className="col-md-12 col-lg-7 text-center text-md-left pr-md-5">
                    <h1 className="mb-3 bd-text-purple-bright">OpsERA</h1>
                    <p className="lead">
                      Make DevOps a streamlined, managed experience, allowing developers to focus on what they enjoy doing most: writing code!
                    </p>
                    <p className="lead mb-4">
                      OpsERA is an end to end DevOps Workflow Solution that can manage all of the tasks and resources for a team’s CI/CD Pipeline automatically, allowing for a single pane of glass view on the entire DevOps workflow including easy to use interfaces and advanced, consolidated error reporting and usage and optimization reporting.
                    </p>
                    <div className="row mx-n2">
                      <div className="col-md px-2">
                        <Button variant="success" className="btn-lg w-100 mb-3" onClick={this.gotoSignUp}>Sign Up</Button>
                      </div>
                      <div className="col-md px-2">
                        <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
                      </div>
                    </div>
                  </div>

                  <div className="d-none d-lg-inline col-5 mx-auto">
                    <img src="/img/opsera_logo_large.png" width="375" alt="" />
                  </div>
                </div>
              </div>
            }

          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication
})

export default withAuth(
  connect(
    mapStateToProps,
    { setOktaUser },
  )(Home),
)
