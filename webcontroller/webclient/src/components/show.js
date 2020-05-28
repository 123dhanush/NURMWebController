import React,{ Component } from "react";

import { Table,Label,Button } from "semantic-ui-react";



const ShowStyle={

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
class Show extends Component {

    constructor(props)
    {
        super(props);
        this.state={
          usermapdata:[],
        };
        this.generateTableData=this.generateTableData.bind(this);
        this.goBack=this.goBack.bind(this);
    }
    componentDidMount()
    {
        var cururl=window.location.href;
        var l1= cururl.split("/");
        console.log(l1[4]);
        console.log("show component mount");
        var umurl ="http://localhost:8080/api/usermap/"
        fetch(umurl.concat(l1[4])).then(response => response.json()).then(data => this.setState({usermapdata:data}));
    }
    goBack(event)
    {
      event.preventDefault();
      this.props.history.push("/mapuserspage");
    }

    generateTableData()
    {
      let res=[];
      let tableData=this.state.usermapdata;
      console.log(tableData);
      console.log(tableData[1]);

      for(var i=0;i<tableData.length;i++)
      {
        if(tableData[i][i.toString()][8].localeCompare("GrouptoGroup")===0)
        {
          res.push(
            <Table.Row key={i}>

            <Table.Cell Collapsing key={tableData[i][i.toString()][0]}>
              <Label color="blue">Group Name :</Label>&nbsp;&nbsp;&nbsp;{tableData[i][i.toString()][0]}<br/>




            </Table.Cell>
            <Table.Cell Collapsing key={tableData[i][i.toString()][2]}>
            <Label color="blue">Group Name:</Label>&nbsp;&nbsp;&nbsp; {tableData[i][i.toString()][4]}<br/>


              </Table.Cell>
            </Table.Row>

          )
        }
        if(tableData[i][i.toString()][8].localeCompare("UsertoUser")===0)
        {
          res.push(
            <Table.Row key={i}>

            <Table.Cell Collapsing key={tableData[i][i.toString()][0]}>
              <Label color="blue">User Name :</Label>&nbsp;&nbsp;&nbsp;{tableData[i][i.toString()][0]}<br/>
              <Label style={{backgroundColor:"#C9D1F0"}}>First Name:</Label>&nbsp;&nbsp;&nbsp;{tableData[i][i.toString()][2]}<br/>
              <Label color="blue">Last Name :</Label>&nbsp;&nbsp;&nbsp;{tableData[i][i.toString()][3]}



            </Table.Cell>
            <Table.Cell Collapsing key={tableData[i][i.toString()][2]}>
            <Label color="blue">User Name:</Label>&nbsp;&nbsp;&nbsp; {tableData[i][i.toString()][4]}<br/>
            <Label style={{backgroundColor:"#C9D1F0"}}>First Name:</Label>&nbsp;&nbsp;&nbsp; {tableData[i][i.toString()][6]}<br/>
            <Label color="blue">Last Name:</Label>&nbsp;&nbsp;&nbsp; {tableData[i][i.toString()][7]}

              </Table.Cell>
            </Table.Row>

          )
        }

      }
      return res;
    }
    render()
    {

    return(
    <div style={ShowStyle}>

      <Table celled padded>
      <Table.Header>
        <Table.Row>

          <Table.HeaderCell width={6}> <Label ribbon >eDirUsers</Label></Table.HeaderCell>
          <Table.HeaderCell width='six'><Label ribbon >actDirUsers</Label></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>

        {this.generateTableData()}


      </Table.Body>


    </Table>
    <Button color="black" onClick={this.goBack}>Back</Button>
  </div>
        )
    }
}

export default Show;
