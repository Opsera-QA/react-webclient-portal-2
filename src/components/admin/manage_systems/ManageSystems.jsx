import React, { PureComponent } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import UserInfo from "./UserInfo";
import SearchInput from "./SearchInput";
import ErrorDialog from "../../common/error";
import Tools from "../delete_tools/Tools";

const initState = {
  loading: false,
  applications: null,
  users: null,
  application: null,
  orgs: null,
  org: "",
  fetching: true,
  error: null,
  messages: null
};

export default class ManageSystems extends PureComponent {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = initState;
  }

  handleUserChangeValue = (e) => {
    const { users } = this.state;
    const user = users.find(user => user.email === e.target.value);
    this.setState({
      user,
      applications: user.applications || [],
      application: null,
    });
  }

  handleChangeValue = (e) => {
    this.setState({
      fetching: true
    })
    const { applications } = this.state;
    const application = applications.find(app => app.name === e.target.value);
    this.setState({
      application,
    }, () => { this.setState({ fetching: false }) });
  }

  orgSearch = async (e) => {
    e.preventDefault();
    const { org } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
      const accessToken = await getAccessToken();
      const apiCall = new ApiService("/organization/" + org, {}, accessToken);
      let currentComponent = this;
      apiCall.get().then(function (response) {
        const users = response.data;              // TODO : verify this after api req is processed
        currentComponent.setState({
          users: users,                      // users.data or users verify with api response
          error: null,
          fetching: false
        });
      })
        .catch(function (error) {
          currentComponent.setState({
            error: error,
            fetching: false
          });

        });
    } catch (err) {
      console.log(err);
    }
    this.setState({
      loading: false,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    let updater = {
      [name]: value,
    };

    if (name === "org") {
      updater = {
        ...initState,
        [name]: value,
      };
    }

    this.setState(updater);
  }

  render() {
    const { applications, application, users, loading, org, user, fetching, error } = this.state;

    return (
      <Container>
        <h2>Manage Tools</h2>
        {error ? <ErrorDialog error={error} /> : null}
        <Form loading={loading ? "true" : undefined} style={{ maxWidth: "500px" }}>
          <SearchInput
            org={org}
            loading={loading ? "true" : undefined}
            orgSearch={this.orgSearch}
            handleChange={this.handleChange}
          />

          {users && users.length === 0 && (
            <p>No Organiztion found that match this name</p>
          )}

          {users && users.length > 0 && (
            <Form>
              <Form.Group>
                <Form.Control as="select"
                  defaultValue=""
                  value={users === null ? "" : users.name}
                  onChange={this.handleUserChangeValue}
                  style={{ marginTop: 25 }}>
                  <option value="" disabled>{fetching ? "loading..." : "Select Users"}</option>
                  <>
                    {users ? users.map((user, key) => (
                      <option key={user.firstName} value={user.email}>{user.firstName}</option>
                    )) : ""}
                  </>
                </Form.Control>
              </Form.Group>
            </Form>
          )}

          {user && users && users.length > 0 && <UserInfo user={user} />}

          {applications && applications.length === 0 && (
            <p>No Applications to display for this user</p>
          )}

          {applications && applications.length > 0 && (
            <Form>
              <Form.Group>
                <Form.Control as="select"
                  defaultValue=""
                  value={application === null ? "" : application.name}
                  onChange={this.handleChangeValue}
                  style={{ marginTop: 25 }}>
                  <option value="" disabled>{fetching ? "loading..." : "Select application"}</option>
                  {!fetching && (
                    <>
                      {applications ? applications.map((app, key) => (
                        <>
                          {
                            app.tools.length > 0 && (
                              <option key={app.name} value={app.name}>{app.name}</option>
                            )
                          }
                        </>
                      )) : ""}
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Form>

        {application && applications.length > 0 && <>{!fetching && <Tools application={application} />}</>}
      </Container>
    );
  }
}
