// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA22scWbI5pYjRvK7QKOD8rkObki45L5CI",
    authDomain: "todo-app-be9e3.firebaseapp.com",
    databaseURL: "https://todo-app-be9e3-default-rtdb.firebaseio.com",
    projectId: "todo-app-be9e3",
    storageBucket: "todo-app-be9e3.appspot.com",
    messagingSenderId: "278682365734",
    appId: "1:278682365734:web:d575b3ca7733d2cce9dbe7"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);



firebase.database().ref("User-Tasks").on("child_added",(data)=>{
    var list = document.getElementById("listItems")
    var listElement = document.createElement("li")
    var listNode = document.createTextNode(data.val().userTask)
    var editbtn = document.createElement("button")
    var edittext = document.createTextNode("Edit")
    var delbtn = document.createElement("button")
    var delbtntext = document.createTextNode("Delete")
    
    listElement.appendChild(listNode)
    editbtn.appendChild(edittext)
    editbtn.setAttribute("id",data.val().key)
    editbtn.setAttribute("onclick", "edititem(this)")
    listElement.appendChild(editbtn)
    delbtn.appendChild(delbtntext)
    delbtn.setAttribute("id",data.val().key)
    listElement.appendChild(delbtn)
    delbtn.setAttribute("onclick", "deleteitem(this)")
    list.appendChild(listElement)
    
    // console.log(data.val())
    
    
})

// Add tasks function.....
function addTask() {
    var userInput = document.getElementById("input")
    
    var key = firebase.database().ref("User-Tasks").push().key
      var obj = {
        userTask : userInput.value,
        key:key
    }
    
    
    // send data to database
    firebase.database().ref("User-Tasks").child(key).set(obj)

    userInput.value = ''
}

function deleteAll() {
    var list = document.getElementById("listItems")

    firebase.database().ref("User-Tasks").remove()
    list.innerHTML = " "
}
function edititem(edit) {
    // var val = edit.parentNode.firstChild.nodeValue
    var userInputs = prompt("Enter your updated value..")

    var editUserTask= {
        userTask:userInputs,
        key:edit.id
    }

    firebase.database().ref("User-Tasks").child(edit.id).set(editUserTask)

    edit.parentNode.firstChild.nodeValue = userInputs
}
function deleteitem(del) {
    firebase.database().ref("User-Tasks").child(del.id).remove()
    del.parentNode.remove()
}

