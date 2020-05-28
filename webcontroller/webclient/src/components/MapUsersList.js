import React,{ Component } from "react";

import { Table,Label,Segment,Button,Icon } from "semantic-ui-react";
import Mapusers from "./mapusers";



const MapUsersListStyle={

    backgroundColor: "#C9D1F0",
    padding: "30px",
    fontFamily: "Arial",
    width: "800px",
    height:"auto",
    align:"center",
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center",
    display:"inline-block",

    position: "absolute",
    float:"left",
    left: "20%",
    margin: "0 auto",
    // top: "50%",
    // transform: "translate(-40%, -40%)",
    borderRadius: "25px",
    borderCollapse:"collapse",
}
class MapUsersList extends Component {

    constructor(props)
    {
        super(props);
        this.state={
          usermapdata1:[],
        };
        this.generateData=this.generateData.bind(this);
        this.showusermap=this.showusermap.bind(this);
        this.delusermap=this.delusermap.bind(this);
        this.goBack=this.goBack.bind(this);
        this.downusermap=this.downusermap.bind(this);
    }
    goBack()
    {
        this.props.history.push("/mapuserspage");
    }
    componentDidMount()
    {
        var cururl=window.location.href;
        var l1= cururl.split("/");
        console.log(l1[5]);
        console.log("show component mount");
        var umurl ="http://localhost:8080/api/usermap/list/listUserMaps"
        fetch(umurl).then(response => response.json()).then(data => this.setState({usermapdata1:data}));
    }
    showusermap(event)
    {
      event.preventDefault();
      let tempstr=event.target.id;

      setTimeout(() => {
        this.props.history.push("/mapuserspage/"+tempstr);

      }, 30);
    }

    delusermap(event)
    {
      event.preventDefault();
      let tempstr=event.target.id;
      let tempdict={"usermapname":tempstr};
      // setTimeout(() => {
      //   this.props.history.push("/mapuserspage/del/"+tempstr);
      //
      // }, 30);

      console.log("came to delte usermap");
      fetch("http://localhost:8080/api/usermap/del", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify(tempdict),
          })
          .then(response => response.json());

    window.location.reload();

    }


    downusermap(event)
    {
      event.preventDefault();
      let tempstr=event.target.id;
      console.log(tempstr);
      let tempdict={"usermapname":tempstr};
      var file1="http://localhost:8080/api/usermap/";
      var filepath=file1.concat(tempstr);
      console.log(filepath);
      fetch(filepath)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = tempstr+".json";
					a.click();
				});
				//window.location.href = response.url;
		});





    }
    generateData()
    {

      let res=[];
      let tableData=this.state.usermapdata1;
      let tempObj=[];
      let templistkeys=[];
      for(var i=0;i<tableData.length;i++)
      {
        // console.log(tableData[i]);
        templistkeys=Object.keys(tableData[i]);
        // console.log(templistkeys);


        // tempObj.push(templistkeys[0]);
        // console.log(tempObj);

        res.push(
          <Segment inverted color="grey" key={templistkeys[0]} >

          <Button size="large" color="grey"  id={templistkeys[0]} onClick={this.showusermap} > {templistkeys[0]} </Button>
          <Button color="blue" icon="arrow alternate circle up" floated="right" id={templistkeys[0]} onClick={this.downusermap} ></Button>
          &nbsp;&nbsp;&nbsp;
          <Button color="red" icon="delete" floated="right" id={templistkeys[0]}   onClick={this.delusermap}/>
          </Segment>

        )
      }
      return res;

    }



    render()
    {
        return(

          <div>

          {this.generateData()}
          <Button onClick={this.goBack} color="grey" floated="right"> <Icon name="backward"/></Button>
          </div>

        )


    }
}

export default MapUsersList;
