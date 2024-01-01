import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
import './index.css'

class Signup extends Component {
  state = {email: '', password: '', phone:'', gender:'',aboutCompany:'',city:'',state:'', showErrorMsg: false, errorMsg: ''}

  onChangeEmail = event => {
    this.setState({email: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  onChangeState= event=>{
    this.setState({state: event.target.value, showErrorMsg: false})
  }

  
  changeCity= event=>{
    this.setState({city: event.target.value, showErrorMsg: false})
  }
  
  
  onChangeGender= event=>{
    this.setState({gender: event.target.value, showErrorMsg: false})
  }

  onChangeAboutCompany= event =>{
    this.setState({aboutCompany: event.target.value, showErrorMsg: false})
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
      alert("failure")
      // this.onSubmitFailure(data.error_msg)
    }
  }


  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
   alert("login success")
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userData = {email, password}
    console.log(userData)
    const apiUrl = 'http://localhost:3303/login/'
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
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
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
    const {showErrorMsg, errorMsg,city,state,aboutCompany,gender} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      // return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <form className="login-form-container" onSubmit={this.submitAddUserForm}>

          <h1 className="login-title">Signup</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          <label  className="label">GENDER</label>
          
          <div className = "gender-container">
            <input
            type="radio"
            value="Male"
            onChange={this.onChangeGender}
            checked={gender === 'Male'}
          />
             <label className='option-contents'>Male</label>
          <input
            type="radio"
            value="Female"
            onChange={this.onChangeGender}
            checked={gender === 'Female'}
          />
          <label className='option-contents'>Female</label>
            </div>
         
          <label htmlFor="city"  className="label">CITY</label>
          <select id="city" value={city} onChange = {this.changeCity} className='city-options'>
            <option value = "Mumbai" className='option-contents'>Mumbai</option>
            <option value = "Pune" className='option-contents'>Pune</option>
            <option value = "Ahmedabad" className='option-contents'>Ahmedabad</option>
          </select>

           
          <label  className="label">HOW DID YOU HEAR ABOUT THIS?</label>
          <div className='about-company-container'>
            <div>

          <div className = "check-element">
            <input
            type="checkbox"
            value="LinkedIn"
            onChange={this.onChangeAboutCompany}
            checked={aboutCompany.includes('LinkedIn')}
          />
          <label className='option-contents'>LinkedIn</label>
            </div>
          <div className = "check-element">
            <input
            type="checkbox"
            value="Friends"
            onChange={this.onChangeAboutCompany}
            checked={aboutCompany.includes('Friends')}
          />
          <label className='option-contents'>Friends</label>
            </div>
            </div>
            <div>

          <div  className = "check-element">
            <input
            type="checkbox"
            value="JobPortal"
            onChange={this.onChangeAboutCompany}
            checked={aboutCompany.includes('JobPortal')}
          />
          <label className='option-contents' >Job Portal</label>
            </div>

          <div className = "check-element">
            <input
            type="checkbox"
            value="Others"
            onChange={this.onChangeAboutCompany}
            checked={aboutCompany.includes('Others')}
          />
          <label className='option-contents'>Others</label>
            </div>
        </div>
        </div>

          <label htmlFor="state"  className="label">STATE</label>
          <input
            type="text"
            id="state"
            className="input-field"
            onChange={this.onChangeState}
            value={state}
            placeholder="Auto Suggested Search"
            list="statesList"
          />
          <datalist id="statesList">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
          

          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit"  className="login-button">
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

export default Signup
