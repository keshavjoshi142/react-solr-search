import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Icon, Avatar, Row, Col, Tag, Button } from "antd";
const { Meta } = Card;

const bio = "I am awesome in all ways."

const educationList = [
  {
    institute: "IIIT Bhubaneswar",
    educationLevel: "Bachelors",
    startDate: "Jan 2016",
    endDate: "Jan 2020",
    major: "CSE"
  },
  {
    institute: "IIT Delhi",
    educationLevel: "Bachelors",
    startDate: "Jan 2016",
    endDate: "Jan 2022",
    major: "Civil"
  },
  {
    institute: "CET Bhubaneswar",
    educationLevel: "Bachelors",
    startDate: "Jan 2015",
    endDate: "Jan 2024",
    major: "ETC"
  }
];

const workList = [
  {
    jobTitle: "Intern",
    employer: "Dell",
    startDate: "Jan 2016",
    endDate: "May 2016",
    location: "Bhubaneswar",
    description: "I worked on web dev"
  },
  {
    jobTitle: "Web Developer",
    employer: "Mealrobs",
    startDate: "Jan 2016",
    endDate: "May 2016",
    location: "Bhubaneswar",
    description: "I worked on app of Mealrobs"
  },
  {
    jobTitle: "Intern",
    employer: "Dell",
    startDate: "Jan 2016",
    endDate: "May 2016",
    location: "Bhubaneswar",
    description: "I worked on web dev"
  }
];

const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "React JS",
  "Node JS",
  "Database Management"
];

const languages = [
  "Odia",
  "English",
  "Hindi"
];

const projects = [
{
  name : "Attendance Manager",
  startDate: "Jan 2016",
  endDate: "May 2016",
  description: `Built an attendance manager webapp using Node JS in server side, Postgres as database, and HTML CSS Bootstrap in front-end.
The app records the time table and subjects of the user first. 
Then it records the attendance in each subject of the user everyday by asking the user whether the user has attended the class or bunked the class or the class was off . It displays the percentage of classes in which the user is present day-wise and subject-wise.`,
url:"https://github.com/geekysrm"},
{
  name: "Twitter Retweet/Follow/Like Bot",
  startDate: "Jan 2016",
  endDate: "May 2016",
  description: `It is a twitter bot built on Node.JS which will do the following 3 tasks for a particular keyword(s) which appears in someone's tweet`,
  url: "https://github.com/geekysrm"
}, {
  name: "Attendance Manager",
  startDate: "Jan 2016",
  endDate: "May 2016",
  description: `Built an attendance manager webapp using Node JS in server side, Postgres as database, and HTML CSS Bootstrap in front-end.
The app records the time table and subjects of the user first. 
Then it records the attendance in each subject of the user everyday by asking the user whether the user has attended the class or bunked the class or the class was off . It displays the percentage of classes in which the user is present day-wise and subject-wise.`,
  url: "https://github.com/geekysrm"
}
];

const courses = [
  { name:"HTML5 Web Design by TheNewBoston",
  number:"AFDSSDDS4654"},
  {
    name: "Introduction to Linux - EDX",
    number: "AFDSSDDS4654"
  },
  {
    name: "Network Management (Nettech) at IIT Kharagpur",
    number: "AFDSSDDS4654"
  }
];

const skillDelete = (e) => {
  console.log(e);
  // delete it from server and reducer
}

const languageDelete = (e) => {
  console.log(e);
  // delete it from server and reducer
}





class EditProfile extends React.Component {
    
    render() { 
        const {data} = this.props.location.state;
        console.log(data)
        const education = []
        const projects = []

        for(var i=0 ; i<data.instName.length ; i++){
          education.push({
          instName : data.instName[i],
          degree : data.degree[i],
          from : data.eduFrom[i],
          to : data.eduTo[i],
          })
      }
      for(var i=0 ; i<data.projectName.length ; i++){
        projects.push({
        projectName : data.projectName[i],
        from : data.projFrom[i],
        to : data.projTo[i],
        description : data.description[i],
        })
      }

        return (  <div>
            <Card>

              <Meta
                avatar={
                  <Avatar
                    style={{ width: 200, height: 200 }}
                    shape="square"
                    size="large"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                }
                title={
                  <div>
                    <br />
                    <h2><b>{data.name}</b></h2>
                  </div>
                }
                description={<h4><i>{data.emailId}</i></h4>}
              />
            </Card>
            <br />
            <div style={{ background: "#ECECEC", padding: "12px", width: "100%" }}>
              <Row gutter={16}>
                <Col span={16}>
                  <div>
                    <Card title={<b>Education</b>} bordered={false}>
                      <div>
                        {education.map(education => (
                          <div>
                      
                            <h4>
                              <b>{education.instName}</b>
                              <Button style={{ float: "right", border:"none" }}  icon="edit" />
                            </h4>
                            
                           
                            <h4>
                              {education.degree}
                            </h4>
                            <h4>
                              {education.from} - {education.to}
                            </h4>
                            <br />
                          </div>
                        ))}
                        <hr
                          style={{
                            width: "90 %",
                            border: 0,
                            height: "1px",
                            background: "#000",
                            opacity: 0.2
                          }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <a >
                            <b>Add Education</b>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <br />
                  <div>
                    <Card title={<b>Projects</b>} bordered={false}>
                      <div>
                        {projects.map((project, index) => (
                          <div key = {index}>
                            <h4>
                              <b>{project.projectName}</b>
                              <Button style={{ float: "right", border: "none" }} icon="edit" />
                            </h4>
                            <h4>
                              {project.from} - {project.to}
                            </h4>
                            <h5 style = {{wordWrap : 'break-word' }}>{project.description}</h5>
                            <h5><a href={project.url} target="_blank">View Project</a></h5>
                            <br />
                          </div>
                        ))}
                        <hr
                          style={{
                            width: "90 %",
                            border: 0,
                            height: "1px",
                            background: "#000",
                            opacity: 0.2
                          }}
                        />
                        <div style={{ textAlign: "center" }}>
                          <a>
                            <b>Add Project</b>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <br />
                
                </Col>
                <Col span={8}>
                <div>
                  <Card title={<b>Skills</b>} bordered={false}>
                    <div>
                      {data.skills.map(skill => (
                              <Tag style={{marginBottom:"5px"}} closable onClose={skillDelete} color="#2db7f5"> {skill} </Tag>  
                      ))}
                      <hr
                        style={{
                          width: "90 %",
                          border: 0,
                          height: "1px",
                          background: "#000",
                          opacity: 0.2
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <a>
                          <b>Add Skill</b>
                        </a>
                      </div>
                    </div>
                  </Card>
                  </div>
                  <br />
                  
                 
  
                </Col>
              </Row>
            </div>
          </div> );
    }
}
 
export default EditProfile;