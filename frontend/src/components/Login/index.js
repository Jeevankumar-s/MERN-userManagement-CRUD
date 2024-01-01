import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {email: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeEmail = event => {
    this.setState({email: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  onSubmitSuccess = jwtToken => {
    // const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
   alert("login success")
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitAddUserForm = async event => {
    event.preventDefault()
    const {name, email,phone,gender,aboutCompany,city,state,password} = this.state
    const userData = {name, email,phone,gender,aboutCompany,city,state,password}
    console.log(userData)
    const apiUrl = 'http://localhost:3303/signup'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      alert("Sign up successful")
      // this.onSubmitSuccess(data.jwt_token)
    } else {
      // this.onSubmitFailure(data.error_msg)
    }
  }

  

  renderUsername = () => {
    const {email} = this.state

    return (
      <>
        <label className="label" htmlFor="gmail">
          GMAIL
        </label>
        <input
          type="email"
          id="gmail"
          className="input-field"
          onChange={this.onChangeEmail}
          value={email}
          placeholder="Email"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      // return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <div className="website-logo-image-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
            alt="login website logo"
            className="website-logo"
          />
        </div>
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="login-title">Login</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="register-text">New User Register Here  
          <span> Regsiter</span>
          </p>
        </form>
      </div>
    )
  }
}

export default LoginRoute