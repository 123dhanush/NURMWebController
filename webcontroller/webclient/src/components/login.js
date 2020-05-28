import React,{Component} from 'react';
import "../App.css";

import {Button, Icon, Form, Label ,Divider,Input,Message,Confirm} from "semantic-ui-react";
import Mapusers from './mapusers';
import DisplayPage from "./DisplayPage"
import { Redirect } from 'react-router'
var bcrypt = require('bcryptjs');





var loginStyle={
    "background-color":"red"
  }

const mystyle = {
    color: "white",
    backgroundColor: "#26338B ",
    padding: "50px",
    fontFamily: "Arial",
    width: "300px",
    height: "330px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
  };

class Login extends Component{

constructor(props)
{
  super(props);
  this.state={
    username:'',
    password:'',
    serverIP:'',
    Loggedin:false,
    returnValue:"",
    open:false

  }

this.onChange=this.onChange.bind(this);
this.SubmitForm=this.SubmitForm.bind(this);
this.handlecancel=this.handlecancel.bind(this);
this.handleconfirm=this.handleconfirm.bind(this);
}
onChange(e)
{
  this.setState({
    [e.target.name]:e.target.value
  });
}
SubmitForm(e)
{
  var ciphertext;
  var loginAttr={};

  var hash=""
  e.preventDefault();
  console.log("Submit form");

  const {username,password,serverIP}=this.state;
  // ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), 'hello').toString();
  // loginAttr.passkey="hello";
  // loginAttr.ciphertext=ciphertext;


var rounds=5;

  loginAttr.username=username;


 var Pvalue=false;
 var returnlist={}

  console.log(loginAttr);

  fetch("http://localhost:8080/api/loginDecrypt/".concat(username))
      .then(response => response.json()).then(data=> this.setState({
        returnValue:data
      }));



// this.setState({
//   returnValue:"$2a$05$E1VwOR0KxURrSBB8Io4suunWLwIOU0bDC6BAP7tEdNAr/EZtt64sa"
// })
setTimeout(()=>{
  console.log(this.state.returnValue);
  returnlist=this.state.returnValue;
  console.log(returnlist["password"]);
  bcrypt.compare(password,returnlist["password"], function(err, isMatch) {
    if (err) {
      throw err
    } else if (!isMatch) {
      Pvalue=false
    } else {
      Pvalue=true
    }
   console.log(Pvalue);
  });
},300)


setTimeout(()=>{
  console.log(Pvalue);
  if( Pvalue==true && serverIP==="10.71.100.49")
  {console.log("Submit form");
    this.setState({
      Loggedin:true
    });
  }
  else {
    // window.alert("invalid username or password");

    this.setState({
      open:true
    })
 //    <Message
 //   error
 //   header='Login Unsuccessfull'
 //   content= 'invalid password or username'
 //
 // />
  }
},500)





}


handlecancel()
{
  this.setState({
    open:false
  })
}

handleconfirm()
{
  this.setState({
    open:false
  })
}

render()
{


      if(this.state.Loggedin)
      {

        console.log("Redirect to displaypage")
        return <Redirect to="/displaypage"/>
      }

    return(
      <div>

         <Form style={mystyle} onSubmit={this.SubmitForm}>
         <Form.Field>
          <h3 style={{textAlign:"center"}}>NURM</h3>
        <Input type="text" icon='user' iconPosition='left' placeholder='Enter Username' name="username" value={this.state.username} onChange={this.onChange}></Input>
        </Form.Field>
        <Form.Field>
        <Input type="password" icon='lock' iconPosition='left' placeholder='Enter Password'name="password" value={this.state.password} onChange={this.onChange}></Input>
        <br />
        </Form.Field>

         <Form.Field><Input type="text" icon="server" iconPosition='left' placeholder='Enter server IP' name="serverIP" value={this.state.serverIP} onChange={this.onChange}/><br/>
         </Form.Field>
        <Button  type="submit" content='Primary' primary inverted color="blue" > <Icon name="sign in"/> LOGIN</Button>


        <br/>
        </Form>
        <Confirm style={{
          left:"30%",
          top:"0%",
          position:"fixed"
        }}
        open={this.state.open}
        header='Invalid username or Password'
        onCancel={this.handlecancel}
        onConfirm={this.handleconfirm}
        size="tiny"
         />

        </div>

    )

}

}

export default Login;
