import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import MultipleSelect from './SkillsSelect'
import Education from './Education';
import ProjectDetails from './ProjectDetails';
import Image from './Image'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

function getSteps() {
  return ['Personal-Information', 'Skill-set', 'Education' , 'Projects','Upload-photo'];
}

function submit (name , userName , emailId , phoneNo , password , skills, education , projects , image ){
  console.log(education)
  return fetch(`http://localhost:8080/api/add/employeeData` ,{
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name,
        userName,
        emailId,
        phoneNo , 
        password ,
        skills,
        education,
        projects,
        image,

    })
  }).then(res=>{
    console.log(res)
    alert("You have been successfully Registered")
  }).catch(err=>{
    alert("Something went wrong while your registration")
  })
}


class Registration extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      Name : "",
      UserName : "",
      EmailId : "",
      PhoneNO : "",
      Password : "",
      ConfirmPassword:"",
      SkillsSet : [],
      Education : [],
      Projects : [],
      Image : "",
      activeStep :0,
      skillsSubmit : false,
      EducationSubmit : false,
      ProjectSubmit : false,
      ImageSubmit : false,
      nextButton : false,
    }

  }

  accumulateSkills = (skill) => {
    this.setState({
      SkillsSet : skill
    }, ()=>{
      if(this.state.SkillsSet.length !== 0){
        console.log("kkkes"+this.state.SkillsSet)
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          nextButton : true,
        }));
      }else{
        alert("All Fields Required");
      }
    })
}


  accumulateEducation = (education) => {
    console.log(education)
    this.setState({
      Education : education,
    },()=>{
      if(this.state.Education.length > 0){
      console.log(this.state.Education)
      sessionStorage.setItem('Education' , this.state.Education)
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        nextButton : true,
      }));
    }else{
      console.log(this.state.Education)

      alert("atleast one Education Detail Required")
    }})
  }

  accumulateProject = (projects , nextButton) => {
    this.setState({
      Projects : projects,
      nextButton : nextButton,

    },()=>{
      if(this.state.Projects.length > 0){
        console.log(this.state.Projects)
        this.setState(state =>({
          activeStep : state.activeStep + 1
        }));
      }else{
        alert("atleast one Project Details Required")
      }
    })
  }

  accumulateImage = (image) =>{
    console.log(157+image)
    this.setState({Image: image},()=>{
      console.log(159+this.state.Image)
      submit(this.state.Name , this.state.UserName , this.state.EmailId , this.state.PhoneNO ,this.state.Password,
        this.state.SkillsSet , this.state.Education , this.state.Projects , this.state.Image);
        this.props.history.replace('/')
    }
  )
  }

  ableNext = () => {
    this.setState({
      nextButton : false,
    })
  }

  disableNext = () => {
    this.setState({
      nextButton : true,
    })
  }



  handleNext = () => {
    if(this.state.activeStep === 0){

      if(this.state.Name !== "" && this.state.EmailId !== "" && this.state.UserName !=="" &&
          this.state.PhoneNO !== "" && this.state.Password !== "" &&
          this.state.confirmPassword !== "" && this.state.Password === this.state.ConfirmPassword && this.state.EmailId.indexOf('@') > -1){
            fetch('http://localhost:8080/check/'+this.state.UserName)
            .then(response => {
                console.log(response);
                if(response.status >= 200 && response.status < 400) {
                  this.setState(state => ({
                    activeStep: state.activeStep + 1,
                    nextButton : true,
                  
                  }));
                } else {
                    alert("UserName is already taken")
                }
                
            
            }).catch((err=>{
              alert("Something went Wrong")
            }));

          }
        else{
          alert("All Fields Required");
          console.log(this.state.EmailId)
        }
    }

    if(this.state.activeStep === 1){
      console.log("SkillsSubmit")

      this.setState({
        skillsSubmit : true,
      
      })
     
    }

    if(this.state.activeStep === 2){
      this.setState({
        EducationSubmit : true,
      })
    }

    if(this.state.activeStep === 3){

      this.setState({
        ProjectSubmit : true,
      })
    }

    if(this.state.activeStep === 4){
      this.setState({
        activeStep: this.state.activeStep + 1,
        ImageSubmit : true
      })
    }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getStepContent = (step , classes) => {
    switch (step) {
      case 0:
        return (
        <form className={classes.container} noValidate autoComplete="off" style={{width : '30%',display:'flex' , flexDirection : 'column'}}>
        <TextField
        id="outlined-name"
        label="Name"
        value={this.state.Name}
        onChange={this.handleChange('Name')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
       <TextField
        id="outlined-UserName"
        label="UserName"
        onChange={this.handleChange('UserName')}
        value={this.state.UserName}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        />
      <TextField
      id="outlined-email-input outlined-required"
      label="Email"
      className={classes.textField}
      value={this.state.EmailId}
      error = {(this.state.EmailId.indexOf('@')>-1 || this.state.EmailId==="") ?(false):(true)}
      onChange={this.handleChange('EmailId')}
      type="email"
      name="email"
      autoComplete="email"
      margin="normal"
      variant="outlined"
    />
    <TextField
          id="phone-number"
          label="Contact-Number"
          value={this.state.PhoneNO}
          error = {(this.state.PhoneNO.length>=10 || this.state.PhoneNO==="") ?(false):(true)}
          onChange={this.handleChange('PhoneNO')}
          type="number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
    <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          value={this.state.Password}
          autoComplete="current-password"
          onChange={this.handleChange('Password')}
          margin="normal"
          variant="outlined"
        />
      <TextField
          id="outlined-confirm-password-input"
          label="Confirm-Password"
          error = {(this.state.ConfirmPassword===this.state.Password || this.state.ConfirmPassword==="")?(false):(true)}
          onChange={
            this.handleChange("ConfirmPassword")}

          className={classes.textField}
          value={this.state.ConfirmPassword}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
  
  </form> )

      case 1:
         
        return (
            <MultipleSelect accumulateSkills = {this.accumulateSkills} Submit = {this.state.skillsSubmit} ableNext = {this.ableNext} />
        )
      case 2:
     
        return (
          <Education accumulateEducation = {this.accumulateEducation} ableNext = {this.ableNext} Submit = {this.state.EducationSubmit}/>
        )
      case 3:
        return (
          <ProjectDetails accumulateProjectDetails ={this.accumulateProject} ableNext = {this.ableNext}  Submit = {this.state.ProjectSubmit}/>
        )
      case 4:
        return (
          
          <Image Submit = {this.state.ImageSubmit} accumulateImage = {this.accumulateImage}/>
        )
      default:
        return 'Unknown step';
    }
  }
  

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      nextButton : false,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    console.log(this.state.activeStep)
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root} style = {{margin : 'auto'} }>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                 {this.getStepContent(index , classes)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        disabled = {this.state.nextButton}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Registration);