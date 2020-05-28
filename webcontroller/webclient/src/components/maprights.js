import React,{Component} from "react"
import { Form, Button, Select, Segment ,Radio} from "semantic-ui-react";
import MapRightsShow from "./maprightsshow"


var volOptions=[];

var UserMapOptions=[];
var umpname=""
class MapRights extends Component{

    constructor(props)
    {
        super(props);
        this.state={
          umlist:[],
          um1:"",
          usermapdata:[],
          volname:""
        };
        this.handleChange=this.handleChange.bind(this);
        this.showMapRights=this.showMapRights.bind(this);
        this.goBack=this.goBack.bind(this);
        this.handleChangevol=this.handleChangevol.bind(this);

    }
    goBack(event)
    {
      event.preventDefault();
      this.props.history.push("/displaypage");
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


      fetch("http://localhost:8080/api/listvolumes").then(response => response.json()).then(data => this.setState({
        volList:data
      }))
      volOptions=[]
      setTimeout(() => {
      console.log(this.state.volList)
      for(var i=0;i<this.state.volList.length;i++)
      {
       var dict={}
       dict["value"]=this.state.volList[i];
       dict["text"]=this.state.volList[i];
       volOptions.push(dict);


      }
      }, 300);
    }

handleChange(event,{value})
{
  event.preventDefault();
  umpname=value;
  this.setState({
    um1:value,

  });

}
handleChangevol(event,{value})
{
  event.preventDefault();
  this.setState({
    volname:value,
  })
}

showMapRights(event)
{
  event.preventDefault();


  var umurl ="http://localhost:8080/api/usermap/"
  console.log(umpname);
  fetch(umurl.concat(umpname)).then(response => response.json()).then(data => this.setState({usermapdata:data}));




}
    render()
    {
        return(
            <div style={{color:"black"}}>
            <h1 style={{textAlign:"center"}}> Map Rights</h1>
            <Segment style={{color:"black",backgroundColor:"#C9D1F0",fontWeight:"900"}} width="equal" >
            <Form>
                <Form.Group >
                <Form.Field width={4}>
               <Select placeholder="Select AD volume" options={volOptions} name="Vol1" onChange={this.handleChangevol} />
               </Form.Field>
               <Form.Field width={4}>
                   <Select placeholder="Select User Map" options={UserMapOptions} name="um1" onChange={this.handleChange}/>
               </Form.Field>
               <Form.Field >
                <Radio slider label="Apply to Salvage " name="radiogroup3"></Radio>
                </Form.Field>
                  <Form.Field>
                <Radio slider label="Remove eDirectory Trustees" name="radiogroup3" ></Radio>
                </Form.Field>
                <Form.Field>
                <Radio slider label="Migrate IDs" name="radiogroup3"></Radio>
                </Form.Field>
                <Button color="black" onClick={this.showMapRights}>Show</Button>
                <Button onClick={this.goBack} color="black" floated="left"> Back </Button>
               </Form.Group>

            </Form>
            </Segment>

            <MapRightsShow usermapdata={this.state.usermapdata}/>
            </div>
        )
    }
}

export default MapRights
