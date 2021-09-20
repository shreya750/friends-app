import React,{useState} from 'react'
import { useLocalstorage } from '../hooks/useLocalstorage'
import {Button,Form,Container, ListGroup,InputGroup,FormControl} from 'react-bootstrap'
//import {Example} from './SelectableCards'

export default function AddFriends({}) {
    const [name,setName] = useLocalstorage("name","")
    const [graphNode,setGraphNode] = useState(1)
    const [friends, setfriends] = useState([])
    // var friendListPre = [
    //     {id: 1, name: "user1", isChecked: false},
    //     {id: 2, name: "user2", isChecked: false},
    //     {id: 3, name: "user3", isChecked: false},
    //     {id: 4, name: "user4", isChecked: false}
    //   ]

      const [friendList, setFriendList] = useState([])
    
    const friendship = {
        jim:["pam","michael"],
        dwight:["angela","michael"],
        pam:["dwight","jim"],
        michael:["dwight","jan","jim"],
        angela:["andy","dwight"],
 
    }
    

    var selected=[]

    //adding friends to state
   const addName =() =>{
        if(name){
            setfriends([...friends,name])
            setGraphNode(graphNode+1)
            var newFriend =  {name: name, isChecked: false, graphNode: graphNode};
            setFriendList([...friendList,newFriend])
            console.log("adding new name");
            console.log(friendList);
        }
    }

    function selectedFriends (elem){
        selected=[...selected,elem]
        console.log(selected)
    }

    // function handleCheckboxChange(event) {
    //     friendList.forEach(friend => {
    //         if (friend.name === event.target.name)
    //         friend.isChecked =  event.target.checked
    //             })
    //         setFriendList([friendList])

    //     console.log("vin1 value of name is ", event.target.name, "checked is ", event.target.checked);
    //   }

   
    return (
        <Container>
            
            <Form>
            <Form.Group className="mb-10" >
                <Form.Label>Friends</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter name" 
                onChange = {(e) => setName(e.target.value)}/>
                
            </Form.Group>
            <br/>
            <Button  keyvariant="primary" className="mr-2" onClick={addName}>Add People</Button>
            </Form>

            {friends.map(( elem,index )=> {
              return(
             <>
        
        <InputGroup className="mb-3">
            <InputGroup.Checkbox key={"checkbox-" + index} aria-label="Checkbox for following text input" name={elem }
          onClick={
              event => {
                    friendList.forEach(friend => {
                        //console.log("friend name is ", friend.name ,"vin1 value of name is ", event.target.name, "checked is ", event.target.checked);  
                        if (friend.name === event.target.name){
                            
                            friend.isChecked =  event.target.checked
                            setFriendList(friendList)
                            console.log("updating friend name " + friend.name  + " set checked to " + event.target.checked)

                        }
                            })              
    
            console.log("printing complete friendList")          
            console.log(friendList);
          }       
          }/>
            {/* <FormControl aria-label="Text input with checkbox" /> */}
            <ListGroup as="ul" key={"ul" + index}>  
                        <ListGroup.Item 
                        key={"lgItem" + index}
                        className="mr-2"
                        variant="primary"
                        action onClick={selectedFriends(elem)} >{elem}
                        </ListGroup.Item> 
            </ListGroup>
        </InputGroup>

          </>
                  
             )
        })}
            


          
            <br/>
            <br/>
            <Button  variant="dark" >Show Common Friends</Button>
            <br/>
            <br/>
            <Button  variant="dark" onClick={addEdge()}>Add Relationship</Button>


            
        </Container>
    )
}
//friends list should be visible onload
//select any 2 friends
//2 select option, show friends and add friends

