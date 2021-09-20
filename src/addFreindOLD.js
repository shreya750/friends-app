import React,{useState} from 'react'
import { useLocalstorage } from '../hooks/useLocalstorage'
import {Button,Form,Container, ListGroup,InputGroup,FormControl} from 'react-bootstrap'
//import {Example} from './SelectableCards'

export default function AddFriends({}) {
    const [name,setName] = useLocalstorage("name","")
    const [friends, setfriends] = useState([])
    
    const friendship = {
        jim:["pam","michael"],
        dwight:["angela","michael"],
        pam:["dwight","jim"],
        michael:["dwight","jan","jim"],
        angela:["andy","dwight"],
 
    }
    //const people = [{office:"jim"},{office:"pam"},{office:"michael"},{office:"dwight"}]

    var selected=[]

    //adding friends to state
   const addName =() =>{
        if(name){
            setfriends([...friends,name])
        }
    }

    function selectedFriends (elem){
        selected=[...selected,elem]
        console.log(selected)
    }

   function alertClick(){
       alert('list item clicked')
   }
   
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
            <Button  variant="primary" className="mr-2" onClick={addName}>Add People</Button>
            </Form>

            {friends.map(( elem,index )=> {
              return(
             <>
         {/* <ListGroup as="ul" key={index}> */}
         {/* <Form.Check type="radio" aria-label="radio 1" label={elem}> */}
                  {/* <ListGroup.Item 
                   className="mr-2"
                   variant="primary"
                   action onClick={selectedFriends(elem)} >{elem}
                   </ListGroup.Item> */}
            {/* </Form.Check> */}
                
        {/* </ListGroup>   */}
        <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            {/* <FormControl aria-label="Text input with checkbox" /> */}
            <ListGroup as="ul" key={index}>  
                        <ListGroup.Item 
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
            <Button  variant="dark" >Add Relationship</Button>


            
        </Container>
    )
}
//friends list should be visible onload
//select any 2 friends
//2 select option, show friends and add friends

