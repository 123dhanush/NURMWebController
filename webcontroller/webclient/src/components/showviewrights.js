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
class ShowViewRights extends Component{
  constructor(props) {
    super(props);
    this.state={
      usermapdata:[],
    }
    // this.generateRightsTable=this.generateRightsTable.bind(this);
    // this.rightsData=this.rightsData.bind(this);
    // this.arightsData=this.arightsData.bind(this);
    // this.generateheadertabledata=this.generateheadertabledata.bind(this);

  }
//
  rightsData(templist)
  {
    setTimeout(()=>{
      var ele=document.getElementById('ViewRightsId');
       ele.style.display="inline-block";
    },300)

    let res1=[];
    let tempr=[];



    tempr=templist.slice(1,-1).split(", ");

    for(var j=0;j<8;j++)
    {

      if(tempr[j].localeCompare("1")===0){
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

  generateRightsTable()
  {

    // document.getElementById("MapRightsId").style.display="none";
    let res=[];

    let tableData=this.props.viewrightsdata;

    let uname="";
    let tempr=[];
    // console.log(tableData[0])
    const objectArray=(tableData[0])
    const objectArray2=(tableData[1])
    const objectArray3=(tableData[2])
    const objectArray4=(tableData[3])

    let userlist=this.props.filteredUsers
    console.log(userlist)
    for(var item in objectArray)
    {
      let temp1=objectArray[item];
      for (var propName in temp1){
          if(temp1.hasOwnProperty(propName)) {
               tempr = temp1[propName];
               uname=propName;
         // do something with each element here
        }
      }

      if(userlist.includes(uname) && this.props.Searchname.localeCompare("")===0)
      {
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if ( this.props.Searchname!=="" && uname.includes(this.props.Searchname) && userlist.includes(this.props.Searchname))  {
        console.log(userlist);
        console.log("came to filtered map"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname!=="" &&uname.includes(this.props.Searchname) && JSON.stringify(userlist)===JSON.stringify([]))
      {
        console.log(userlist);
        console.log("came to filtered"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname.localeCompare("")===0 && JSON.stringify(userlist)===JSON.stringify([])){
      console.log(userlist);
      res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }





    }
    for(var item in objectArray2)
    {
      let temp1=objectArray2[item];
      for (var propName in temp1){
          if(temp1.hasOwnProperty(propName)) {
               tempr = temp1[propName];
               uname=propName;
         // do something with each element here
        }
      }
      if(userlist.includes("a".concat(uname)) && this.props.Searchname.localeCompare("")===0)
      {
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if ( this.props.Searchname!=="" && uname.includes(this.props.Searchname) && userlist.includes(this.props.Searchname))  {
        console.log(userlist);
        console.log("came to filtered map"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname!=="" &&uname.includes(this.props.Searchname) && JSON.stringify(userlist)===JSON.stringify([]))
      {
        console.log(userlist);
        console.log("came to filtered"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname.localeCompare("")===0 && JSON.stringify(userlist)===JSON.stringify([])){

      res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="user" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }

    }
    for(var item in objectArray3)
    {
      let temp1=objectArray3[item];
      for (var propName in temp1){
          if(temp1.hasOwnProperty(propName)) {
               tempr = temp1[propName];
               uname=propName;
         // do something with each element here
        }
      }
      if(userlist.includes(uname) && this.props.Searchname.localeCompare("")===0)
      {
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if ( this.props.Searchname!=="" && uname.includes(this.props.Searchname) && userlist.includes(this.props.Searchname))  {
        console.log(userlist);
        console.log("came to filtered map"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname!=="" &&uname.includes(this.props.Searchname) && JSON.stringify(userlist)===JSON.stringify([]))
      {
        console.log(userlist);
        console.log("came to filtered"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname.localeCompare("")===0 && JSON.stringify(userlist)===JSON.stringify([])){

      res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="blue"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }

    }
    for(var item in objectArray4)
    {
      let temp1=objectArray4[item];
      for (var propName in temp1){
          if(temp1.hasOwnProperty(propName)) {
               tempr = temp1[propName];
               uname=propName;
         // do something with each element here
        }
      }
      if(userlist.includes("a".concat(uname)) && this.props.Searchname.localeCompare("")===0)
      {
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if ( this.props.Searchname!=="" && uname.includes(this.props.Searchname) && userlist.includes(this.props.Searchname))  {
        console.log(userlist);
        console.log("came to filtered map"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname!=="" &&uname.includes(this.props.Searchname) && JSON.stringify(userlist)===JSON.stringify([]))
      {
        console.log(userlist);
        console.log("came to filtered"+uname+"Searchname:"+this.props.Searchname)
        res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }else if(this.props.Searchname.localeCompare("")===0 && JSON.stringify(userlist)===JSON.stringify([])){

      res.push(

        <Table.Row key= {tempkey}>
          <Table.Cell><Icon name="group" color="black"></Icon>{uname}</Table.Cell>

        {this.rightsData(tempr)}
        </Table.Row>

        )

        tempkey=tempkey+1;
      }

    }

    return res;
  }

generateheadertabledata()
{

  let res3=[];
  res3.push(
  <Table celled structured >
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
      <div style={ShowStyle} id="ViewRightsId">

      {this.generateheadertabledata()}
      </div>
    )

  }



}

export default ShowViewRights
