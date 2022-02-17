      import React from 'react';
      import Autosuggest from "react-autosuggest";
      import Emplist from './listingEmp/Emplist';
      import { withStyles } from '@material-ui/core/styles';
      import match from 'autosuggest-highlight/match';
      import parse from 'autosuggest-highlight/parse';
      import MenuItem from '@material-ui/core/MenuItem';
      import PropTypes from 'prop-types';
      import Paper from "@material-ui/core/Paper";
      import Button from '@material-ui/core/Button';
      import AuthService from './login/AuthService';
      import Menu from '@material-ui/core/Menu';


      const styles = theme => ({
        root: {
          height: 250,
          flexGrow: 1,
        },
        container: {
          position: 'relative',
        },
        suggestionsContainerOpen: {
          position: 'absolute',
          zIndex: 1,
          marginTop: theme.spacing.unit,
          left: 0,
          right: 0,
        },
        suggestion: {
          display: 'block',
        },
        suggestionsList: {
          margin: 0,
          padding: 0,
          listStyleType: 'none',
        },
        divider: {
          height: theme.spacing.unit * 2,
        },

        paper1 : {
          display : 'block',
          width : "40%",
          position : 'relative'
        },

        paper2 : {
          margin : '0 auto',
          display : 'block',
          width : "40%",
          position : 'relative'
        },
      })
      


      const getSuggestions = value => {

              return fetch('http://localhost:8080/api/autocomplete/'+value)
              .then(response => {
                  return response.text();
              });
            }

      const getSuggestionValue = suggestion => suggestion;

      const renderSuggestion = suggestion => (
        <span>{suggestion}</span>
      );


      class Home extends React.Component {

        constructor()
        {
          super();

          this.state = {
            value:"",
            suggestions:[],
            result:"",
            isStyle:false,
            anchorEl: null,
          };

          this.Auth = new AuthService();
        }
        

        componentDidMount()
        {
          getSuggestions(this.value); 
        }

        onChange = (event , {newValue}) =>{
          this.setState({
            value:newValue
          });
        };

        renderSuggestionsContainer = ({ containerProps, children, query }) => (
          
          <Paper {...containerProps} style = {this.state.isStyle ? ({
            transform : 'translate(0)',
            display : 'block',
            width : "40%",
            }):
              ({
                transform : 'translate(400px,200px)',
                display : 'block',
                width : "40%",
                }) } >
          {children}
        </Paper>
        );
      
        renderSuggestion = (suggestions , {query , isHighlighted})=> {
          const matches = match(suggestions, query);
          const parts = parse(suggestions, matches);
          
          console.log(matches)

          return (
            <div style = {this.state.isStyle ? ({
                                          transform : 'translate(0)',
                                          display : 'block',
                                          width : "40%",
                                        }):
                                            ({
                                              transform : 'translate(0)',
                                              display : 'block',
                                              width : "40%",
                                            })  }>
              <MenuItem selected={isHighlighted} component="div" >
              <div>
                {parts.map((part, index) => {
                return part.highlight ? (
                  <span key={String(index)} style={{ fontWeight: 'bold' }}>
                    {part.text}
                  </span>
                ) : (
                  <strong key={String(index)} style={{ fontWeight: 'normal' }}>
                    {part.text }
                  </strong>
                );
              })}
            </div>
          </MenuItem>
            </div>
          
          )
        }

        onSuggestionsFetchRequested = ({value}) => {
        
        
        getSuggestions(value).then(data =>{
          
          var dataArray=[];
          var newdata = JSON.parse(data); 
        
          for(var i in newdata){
              dataArray.push(newdata[i]);
          }
          this.setState({
            suggestions : dataArray
          });
        });
        };

        onSuggestionsClearRequested = () =>{
          this.setState({
            suggestions : []
            });
        };
      
        onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
        

          this.setState({
            result : suggestion,
            isStyle : true
          })
      
        };

        handleClick = event => {
          this.setState({ anchorEl: event.currentTarget });
        };
      
        handleClose = () => {
          this.setState({ anchorEl: null });
        };

        handleEditProfile = () =>{
          fetch('http://localhost:8080/api/employee/'+ localStorage.getItem('username'))
          .then(res=>{
            return res.json()    
          }).then(res=>{
            this.props.history.push({
              pathname: '/editprofile',
              state: { data:res}
          })
          })
        }

        render() {
          const {value , suggestions , anchorEl} = this.state;
          const {classes } = this.props
          const inputProps1 = {
            placeholder : "Search",
            value,
            onChange: this.onChange,
            style :{ 
                      transform : 'translate(400px,200px)',
                      boxShadow: '4px -3px 11px 0px black',
                      display : 'block',
                      width : "40%",
                      fontSize:'30px',
                      fontWeight : 'bold',
                      transition : 'all .5s ease-in-out'
                    }
          };
          const inputProps2= {
            placeholder : "Search",
            value,
            onChange: this.onChange,
            style :{  
                    boxShadow: '4px -3px 11px 0px black',
                    transform : 'translate(0)',
                    display : 'block',
                    width : "40%",
                    fontSize:'30px',
                    fontWeight : 'bold',
                    transition : 'all .5s ease-in-out'
                  }
          };

          return (

            <div>
                <div>
                  {this.Auth.loggedIn() ? 
                          <div>
                          <Button
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style = {{position:'absolute',
                              zIndex:'1',
                              top:'0',
                              right:'0',}}
                          >
                            Welcome {localStorage.getItem('username')}
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                          
                          >
                            <MenuItem onClick={this.handleEditProfile}>My Profile</MenuItem>
                            <MenuItem onClick={()=>{
                              this.Auth.logout()
                              localStorage.removeItem('username')
                              this.forceUpdate()
                            }}>Logout</MenuItem>
                          </Menu>
                        </div> :  <Button
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={()=>{
                              this.props.history.push('/')
                            }}
                            style = {{ position : 'absolute',
                            zIndex:'1',
                            top:'0',
                            right:'0',}}
                          >
                            SignIN
                          </Button>}
                
                </div>
                <div>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={(this.state.isStyle)?(inputProps2):(inputProps1)}
                  onSuggestionSelected={this.onSuggestionSelected}
                  renderSuggestionsContainer = {this.renderSuggestionsContainer}
                  id="Search-bar"
                  theme={{
                  container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                    }}
                />
                {(this.state.result!=="")?(  <Emplist result = {this.state.result} history = {this.props.history} style = {{position : 'absolute'}}/>
                  ):(null)}
              </div>
            </div>
          
          );
        }
      }

      Home.propTypes = {
        classes: PropTypes.object.isRequired,
      };

      export default withStyles(styles)(Home);

