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

const from = ['1980' ,'1981','1982' ,'1983','1984' ,'1985','1986' ,'1987','1988' ,'1989','1990' ,'1991','1992' ,'1993','1994' ,'1995','1996' ,'1997','1998' ,'1999',
'2000' ,'2001','2002' ,'2003' ,'2004','2005' ,'2006' ,'2007','2008' ,'2009' ,'2010','2011' ,'2012' ,'2013','2014' ,'2015', '2016','2017' ]


class EduRow extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            instName : "",
            degree : "",
            from : "",
            to : "",
            labelWidth : 0,
        }
    }

    componentDidUpdate(){
        if(this.props.Submit){
         
            this.props.Submitfunc(this.state )
        }
    }

    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      }

    render() { 
    
        const {classes} = this.props
        return ( 
            <div style={{width : '30%',display:'flex' , flexDirection : 'column'}}>
                 <TextField
                        id="outlined-name"
                        label="Institute Name"
                        value={this.state.instName}
                        onChange={evt => {
                            this.setState({
                                instName : evt.target.value
                            })
                        }}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    
                    
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-degree-simple"
                        >
                        Degree
                        </InputLabel>
                        <Select
                            value={this.state.degree}
                            onChange={evt => {
                                this.setState({
                                    degree : evt.target.value
                                })
                            }}
                            input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-degree-simple"
                            />
                            }
                        >
                       
                        <MenuItem value={'B.E'}>B.E</MenuItem>
                        <MenuItem value={'Btech'}>Btech</MenuItem>
                        <MenuItem value={'MSC'}>MSC</MenuItem>
                        <MenuItem value={'MS'}>MS</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-from-simple"
                        >
                        From
                        </InputLabel>
                    <Select
                            value={this.state.from}
                            onChange={evt => {
                                this.setState({
                                    from : evt.target.value
                                })
                            }}
                            input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-from-simple"
                            />
                            }
                        >
                        {from.map(from => (
                            <MenuItem
                                key={from}
                                value={from}
                        
                            >
                            {from}
                            </MenuItem>
                            ))}
                    </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                         <InputLabel
                                ref={ref => {
                                this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-to-simple"
                        >
                        To
                        </InputLabel>
                       <Select
                            value={this.state.to}
                            onChange={evt => {
                                this.setState({
                                    to : evt.target.value
                                })
                            }}
                            input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-to-simple"
                            />
                            }
                        >
                        {from.map(from => (
                            <MenuItem
                                key={from}
                                value={from}
                        
                            >
                            {from}
                            </MenuItem>
                            ))}
                    </Select>
                    </FormControl>
                   
                   

                    
            </div>
        );
    }
}

EduRow.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(EduRow); 
