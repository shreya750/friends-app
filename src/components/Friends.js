import React,{useState} from 'react'
import { useLocalstorage } from '../hooks/useLocalstorage'
import {Button,Form,Container, ListGroup,InputGroup,FormControl,Modal} from 'react-bootstrap'
//import {Example} from './SelectableCards'

export default function AddFriends({}) {
    const [name,setName] = useLocalstorage("name","")
    const [graphNode,setGraphNode] = useState(1)
    const [friends, setfriends] = useState([])

      const [friendList, setFriendList] = useState([])
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [finalAnswerPaths, setfinalAnswerPaths] = useState([])
    
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


    let v = 0;
    let adjList = [];

//it's a directed graph
function Graph(vertices){  //vertices = 5
    //initialise vertex
    v = vertices //v = 5

    //initialise adjancey list
    initAdjList();
}

//method to initialise adjacency list
function initAdjList (){
    adjList = []
    for (let i =0; i<= v ; i++){ //v=5
        adjList[i] = [] //5 empty arrays
    }
}

function addEdge (u,v) { //u=1, v=5
    //add v to u's list
    adjList[u].push(v); 
    adjList[v].push(u)
}


function printAllPaths(s,d) {
    let isVisited =  new Array(v)
    for(let i =0;i<v;i++){
        isVisited[i] = false;

    }
    
    let pathList = []

    //add source to path[]
    pathList.push(s);

    //call recursive utility
    printAllPathUtil(s,d, isVisited, pathList);
}

function printAllPathUtil(u, d , isVisited, localPathList){
    if(u==(d)) {
        //document.write(localPathList + "<br>")
        
        console.log("common path is ", localPathList)
        var friendNamePath = []
        localPathList.forEach( nodeNumber => {
            friendList.forEach(friend => {
                //console.log("friend name is ", friend.name ,"vin1 value of name is ", event.target.name, "checked is ", event.target.checked);        
                    if (friend.graphNode == nodeNumber){
                        friendNamePath.push(friend.name)                             
                        }
                    })


        })

        console.log("dosti path is ", friendNamePath);
        setfinalAnswerPaths(friendNamePath);
        return;
    }

    isVisited[u] = true;

    for(let i=0; i < adjList[u].length;i++) {
        if(!isVisited[adjList[u][i]]){

            localPathList.push(adjList[u][i])
            printAllPathUtil(adjList[u][i], d, isVisited, localPathList);

            localPathList.splice(localPathList.indexOf(adjList[u][i]),1)
        }
    }

    isVisited[u] = false;
}

function setSelectedAsFriends(){
    if(adjList.length == 0){
        // Only init the graph first time  when someone is set as friend.
        console.log("initializing the graph");
        Graph(friendList.length);
    }
    
    var graphNodesToBeAddedAsFriends = []

    friendList.forEach(friend => {
        //console.log("friend name is ", friend.name ,"vin1 value of name is ", event.target.name, "checked is ", event.target.checked);        
            if (friend.isChecked){
                graphNodesToBeAddedAsFriends.push(friend.graphNode)                             
                }
            })
    
    console.log("graphNodesToBeAddedAsFriends", graphNodesToBeAddedAsFriends)
    addEdge(graphNodesToBeAddedAsFriends[0],graphNodesToBeAddedAsFriends[1]);

    }

function showCommonFriends (){

    var graphNodesSelectedForCommonFriend = []

    friendList.forEach(friend => {
        //console.log("friend name is ", friend.name ,"vin1 value of name is ", event.target.name, "checked is ", event.target.checked);
        
            if (friend.isChecked){
                graphNodesSelectedForCommonFriend.push(friend.graphNode)                             
                }
            })
    
    console.log("graphNodesSelectedForCommonFriend", graphNodesSelectedForCommonFriend)
    //source
    let source = graphNodesSelectedForCommonFriend[0] //pam

    //target
    let target = graphNodesSelectedForCommonFriend[1] //jan

    console.log("Following are all different paths from " + source + " to " + target);
    printAllPaths(source, target);

}
var common_frnds= finalAnswerPaths.join("->")
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
                
        {/* </ListGroup>   */}
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
            <Button  variant="dark" onClick={()=>{showCommonFriends();handleShow()}}>Show Common Friends</Button>
            <br/>
            <br/>
            <Button  variant="dark" onClick={setSelectedAsFriends}>Set selected as friends</Button>

            <>
            <Modal show= {show} onHide={handleClose}>
            <Modal.Header >
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {common_frnds}
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>


            
        </Container>
    )
}
//friends list should be visible onload
//select any 2 friends
//2 select option, show friends and add friends

