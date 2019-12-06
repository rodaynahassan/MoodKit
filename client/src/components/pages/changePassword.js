import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { MDBRow, MDBCol, MDBInput} from 'mdbreact'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'
import { MDBCard, MDBCardBody } from 'mdbreact'
import P1 from '../../p1.jpg'
var mongoose = require('mongoose')

const styles = theme => ({
  eye: {
    cursor: 'pointer'
  }
})

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: { value: '', valid: false },
      newPassword: { value: '', valid: false },
      confirmPassword: { value: '', valid: false }
    }
  }

  handleClick(event) {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('jwtToken')
    var apiBaseUrl = '/routes/api/users/changePassword'
    var payload = {
      oldPassword: this.state.oldPassword.value,
      newPassword: this.state.newPassword.value,
      confirmPassword: this.state.confirmPassword.value
    }

    axios
      .post(apiBaseUrl, payload, {
        headers: { Authorization: localStorage.getItem('jwtToken') }
      })
      .then(res => {
        swal(res.data.msg)
        setTimeout("document.location.href = '/profile';",3500);      })
      .catch(err => swal(err.response.data.errmsg || err.response.data))
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        valid: !!event.target.value
      }
    })
  }
  validatePassword() {
    return (
      this.state.newPassword.value.length >= 8 &&
      this.state.newPassword.value.length <= 20 &&
      this.state.newPassword.value === this.state.confirmPassword.value
    )
  }

  render() {
    return (
      <div>
        <div>
          <img
            src={P1}
            style={{
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
              position: 'sticky',
              zIndex: '0'
              //transform: 'translate3d(0,-180px,0)'
            }}
          />
        </div>
        <div style={{ zIndex: '30', transform: 'translate3d(0,-670px,30px)' }}>
          <MDBCard
            style={{ width: '420px', height: '480px', marginLeft: '350px' }}
          >
            <MDBCardBody>
              <div>
                <h2 style={{ marginLeft: '70px', marginRight: '20px' }}>
                  <font color="purple">
                    <strong>Change Password</strong>
                  </font>
                </h2>
                <MuiThemeProvider>
                  <div style={{ paddingLeft: '30px' }}>
                    <br />
                    <MDBRow>
                      <MDBCol>
                        <MDBInput
                          label="Old Password"
                          value={this.state.oldPassword.value}
                          name="oldPassword"
                          onChange={this.changeHandler}
                          type="password"
                          id="materialFormRegisterNameEx"
                          style={{ width: '300px' }}
                          required
                        ></MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol>
                        <MDBInput
                          label="New Password"
                          value={this.state.newPassword.value}
                          className={
                            this.state.newPassword.valid
                              ? 'is-valid'
                              : 'is-invalid'
                          }
                          name="newPassword"
                          onChange={this.changeHandler}
                          type="password"
                          id="materialFormRegisterNameEx"
                          style={{ width: '300px' }}
                          required
                        >
                          <div className="valid-feedback">
                            "Note: It should be more than 8 characters and less
                            than 20 characters"
                          </div>
                        </MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                      <MDBCol>
                        <MDBInput
                          label="Confirm Password"
                          value={this.state.confirmPassword.value}
                          name="confirmPassword"
                          onChange={this.changeHandler}
                          type="password"
                          id="materialFormRegisterNameEx"
                          style={{ width: '300px' }}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <div>
                      <Button
                        label="Submit"
                        //className="btn btn-outline-purple btn-rounded waves-effect"
                        variant="outline-purple"
                        style={{
                          marginLeft: '120px',
                          width: '100px',
                          height: '40px',
                          backgroundColor: '#a3dbf1'
                        }}
                        disabled={!this.validatePassword()}
                        onClick={event => this.handleClick(event)}
                      >
                        <font color="purple">Submit</font>
                      </Button>
                    </div>
                  </div>
                </MuiThemeProvider>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    )
  }
}
const style = {
  margin: 15
}

// ReactDOM.render(<ChangePassword />, document.getElementById('root'));

export default ChangePassword
