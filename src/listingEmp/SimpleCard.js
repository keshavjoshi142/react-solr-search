    import React from 'react';
    import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import Card from '@material-ui/core/Card';
    import CardActions from '@material-ui/core/CardActions';
    import CardContent from '@material-ui/core/CardContent';
    import Button from '@material-ui/core/Button';
    import Typography from '@material-ui/core/Typography';
    import Avatar from '@material-ui/core/Avatar';
    import classNames from 'classnames';



    const styles = {
      card: {
        minWidth: 275,
        innerHeight : 100
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },

      MuiCardContent:{
          backgroundColor : "blue" 
      },
      avatar: {
        margin: 10,
      },
      bigAvatar: {
        width: 100,
        height: 100,
      },
    };

    
    function SimpleCard(props) {

          const { classes, empObj, history } = props;
          const bull = <span className={classes.bullet}>•</span>;
    
          const handleClick=()=>{
                  const {empObj , history  } = props;
                  fetch('http://localhost:8080/api/hit/'+ empObj.userName)
                  .then(res=>{
                      history.push({
                          pathname: '/ProfileView',
                          state: { data:empObj }
                      })
                    })
            }
      
           return (
                  <Card className={classes.card} style = {{display : 'flex' }}>
                  <Avatar
                      alt="Adelle Charles"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                      <div>
                      <CardContent>
                          <Typography className={classes.title} color="textSecondary" style={{fontSize:"30px",color:"black",textTransform:"uppercase", fontWeight:"bold"}}>
                            {empObj.name}
                          </Typography>
                          <Typography variant="headline" component="h1" style = {{fontSize:"10px"}}>
                          {
                            empObj.skills.map((skill,index)=>
                                            <div  key={index}>{bull}{skill.split(" ")[0]+"("+skill.split(" ")[1]+")"}</div>
                                              )
                            }
                          </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                              {empObj.emailId}
                          </Typography>
                          </CardContent>
                          <CardActions>
                          <Button size="small" onClick = {event=>handleClick(event)} >View Profile</Button>
                        </CardActions>
                      </div>
          
                  </Card>
              );
    }

    SimpleCard.propTypes = {
      classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles)(SimpleCard);