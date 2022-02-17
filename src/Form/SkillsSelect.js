import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactDOM from 'react-dom';

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
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'JAVA BEGINNER',
  'Java INTERMEDIATE',
  'JAVA ADVANCED',
  'CPP BEGINNER',
  'CPP INTERMEDIATE',
  'CPP ADVANCED',
  'C BEGINNER',
  'C INTERMEDIATE',
  'C ADVANCED',
  'ELASTICSEARCH BEGINNER',
  'ELASTICSEARCH INTERMEDIATE',
  'ELASTICSEARCH ADVANCED',
  'SOLR BEGINNER',
  'SOLR INTERMEDIATE',
  'SOLR ADVANCED',
  'KOTLIN BEGINNER',
  'KOTLIN INTERMEDIATE',
  'KOTLIN ADVANCED',
  'REACT BEGINNER',
  'REACT INTERMEDIATE',
  'REACT ADVANCED',
  'KAFKA BEGINNER',
  'KAFKA INTERMEDIATE',
  'KAFKA ADVANCED',
  'APACHE IGNITE BEGINNER',
  'APACHE IGNITE INTERMEDIATE',
  'APACHE IGNITE ADVANCED',
];

class MultipleSelect extends React.PureComponent {
    state = {
        name: [],
      };
      
      
      handleChange = event => {
         this.setState({ 
           name: event.target.value },()=>{
             if(this.state.name.length === 1){
               this.props.ableNext()
             }
           });
         
      };

      componentDidUpdate() {
        if(this.props.Submit){
          this.props.accumulateSkills(this.state.name)
        }
      }

  

  handleProficiencyChange = event =>{
      this.setState({
        Proficiency : event.target.value,
        index : this.state.index + 1 
      })
  }

  render() {
    const { classes, theme , ableNext , disableNext} = this.props;

    return (
      
      <div className={classes.root}>
          <FormControl className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="outlined-age-simple"
          >
            Skills
          </InputLabel>          
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<OutlinedInput
                name="age"
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                id="outlined-age-native-simple"
              /> }
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={{
                  fontWeight:
                    this.state.name.indexOf(name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);