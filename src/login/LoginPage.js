import React, { Component } from 'react';
import SignIn from './SignIn';



class LoginPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        username : '',
        password : ''
      }
    }
    render() { 
      console.log(this.props)
      return ( 
      <div>
        <SignIn result = {this.state} history={this.props.history} validate = {this.props.validate}/> );
      </div>
      
    );
    }
  }
   
  export default LoginPage;