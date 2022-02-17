    import React, { Component } from 'react';
    import SimpleCard from './SimpleCard';


    class Emplist extends Component {
        constructor(props)
        {
            super(props);
            this.state={
                emplist:[]
            }
        }
    
        componentDidMount=()=>{
            console.log("hiitttting");
            fetch('http://localhost:8080/api/search/' + this.props.result)
            .then(response => {
                return response.json();
            }).then(data =>{
                console.log(data)
                this.setState({emplist:data})
                console.log("hit"+this.props.result);
            });
        }

        componentWillReceiveProps=(newprops)=>{
            console.log("willupdate");
            fetch('http://localhost:8080/api/search/' + newprops.result)
            .then(response => {
                return response.json();
            }).then(data =>{
                this.setState({emplist:data})
                console.log("hit"+newprops.result);
            });
        }

        render() { 
            
            let allemps = this.state.emplist;
            return ( <div>
                    {allemps.map(emp => (
                            <SimpleCard empObj = {emp} key = {emp.id} history = {this.props.history}/>
                    ))}
            </div>
            )
        }
    }
    
    export default Emplist;