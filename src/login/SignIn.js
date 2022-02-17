    import React from 'react';
    import PropTypes from 'prop-types';
    import Avatar from '@material-ui/core/Avatar';
    import Button from '@material-ui/core/Button';
    import CssBaseline from '@material-ui/core/CssBaseline';
    import FormControl from '@material-ui/core/FormControl';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import Checkbox from '@material-ui/core/Checkbox';
    import Input from '@material-ui/core/Input';
    import InputLabel from '@material-ui/core/InputLabel';
    import LockIcon from '@material-ui/icons/LockOutlined';
    import Paper from '@material-ui/core/Paper';
    import Typography from '@material-ui/core/Typography';
    import withStyles from '@material-ui/core/styles/withStyles';
    import AuthService from './AuthService'

    import {
      BrowserRouter as Router,
      Route,
      Link,
      Redirect,
      withRouter
    } from 'react-router-dom'

    const styles = theme => ({
      layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
      avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
      },
      submit: {
        marginTop: theme.spacing.unit * 3,
      },
    });



    class SignIn extends React.Component {
    

      constructor(props) {
        super(props);
        this.state={
          showError: false,
          username : props.result.username,
          password : props.result.password,
      
        };

        this.Auth = new AuthService();
      }

      componentWillMount(){
        if(this.Auth.loggedIn())
        {
          console.log(this.Auth.getToken())
          this.props.history.replace('/home')
        }
          
      }

      handleClick=(event)=>{
        event.preventDefault();
      
        const { history,validate } = this.props;
      
        if(this.state.username===''||this.state.password===''){
            this.setState({
              showError : true
            })
        }else{
            this.Auth.login(this.state.username ,  this.state.password)
                .then(res => {
                  localStorage.setItem('username' , this.state.username)
                    this.props.history.replace({
                      pathname: '/home',
                    });
            
                })
                .catch(err => {
                  alert(err);
                })
            }
        }




      render() {
        const { classes , result} = this.props;
      


      return (
      
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography variant="headline">Sign in</Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input 
                    id="username" 
                    name="username" 
                    autoComplete="username" 
                    autoFocus 
                    onChange={(e)=>{console.log(e.target.value); 
                    this.setState ({
                      username : e.target.value
                    });
                  }}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange = {
                      (e)=>{
                        this.setState({
                          password : e.target.value
                        });
                      }
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {this.state.showError && <Typography >please enter your details</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick = {(event => this.handleClick(event))}
                >
                  Sign in
                </Button>
                <Link to = '/registration' style = {{width:'whatever',margin:'0 auto'}} >Don't have Account..? Please Register</Link>
              </form>
            </Paper>
          </main>
        </React.Fragment>
      );
    }
    }

    SignIn.propTypes = {
      classes: PropTypes.object.isRequired,
    };



    export default withStyles(styles)(SignIn);



