//with fetch you get a promise when you call the API. If its resilved, you get a response 
//the response inst the actual data you want but rather details about the JSON filesuch as the status, redirect, header

fetch('/Fetch basics/movies.json').then((response) => {
    console.log(response)
    return response.json()// we return the json contents 
}).then((data) => {
    console.log(data); //this is where we can see our json file in the browser
})


//you can implicitly call the response without return
fetch('/Fetch basics/test.txt').then((response) => response.text())
.then((data) => console.log(data))

//fetching from an API online
fetch('https://api.github.com/users/MainBank5/repos').then((response) => response.json())
.then((data) => {
    console.log(data)
    data.forEach(m => {
        console.log(m.name)
    })
})



fetch('/Fetch basics/directors.json').then((response) => {
    console.log(response)
    return response.json();
}).then((data) => console.log(data)).catch((err) => console.log(err))

//async and wait

const getTodo = async () => {
    const response = await fetch('/Fetch basics/todo.json');

    if (response.status !== 200) {
        throw new Error('Cannot fetch the data')
    }
    //console.log(response); - gives you the status
    const data = await response.json();
    //console.log(data) gets you the actual data in the api 
    return data;
}

getTodo().then((data) => console.log(data)).catch((err) => console.log( 'rejected :', err.message))

function createPost ({title, body}) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST', 
        body: JSON.stringify({
            title,
            body,
        }), 
        headers: {
            'Content-Type' : 'application/json',
            token: 'abc123'
        }
    }).then((res) => res.json())
       .then ((data)=> console.log(data));
}


createPost({title:'My post', body:"This is my body"})


const apiURL = 'https://jsonplaceholder.typicode.com/todos'

const getTodos = () => {
    fetch(apiURL + '?_limit=5')
    .then((response) => response.json())
    .then((data) => {
        //console.log(data)
        data.forEach((todo) => {
            console.log(todo.title);
            addToDoToDom(todo);
        })
    })
} 

getTodos()

const addToDoToDom = (todo) => {
    const div = document.createElement('div')
    div.innerText = todo.title;
    div.setAttribute('data-id' , todo.id);
    div.classList.add('done');
            
    if(todo.completed) {
        div.classList.add('hot');
    }
    document.querySelector('#todo-list').appendChild(div);
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createToDO);
}

init();