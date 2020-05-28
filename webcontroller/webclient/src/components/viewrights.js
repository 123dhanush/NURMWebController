import React, { Component } from "react";

import {Segment,Button,Form,Select, Icon,Input,Radio, Label,Popup} from "semantic-ui-react";
import ShowViewRights from "./showviewrights";

var volOptions=[];

const filterOps=[{value:"All",text:"All" },{value:"Users-Mapped",text:"Users-Mapped" },{value:"Users-Not Mapped",text:"Users-Not Mapped"},
{value:"Groups-Mapped" ,text:"Groups-Mapped"},{value:"Groups-Not Mapped",text:"Groups-Not Mapped"},{ value:"ACL-Matched", text:"ACL-Matched"}, {value: "ACL-Not Matched",text:"ACL-Not Matched"}];

const viewrightsStyle={
    backgroundColor:"blue",
    paddingTop:"15px",
    paddingLeft:"20px",
    paddingBottom:"15px",
    borderRadius:"10px",
    top:"10%"

}
class Viewrights extends Component{


    constructor(props)
    {
        super(props);
        this.state={
          viewrightsdata:[],
          usermapdata:[],
          volumename:'',
          disabled:"disabled",
          volList:[],
          Searchname:"",
          filteredUsers:[],

        };
        this.viewrightsfunc=this.viewrightsfunc.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.enableFilters=this.enableFilters.bind(this);
        this.SearchHandleChange=this.SearchHandleChange.bind(this);
        this.filterChange=this.filterChange.bind(this);
        this.goBack=this.goBack.bind(this);


    }
    goBack(event)
    {
      event.preventDefault();
      this.props.history.push("/displaypage");
    }

    viewrightsfunc(event)
    {
      event.preventDefault();


      var umurl ="http://localhost:8080/api/viewrights/"
      // console.log(umpname);


      fetch(umurl.concat(this.state.volumename)).then(response => response.json()).then(data => this.setState({viewrightsdata:data}));

    }
    handleChange(event,{value})
    {
      this.setState({
        volumename:value
      })
    }
   enableFilters(event,{checked})
   {
     event.preventDefault();
     if(checked)
     {
     this.setState({
       disabled:""
     })
     }
     else {
       this.setState({
         disabled:"disabled",
         filteredUsers:[],
       })

     }

   }
   componentDidMount()
   {
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
     fetch("http://localhost:8080/api/settingsUserMap").then(response => response.json()).then(data => this.setState({
       usermapdata:data
     }));
   }


   SearchHandleChange(event,{value})
   {
     event.preventDefault();
     this.setState({
       Searchname:value
     })


   }


   filterChange(event,{value})
   {
     event.preventDefault();
     let tempdata=[];
     let userlist=["null"];
     setTimeout(()=>{
       tempdata=this.state.usermapdata;
       var i=0

       if(value.localeCompare("Users-Mapped")===0 && tempdata[i][i.toString()][8].localeCompare("UsertoUser")===0){
       userlist=[];


       for(var i=0;i<tempdata.length;i++)
       {
         console.log(tempdata[i][i.toString()][0].localeCompare(tempdata[i][i.toString()][4]))
         if(tempdata[i][i.toString()][4].localeCompare("")===1)
         {
           userlist.push(tempdata[i][i.toString()][0])
           userlist.push("a".concat(tempdata[i][i.toString()][4]))
         }
       }


      }
      if(value.localeCompare("Groups-Mapped")===0 && tempdata[i][i.toString()][8].localeCompare("GrouptoGroup")===0){
      userlist=[];


      for(var i=0;i<tempdata.length;i++)
      {
        console.log(tempdata[i][i.toString()][0].localeCompare(tempdata[i][i.toString()][4]))
        if(tempdata[i][i.toString()][4].localeCompare("")===1)
        {
          userlist.push(tempdata[i][i.toString()][0])
          userlist.push("a".concat(tempdata[i][i.toString()][4]))
        }
      }
     }


      if(value.localeCompare("Users-Not Mapped")===0 && tempdata[i][i.toString()][8].localeCompare("UsertoUser")===0)
      {
        userlist=[];
        for(var i=0;i<tempdata.length;i++)
        {
          if(tempdata[i][i.toString()][4].localeCompare("")===0)
          {
            userlist.push(tempdata[i][i.toString()][0])
          }
        }

      }
      if(value.localeCompare("Groups-Not Mapped")===0 && tempdata[i][i.toString()][8].localeCompare("GrouptoGroup")===0)
      {
        userlist=[];
        for(var i=0;i<tempdata.length;i++)
        {
          if(tempdata[i][i.toString()][4].localeCompare("")===0)
          {
            console.log("came to groups not mapped")
            userlist.push(tempdata[i][i.toString()][0])
          }
        }

      }
      if(value.localeCompare("All")===0)
      {
        userlist=[];
        for(var i=0;i<tempdata.length;i++)
        {

            userlist.push(tempdata[i][i.toString()][0])
            userlist.push("a".concat(tempdata[i][i.toString()][4]))

        }
      }

      console.log(userlist)
      this.setState({
        filteredUsers:userlist
      })
     },300)



   }
    render(){
        return(


            <div>
                <h1 style={{textAlign:"center"}}>View Rights</h1>
                <Segment style={{color:"black",backgroundColor:"#C9D1F0",fontWeight:"900"}}>
                <Form>
            <Form.Group>

                <br/>
                <Form.Field width={3}>
               <Select icon="disk" placeholder="Select AD volume"  options={volOptions} name="Vol1" id="volumeid" onChange={this.handleChange} />
               </Form.Field>
               <Form.Field width={1}>
               <Button onClick={this.viewrightsfunc}><Icon name="refresh"/></Button>
               </Form.Field>

               <Form.Field>
               <Popup content="enable paired view to use filters" trigger={<Radio slider label="paired view"  icon="info circle"  onChange={this.enableFilters}/>}/>
                </Form.Field>
                <Form.Field>

                <Select options={filterOps} disabled={this.state.disabled}  name="filterOps" icon ="filter" onChange={this.filterChange} />
                </Form.Field>

               <Form.Field width={4}>
               <Input icon placeholder='Search...' onChange={this.SearchHandleChange}  >
                    <input />
                    <Icon name='search' />
                </Input>

                </Form.Field>
              <Button onClick={this.goBack} color="black" floated="right"> Back </Button>
           </Form.Group>



               </Form>
               </Segment>

               <ShowViewRights viewrightsdata={this.state.viewrightsdata} Searchname={this.state.Searchname} filteredUsers={this.state.filteredUsers}/>
             </div>

        )
    }

}

export default Viewrights
