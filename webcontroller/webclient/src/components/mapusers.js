import React ,{Component} from 'react';
import {Segment,Button,Label, Icon, Form,Checkbox,Input, FormField,Radio} from "semantic-ui-react";
import DisplayPage from "./DisplayPage";
import Save from "./save";
import axios from "axios";

var mapusersStyle={
"backgroundColor": "#3f729b",
"width":  "100%",
"height":"auto",
"boarder-left":"10px",
"padding":"10px",

}

var createmapusersStyle={


    backgroundColor: "#C9D1F0",
    paddingTop:"20px",
    paddingLeft: "30px",
    paddingBottom:"30px",
    paddingRight:"30px",
    fontFamily: "Arial",
    width: "400px",
    height: "auto",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    display:"block",

    }
// #C9D1F0
var CustomAttributesStyle={

    boarderRadius:"25px",

    backgroundColor: "#C9D1F0",
    padding: "50px",
    fontFamily: "Arial",
    width: "300px",

    position: "absolute",
    left: "50%",
    top: "105%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    overflow:"hidden",

}
class Mapusers extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            CreateUserMapVar:false,
            CustomAttributesVar:false,
            ImportUserMapVar:false,
            userData:[],
            MatchType:"",
            LDAPAttributes:"",
            eDirAttribute:"",
            actDirAttribute:"",
            usermapname:"",
        };
        this.enableCreateUserMap=this.enableCreateUserMap.bind(this);
        this.enableCustomAttributes=this.enableCustomAttributes.bind(this);
        this.enableImportUserMap=this.enableImportUserMap.bind(this);
        this.showmapuserform=this.showmapuserform.bind(this);
        this.cancelmapuserform=this.cancelmapuserform.bind(this);
        this.savemapuserform=this.savemapuserform.bind(this);
        this.listUserMaps=this.listUserMaps.bind(this);
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange2=this.handleChange2.bind(this);
        this.importform=this.importform.bind(this);
        this.createBlur=this.createBlur.bind(this);
        this.goBack=this.goBack.bind(this);
    }

    componentDidMount()
    {
        fetch("http://localhost:8080/api/users").then(response => response.json()).then(data => this.setState({userData: data}));
    }
enableCreateUserMap(event)
{   event.preventDefault();

    console.log("Came to enable usermap");
    this.setState(
        {CreateUserMapVar:true,
         ImportUserMapVar:false}
        );
}
enableCustomAttributes(event,{value})
{
    // this.setState({
    //     CustomAttributesVar:true
    // });
    event.preventDefault();
    if(document.getElementById("CustomAttributesId").style.display==="block")
    {
        document.getElementById("CustomAttributesId").style.display="none";
    }else{
    document.getElementById("CustomAttributesId").style.display="block";}
    this.setState({
      LDAPAttributes:value
    })
}
enableImportUserMap(event)

{   event.preventDefault();
    console.log("came to import user map");
    this.setState({
        ImportUserMapVar:true,
        CreateUserMapVar:false
    });
}
handleChange1(event,{value})
{
  event.preventDefault();

  this.setState({
    MatchType:value
  })


}

handleChange2(event,{value})
{
  event.preventDefault();

  this.setState({
    LDAPAttributes:value
  })
}
showmapuserform(event)
{
    event.preventDefault();

    let mapuserattr={

        MatchType:this.state.MatchType,
        LDAPAttributes:this.state.LDAPAttributes,
        actDirAttribute:this.state.actDirAttribute,
        eDirAttribute:this.state.eDirAttribute,
        usermapname:this.state.usermapname,


    }

    // this.state.eDirAttribute=document.getElementById("m7").value;
    // this.state.actDirAttribute=document.getElementById("m8").value;
    // this.state.usermapname=document.getElementById("usermapname").value;

    this.setState({
      eDirAttribute:document.getElementById("m7").value,
      actDirAttribute:document.getElementById("m8").value,
      usermapname:document.getElementById("usermapname").value
    })

    mapuserattr.MatchType=this.state.MatchType;
    mapuserattr.LDAPAttributes=this.state.LDAPAttributes;
    mapuserattr.eDirAttribute=this.state.eDirAttribute;
    mapuserattr.actDirAttribute=this.state.actDirAttribute;
    mapuserattr.usermapname=this.state.usermapname;



    console.log(mapuserattr);

    fetch("http://localhost:8080/api/usermap", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mapuserattr),
        })
        .then(response => response.json());



   setTimeout(() => {
     this.props.history.push("/mapuserspage/"+mapuserattr.usermapname);

   }, 30);

}





// save map user Form


goBack(event)
{
  event.preventDefault();
  this.props.history.push("/displaypage");
}

savemapuserform(event)
{
    event.preventDefault();

    let mapuserattr={

        MatchType:this.state.MatchType,
        LDAPAttributes:this.state.LDAPAttributes,
        actDirAttribute:this.state.actDirAttribute,
        eDirAttribute:this.state.eDirAttribute,
        usermapname:this.state.usermapname,


    }

    // this.state.eDirAttribute=document.getElementById("m7").value;
    // this.state.actDirAttribute=document.getElementById("m8").value;
    // this.state.usermapname=document.getElementById("usermapname").value;


    this.setState({
      eDirAttribute:document.getElementById("m7").value,
      actDirAttribute:document.getElementById("m8").value,
      usermapname:document.getElementById("usermapname").value
    })


    mapuserattr.MatchType=this.state.MatchType;
    mapuserattr.LDAPAttributes=this.state.LDAPAttributes;
    mapuserattr.eDirAttribute=this.state.eDirAttribute;
    mapuserattr.actDirAttribute=this.state.actDirAttribute;
    mapuserattr.usermapname=this.state.usermapname;

    console.log(mapuserattr);

    fetch("http://localhost:8080/api/usermap", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(mapuserattr),
        })
        .then(response => response.json());



   setTimeout(() => {
     this.props.history.push("/mapuserspage/save/"+mapuserattr.usermapname);

   }, 30);

}





cancelmapuserform()
{

    this.setState(
        {CreateUserMapVar:false,
         ImportUserMapVar:false}
        );
        setTimeout(()=>{
          document.getElementById("mapuserDiv").style.filter="blur(0px)";
        },30)
}

listUserMaps()
{
  setTimeout(() => {
    this.props.history.push("/mapuserspage/list/listUserMaps/");

  }, 30);
}


importform()
{
  console.log("import form")
  var tempdict2={"filedata":"hello"};;
  var importusermapname=document.getElementById("importusermapname").value;
  console.log(importusermapname)
  var file = document.getElementById("usermapfile").files[0];
  if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          console.log( evt.target.result);
          tempdict2["filedata"]=(evt.target.result).toString();
          console.log(tempdict2);
          var tempurl="http://localhost:8080/api/usermap/import/"
          fetch(tempurl.concat(importusermapname), {
                  method: "POST",
                  headers: {
                      "content-type": "application/json",
                  },
                  body: JSON.stringify(tempdict2)
              }).then(response => response.json());


      }
      reader.onerror = function (evt) {
        console.log("error reading file");
      }
  }
window.alert("User Map Imported");


}

createBlur()
{
  console.log("came to create blur")
  setTimeout(()=>{
    document.getElementById("mapuserDiv").style.filter="blur(5px)";
  },30)

}




        render()
        {
            const CustomAttributes=(

                <div style={CustomAttributesStyle} >
                <br/>
                <Form>
                <Form.Field>
                <Input name="eDirAttribute" placeholder="eDirAttribute" size="small"/>
                </Form.Field>
                 <Form.Field>
                <Input name="actDirAttribute" placeholder="actDirAttribute" size="small"/>
                </Form.Field>
                </Form>
                </div>
            )
            const ImportUserMap=(

                <div style={createmapusersStyle}>
                    <Form>
                        <Form.Field>
                            <Input type="file" placeholder="Only XML files" id="usermapfile" name="usermapfile" />
                        </Form.Field>
                        <Form.Field>
                            <Input type="text" name="usermapname" id="importusermapname"placeholder="Name for UserMap"/>
                        </Form.Field>
                        <Button color="black" onClick={this.importform}>Import</Button>
                        <Button color="red" onClick={this.cancelmapuserform} >Cancel</Button>
                    </Form>
                </div>
            )
            const createUsermap=(


                <div style={createmapusersStyle} id="CreateUserMapID">
                    <br/>

                     <Form>
                     <Form.Field>
                     <label>User Map Name</label>
                     <Input type="text" placeholder="usermapname" id="usermapname" size="small"/>
                     </Form.Field>

                     <h2>Match type</h2>
                     <br />

                         <Form.Field>
                         <Radio toggle label="User to User"  name="RadioGroup1" value="UsertoUser"   onChange={this.handleChange1}></Radio>
                         </Form.Field>


                         <Form.Field>
                         <Radio toggle label="Group to Group" name="RadioGroup1" value="GrouptoGroup"  onChange={this.handleChange1} ></Radio>
                         </Form.Field>

                         <Form.Field>
                         <Radio toggle label="Container to Group"  name="RadioGroup1" value="ContainertoGroup"  onChange={this.handleChange1} ></Radio>
                         </Form.Field>
                         <br/>
                         <h2>LDAP Attributes </h2>
                         <br/>
                         <Form.Field>
                         <Radio toggle label="CN to CN" name="RadioGroup2" value="CNtoCN"  onChange={this.handleChange2}></Radio>
                         </Form.Field>


                         <Form.Field>
                         <Radio toggle label="CN to SAM" name="RadioGroup2" value="CNtoSAM"  onChange={this.handleChange2} ></Radio>
                         </Form.Field>

                         <Form.Field>
                         <Radio  toggle label="Custom Attributes" name="RadioGroup2"  value="CustomAttributes"  onChange={this.enableCustomAttributes} />
                         </Form.Field>

                         <div id="CustomAttributesId" style={{display:"none"}}>
                            <Form.Field>
                            <Input name="eDirAttribute" placeholder="eDirAttribute"  id="m7" size="small"/>
                            </Form.Field>
                            <Form.Field>
                            <Input name="actDirAttribute" placeholder="actDirAttribute" id="m8" size="small"/>
                            </Form.Field>
                            </div>

                         <br/>
                         <Button color="black" onClick={this.showmapuserform}>Show</Button>
                         <Button primary onClick={this.savemapuserform}>Save</Button>
                         <Button color="red" onClick={this.cancelmapuserform} >Cancel</Button>




                     </Form>


                </div>


            )
                const Mapuser=(


                        <div style={{filter:"blur(0px)"}} id="mapuserDiv">

                            <Segment style={{backgroundColor:"#3f729b"}}>
                            <div>
                                <Button.Group>
                                    <Button  size="large" floated="left" onClick={this.enableCreateUserMap}><Icon name="add"  />Create</Button>
                                    <Button.Or></Button.Or>
                                    <Button size="large"  onClick={this.enableImportUserMap}><Icon name="arrow alternate circle down" /> Import</Button>

                                </Button.Group>
                                <Button size="large" floated="right" onClick={this.goBack}><Icon name= "backward"/></Button>
                                <Button size="large" floated="right" onClick={this.listUserMaps}><Icon name="list"/>UserMaps</Button>

                                <br/>
                            </div>



                            </Segment>



                        </div>
                    )



            return (<div>
                    {/* <DisplayPage/>
                    <br/> */}
                    {Mapuser}
                    <br/>
                    <br/>
                    {this.state.CreateUserMapVar?this.createBlur():null}
                    {this.state.CreateUserMapVar?createUsermap:null}
                    {this.state.CustomAttributesVar?CustomAttributes:null}
                    {this.state.ImportUserMapVar?this.createBlur():null}
                    {this.state.ImportUserMapVar?ImportUserMap:null}

                    </div>

                )

        }

}
export default Mapusers
