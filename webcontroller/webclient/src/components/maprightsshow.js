import React,{Component} from "react";

import {Table,Label,Icon,Divider} from "semantic-ui-react";

var tempkey=0;


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
    display:"none",

    position: "absolute",
    float:"left",
    left: "20%",
    margin: "0 auto",
    // top: "50%",
    // transform: "translate(-40%, -40%)",
    borderRadius: "25px",
    borderCollapse:"collapse",
}
class MapRightsShow extends Component{
  constructor(props) {
    super(props);
    this.state={
      usermapdata:[],
    }
    this.generateRightsTable=this.generateRightsTable.bind(this);
    this.rightsData=this.rightsData.bind(this);
    this.arightsData=this.arightsData.bind(this);
    this.generateheadertabledata=this.generateheadertabledata.bind(this);

  }

  rightsData(temptableData,i)
  {
    setTimeout(()=>{
      var ele=document.getElementById('MapRightsId');
       ele.style.display="inline-block";
    },300)
    let res1=[];
    let tempr=[];
    tempr=temptableData[i.toString()][1]
    tempr=tempr.slice(1,-1).split(", ");
    console.log(tempr);
    for(var j=0;j<8;j++)
    {
      console.log(temptableData[i.toString()][1][j])
      if(tempr[j]==="1"){
        res1.push(
      <Table.Cell textAlign='center' key={tempkey}>
        <Icon color='green' name='checkmark' size='large' />
      </Table.Cell>)

      }
      else {

          res1.push(<Table.Cell />)

      }
      tempkey=tempkey+1
   }


      return res1;
  }


   arightsData(temptableData,i)
   {
     let res1=[];
     let tempr=[];
     tempr=temptableData[i.toString()][1]
     tempr=tempr.slice(1,-1).split(", ");
     console.log(tempr);
     for(var j=0;j<8;j++)
     {
       console.log(temptableData[i.toString()][1][j])
       if(tempr[j]==="1"){
         res1.push(
       <Table.Cell textAlign='center' key={tempkey}>
         <Icon color='green' name='checkmark' size='large' />
       </Table.Cell>)

       }
       else {

           res1.push(<Table.Cell></Table.Cell>)

       }
       tempkey=tempkey+1
    }





    return res1;
   }



  generateRightsTable()
  {

    // document.getElementById("MapRightsId").style.display="none";
    let res=[];

    let tableData=this.props.usermapdata;


    console.log(tableData.length);
    for(var i=0;i<tableData.length;i++)
    {
      if(tableData[i][i.toString()][8].localeCompare("UsertoUser")===0)
      {
      res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="blue"></Icon>{tableData[i][i.toString()][0]}</Table.Cell>

        {this.rightsData(tableData[i],i)}
        </Table.Row>

        )

      res.push(
        <Table.Row color="black" key= {tempkey+1}>
          <Table.Cell ><Icon name="user"></Icon>{tableData[i][i.toString()][4]}</Table.Cell>

        {this.arightsData(tableData[i],i)}
        </Table.Row>
      )
    }
    if(tableData[i][i.toString()][8].localeCompare("GrouptoGroup")===0)
    {
    res.push(

      <Table.Row key= {tempkey}>
        <Table.Cell><Icon name="group" color="blue"></Icon>{tableData[i][i.toString()][0]}</Table.Cell>

      {this.rightsData(tableData[i],i)}
      </Table.Row>

      )

    res.push(
      <Table.Row color="black" key= {tempkey+1}>
        <Table.Cell ><Icon name="group"></Icon>{tableData[i][i.toString()][4]}</Table.Cell>

      {this.arightsData(tableData[i],i)}
      </Table.Row>
    )
  }
      // res.push(
      //   <Table.Row>
      // <Divider horizontal>and</Divider>
      //   </Table.Row>
      //   )
        tempkey=tempkey+2;

    }

    return res;
  }

generateheadertabledata()
{
  let res3=[];
  res3.push(
  <Table celled structured>
<Table.Header>
  <Table.Row>
    <Table.HeaderCell rowSpan='2'><Label ribbon size="large">User Name</Label></Table.HeaderCell>

    <Table.HeaderCell colSpan='8' textAlign="center">Rights</Table.HeaderCell>
  </Table.Row>
  <Table.Row>
    <Table.HeaderCell textAlign="center">S</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">R</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">W</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">C</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">E</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">M</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">F</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">A</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
{this.generateRightsTable()}

</Table.Body>
</Table>
)

return res3;
}

  render()
  {
    return(
      <div style={ShowStyle} id="MapRightsId">

      {this.generateheadertabledata()}
      </div>
    )
  }



}

export default MapRightsShow
