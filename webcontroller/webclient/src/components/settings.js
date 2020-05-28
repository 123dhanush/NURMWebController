import React,{Component} from "react";
import {Form, Select, FormField, Label,Radio,Segment,Button,Icon,Confirm} from "semantic-ui-react";


const langOptions=[
        {value:"English",text:"English",flag:"us"},
        {value:"Chinese",text:"Chinese",flag:"cn"},
        {value:"Japanese",text:"Japanese",flag:"jp"},
        {value:"korean",text:"Korean",flag:"kr"},
        {value:"French",text:"French",flag:"fr"},
        {value:"Spanish",text:"Spanish",flag:"es"},
        {value:"Arabic",text:"Arabic",flag:"ae"}];
        // Debug, Information,
        // Warning, Error and Fatal."
const LogOptions=[
            {value:"Debug",text:"Debug"},
            {value:"Information",text:"Information"},
            {value:"Warning",text:"Warning"},
            {value:"Error",text:"Error"},
            {value:"Fatal",text:"fatal"}
        ];


const SettingsStyle={
    backgroundColor: "#C9D1F0",
    padding: "30px",
    fontFamily: "Arial",
    width: "400px",
    height: "auto",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",

}


var UserMapOptions=[];

class Settings extends Component{

    constructor(props)
    {
        super(props);
        this.state={
          umlist:[],
          Language:"",
          LogLevel:"",
          ContextlessLogin:false,
          IDMvalue:false,
          Usermapvalue:false,
          usermapname:"",



        };
        this.enableUserMaps=this.enableUserMaps.bind(this)
        this.handleChangeCon=this.handleChangeCon.bind(this);
        this.handleChangeIDM=this.handleChangeIDM.bind(this);
        this.handleChangeLog=this.handleChangeLog.bind(this);
        this.handleChangeLan=this.handleChangeLan.bind(this);
        this.handleChangeUsermap=this.handleChangeUsermap.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.goBack=this.goBack.bind(this);
        this.handleconfirm=this.handleconfirm.bind(this);
        this.handlecancel=this.handlecancel.bind(this);

    }

    goBack(event)
    {
      event.preventDefault();
      this.props.history.push("/displaypage");
    }

handleChangeLan(event,{value})
{
  event.preventDefault();
  this.setState({
    Language:value
  })
}

handleChangeLog(event,{value})
{
  event.preventDefault();
  this.setState({
    LogLevel:value
  })
}

handleChangeCon(event,{checked})
{
  event.preventDefault();
  this.setState({
    ContextlessLogin:checked
  })
}

handleChangeIDM(event,{checked})
{
  event.preventDefault();
  this.setState(
    {
      IDMvalue:checked,
      Usermapvalue:false,
      usermapname:"",
    }
  )
    document.getElementById("UsermapsId").style.display="none";


}


handleChangeUsermap(event,{value})
{
  this.setState({
    usermapname:value
  })

}



enableUserMaps(event,{checked})
{
  event.preventDefault();
  this.setState(
    {
      IDMvalue:false,
      Usermapvalue:checked,
      usermapname:"",
    }
  )

    console.log("came to enable usermaps")
    if(!checked)
    {
        document.getElementById("UsermapsId").style.display="none";
    }
    else
    document.getElementById("UsermapsId").style.display="block";
}




componentDidMount()
{
  fetch("http://localhost:8080/api/sendusermap").then(response => response.json()).then(data => this.setState({
    umlist:data
  }))
  UserMapOptions=[]
  setTimeout(() => {
  console.log(this.state.umlist)
  for(var i=0;i<this.state.umlist.length;i++)
  {
   var dict={}
   dict["value"]=this.state.umlist[i][0];
   dict["text"]=this.state.umlist[i][0];
   UserMapOptions.push(dict);


  }
  }, 300);
}


handleSave()
{




this.setState({
  open:true
})

}
handlecancel()
{
  this.setState({
    open:false
  })
}
handleconfirm()
{
  let settingsattr={
    Language:"",
    LogLevel:"",
    ContextlessLogin:false,
    IDMvalue:false,
    Usermapvalue:false,
    usermapname:"",
    open:false,

  }

  settingsattr.Language=this.state.Language;
  settingsattr.LogLevel=this.state.LogLevel;
  settingsattr.ContextlessLogin=this.state.ContextlessLogin;
  settingsattr.IDMvalue=this.state.IDMvalue;
  settingsattr.Usermapvalue=this.state.Usermapvalue;
  settingsattr.usermapname=this.state.usermapname;



   fetch("http://localhost:8080/api/settings", {
           method: "POST",
           headers: {
               "content-type": "application/json",
           },
           body: JSON.stringify(settingsattr),
       })
       .then(response => response.json());

  this.props.history.push("/displaypage");
}

    render()
    { console.log("Settings page");
        return(
        <div>

        <Segment style={SettingsStyle}>
           <h2 style={{textAlign:"center"}}><Icon name="setting"/> Settings</h2>
            <Form>
                <Form.Field>
                    <label>Language</label>
                <Select placeholder="Language" options={langOptions} onChange={this.handleChangeLan}></Select>
                </Form.Field>
                <br/>
                <br/>
                <FormField>
                <label>Loglevel</label>
                <Select placeholder="LogLevel" options={LogOptions} onChange={this.handleChangeLog}></Select>
                </FormField>
                <br/>
                <Form.Field>
                    <Radio slider label ="Contextless Login" onChange={this.handleChangeCon}></Radio>
                </Form.Field>
                <br/>
                <br/>

                <Form.Field>
                <label>Required Mapping</label>
                <br/>
                <Radio slider name="requiredmapping" label="IDM"    onChange={this.handleChangeIDM}></Radio>
                </Form.Field>
                <br/>
                <Form.Field>
                <Radio slider name="requiredmapping" label="UserMap"  onChange={this.enableUserMaps} ></Radio>
                </Form.Field>
                <br/>
                <div style={{display:"none"}} id="UsermapsId">
                <Form.Field >
                <label>UserMap</label>
                <br/>
                 <Select placeholder="UserMap" options={UserMapOptions}  onChange={this.handleChangeUsermap}/>
                </Form.Field>
                <br/>
                </div>
                <Form.Field>
                    <Button color="black" style={{float:"right"}} onClick={this.handleSave}> Save</Button>
                    <Button onClick={this.goBack} color="black" floated="left"> Back </Button>
                </Form.Field>


            </Form>
            </Segment>
            <Confirm style={{
              left:"30%",
              top:"0%",
              position:"fixed"
            }}
            open={this.state.open}
            header='Do you want to save Settings'
            onCancel={this.handlecancel}
            onConfirm={this.handleconfirm}
            size="tiny"
             />
        </div>)
    }
}

export default Settings
