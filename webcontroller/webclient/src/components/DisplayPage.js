import React,{Component} from "react";

import {Button,Image,Menu,Dropdown,Icon,Segment,Message,List,Transition} from "semantic-ui-react";

import {withRouter} from "react-router-dom";

import URMpage from "../images/urm_welcome_page.png"
var SegmentStyle={
 padding:"20px",
 marigin:"20px",
 width:"1100px",
 left:"9%"

}
class DisplayPage extends Component{

constructor(props){
  super(props);
   this.state={
     userObj:{},
     animation:"slide right",
     duration:2000,
     visible:false
   }
  this.showMapUsersDisplay=this.showMapUsersDisplay.bind(this);
  this.showMapRightsDisplay=this.showMapRightsDisplay.bind(this);
  this.showViewRightsDisplay=this.showViewRightsDisplay.bind(this);
  this.showSettingsPage=this.showSettingsPage.bind(this);
  this.gotoLogin=this.gotoLogin.bind(this);
}
componentDidMount()
{
  fetch("http://localhost:8080/api/getLoginusername/")
      .then(response => response.json()).then(data=> this.setState({
        userObj:data
      }));

  this.setState((prevState) => ({ visible: !prevState.visible }))
}

showMapUsersDisplay(e)
 {
  e.preventDefault();
   setTimeout(() => {
     this.props.history.push("/mapuserspage")
   }, 30);
   console.log("came to show display");

 }

 showMapRightsDisplay(e)
 {e.preventDefault();
  setTimeout(() => {
    this.props.history.push("/maprightspage")
  }, 30);
 }

 showViewRightsDisplay(e)
 {e.preventDefault();
   setTimeout(() => {
    this.props.history.push("/viewrightspage")
  }, 30);
 }


showSettingsPage(e)
 {e.preventDefault();
   setTimeout(() => {
    this.props.history.push("/settingspage")
  }, 30);
 }
gotoLogin(event)
{
  event.preventDefault();
  setTimeout(() => {
   this.props.history.push("/")
 }, 30);
}

render()
{
  const { animation, duration, visible } = this.state
  return(
    <div>

   <Menu inverted   size="huge" style={{backgroundColor:"#3f729b",color:"white"}}>
         <Menu.Item>
          <Button color="instagram" type="button" onClick={this.showMapUsersDisplay} size="huge" >Map Users</Button>
        </Menu.Item>
        <Menu.Item>
        <Button color="instagram" type="button" onClick={this.showMapRightsDisplay}>Map Rights</Button>
        </Menu.Item>
        <Menu.Item>
        <Button color="instagram" type="button" onClick={this.showViewRightsDisplay} floated="left">View Rights</Button>
        </Menu.Item>

        <Menu.Item position="right">
          <Button color="instagram" type="Button" onClick={this.showSettingsPage}>Settings</Button>
        </Menu.Item>

        <Menu.Item >
        <Button color="instagram" animated='fade' onClick={this.gotoLogin}>
        <Button.Content visible > <Icon name="user" />{this.state.userObj["username"]}</Button.Content>
        <Button.Content hidden  position="left"><Icon name="log out" />Logout</Button.Content>
        </Button>
        </Menu.Item>
   </Menu>

   <Transition.Group animation={animation} duration={duration}>
   {visible && (


   <Segment color="black" size="large" style={SegmentStyle}>
    <h3 style={{textAlign:"center"}}>Mapping Users</h3><br/>
     In an NSS AD environment, OES servers are joined to an Active Directory domain to provision AD
  users and groups native NSS resources access. To aid this, identities from Active directory will have
  to be mapped with identities on eDirectory and assigned the same rights as that of the eDirectory
  identities. NURM helps in creating this identity map, which is called a “user map” . User maps are
  used to assign rights to AD identities on the NSS resources.
</Segment>
        )}
  </Transition.Group>

<Transition.Group animation="scale" duration={duration}>
{visible && (
<Segment color="black" size="large" style={SegmentStyle}>
 <h3 style={{textAlign:"center"}}>Mapping Rights</h3><br/>
 Using this feature, you can map rights to AD users on a specific NSS volume. While doing so, you
can choose to remove eDirectory trustees from the NSS file system and migrate the eDirectory IDs
 to AD users.

</Segment>
)}
</Transition.Group>
<Transition.Group animation='slide left' duration={duration}>
{visible && (
<Segment color="black" size="large" style={SegmentStyle}>
 <h3 style={{textAlign:"center"}}>Viewing Rights</h3><br/>
 Using this feature, an administrator can view the explicit rights of both eDirectory and Active Directory
users on the selected volume. This is the only tool that allows the administrators to view the rights of
both AD and eDirectory users in a consolidated view.

</Segment>
)}
</Transition.Group>


<Transition.Group animation='zoom' duration={duration}>
{visible && (
<Segment color="black" size="large" style={SegmentStyle}>
 <h3 style={{textAlign:"center"}}>Settings</h3><br/>
  Click Settings at the top right to go to NURM Settings page.<br/>
  It includes:
  <List bulleted>
  <List.Item>Language</List.Item>
    <List.Item>LogLevel</List.Item>
    <List.Item>Contextless Login for eDirectory</List.Item>
    <List.Item>IDM or UserMap</List.Item>
  </List>

</Segment>
)}
</Transition.Group>



    </div>
  )
}
}

export default DisplayPage
