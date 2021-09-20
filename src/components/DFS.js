import React from 'react'

export default function DFS() {
    let v;
    let adjList;

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
    for (let i =1; i<= v ; i++){ //v=5
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
            let pathList = []
    
            //add source to path[]
            pathList.push(s);
    
            //call recursive utility
            printAllPathUtil(s,d, isVisited, pathList);
    
        }
    }

    function printAllPathUtil(u, d , isVisited, localPathList){
        if(u==(d)) {
            document.write(localPathList + "<br>")
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

    //create a sample graph
    Graph(1)
    addEdge(1,5)
    addEdge(1,3)
    addEdge(1,4)
    addEdge(3,2)
    addEdge(2,4)



    return (
        <div>
            
        </div>
    )
}



//[[],[5],[],[],[],[1]] u=1,v=5

//[[],[5,3],[],[1],[],[1]] u=1,v=3

//[[],[5,3,4],[],[1],[1],[1]] u=1,v=4

//[[],[5,3,4],[3],[1,2],[1],[1]] u=3,v=2

//[[],[5,3,4],[3,4],[1,2],[1,2],[1]] u=2,v=4








//source
let source = 2 //pam

//target
let target = 5 //jan

document.write(
    "Following are all different paths from "
    + s + " to " + d+"<Br>");
    printAllPaths(s, d);
         