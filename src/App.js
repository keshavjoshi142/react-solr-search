    import React, { Component } from 'react';
    import ProfileView from './Profile'
    import Home from './Home';
    import Registration from './Form/Registration'
    import EditProfile from './EditProfile'
    import AuthService from './login/AuthService'
    import { Route, Switch, Redirect } from 'react-router-dom'
    import LoginPage from './login/LoginPage';




    const PrivateRoute = ({component : Component, loggedIn ,...rest}) => (
        <Route {...rest} render = {(props) => (
            loggedIn === true
            ? <Component {...props}/>
            : <Redirect to = '/'/>
            )}/>
    )

    const PrivateRoute2 = ({component : Component, loggedIn ,...rest}) => 
    {
        return (<Route {...rest} render = {(props) => (
            (loggedIn === false)
            ? <Component {...props}/>
            : <Redirect to = '/home'/>
            )}/>)
        }



    class App extends Component {
        constructor(props)
        {
            super(props);
            this.state={
            redirectToReferrer : false  
            }

            this.Auth = new AuthService();
        }
        validate = ()=>{
            this.setState({
                redirectToReferrer : true
            },()=>{console.log(this.state.redirectToReferrer);
            })
        }

        render() { 
            return ( 
                <Switch>
                    
                    <Route exact path = '/'  render={(props)=><LoginPage {...props}/>}/>
                    <Route path = '/home' render={(props)=><Home {...props}/>}/>
                    <Route path = '/editprofile' render={(props)=><EditProfile {...props}/>}/>
                    <PrivateRoute path = '/ProfileView' component = {ProfileView} loggedIn = {this.Auth.loggedIn()}/>
                    <PrivateRoute2 path = '/registration' component = {Registration} loggedIn = {this.Auth.loggedIn()}/>
                    <Route path = '/editProfle' component = {EditProfile}/>
                </Switch>
            );
        }
    }
    
    export default App;
