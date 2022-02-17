import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ProjectRow from './ProjectRow'
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



class ProjectDetails extends React.PureComponent {
    constructor(){
        super();
        this.state = {
            ProjectDetails : [],
            Index : 1,
            Submit : false,
      }
    }

    Submitfunc = (edu) => {
        this.state.ProjectDetails.push(edu);
    }

    handleAddProjectDetails = () => {
        this.setState({
            Index : this.state.Index+1
            
        })
    }

    handleSubmit = () => {
        this.setState({
            Submit : true
        })
        this.props.ableNext()
    }

    componentDidUpdate(){

        if(this.props.Submit)
        {
            console.log(this.state.ProjectDetails)
            this.props.accumulateProjectDetails(this.state.ProjectDetails)
        }
      
    }

    render() { 

        const {classes , theme } = this.props;
        const Row = [];
        for(var i=0 ; i<this.state.Index ; i++){
            Row.push(<div key = {i}>
                <ProjectRow
                    Submit = {this.state.Submit}
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
                 onClick={this.handleAddProjectDetails}
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
 
ProjectDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles , { withTheme :true})(ProjectDetails);

