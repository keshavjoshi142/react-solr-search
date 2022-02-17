import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import EduRow from './EduRow'
import AddIcon from '@material-ui/icons/Add';




const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    button: {
        margin: theme.spacing.unit,
      },
});


class Education extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
           Education : [] ,
           Index  :1 ,
           Submit : false,
        }
        
    }

    Submitfunc = (edu) => {
        if(edu.instName !== "" && edu.degree !== "" && edu.From !== "" && edu.To !== "") {
            this.state.Education.push(edu);
        } else {
            alert("All fields are required")
        }
        
    }

    handleAddEducation = () => {
        this.setState({
            Index : this.state.Index + 1,
        })
        
    }

    componentDidUpdate(){
       if(this.props.Submit)
       {
           console.log(this.state.Education)
           this.props.accumulateEducation(this.state.Education)
       }
    }

    handleSubmit = () => {

        
        this.setState({
            Submit : true
        })
        this.props.ableNext()
    }

    render() { 
      

        const {classes , theme} = this.props;
        const Row = [];
        console.log(this.state.Index)
        
        for(var i=0 ; i<this.state.Index ; i++){
            Row.push( <div key = {i}>
                <EduRow 
                Submit = {this.state.Submit }
                Submitfunc = {this.Submitfunc} 
                />
            </div>)
        }
        
        

        return ( 
            <div>
                {Row}
                 <Button
                 variant = "fab"
                 color = "primary"
                 aria-label = "Add"
                 onClick={this.handleAddEducation}
                 className="small"
                >
                <AddIcon />
                 </Button>

                <Button
                variant = "extendedFab"
                color = "primary"
                aria-label = "Add"
                onClick={this.handleSubmit}
                className="small"
                >
                Submit
                </Button>
            </div>

         );
    }
}

Education.propTypes = {
    classes: PropTypes.object.isRequired
};
 
export default withStyles(styles)(Education); 

