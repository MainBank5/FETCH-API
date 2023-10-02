//with fetch you get a promise when you call the API. If its resolved, you get a response 
//the response isn't the actual data you want but rather details about the JSON filesuch as the status, redirect, header

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
    if(!response.ok) {
        throw new Error('Something went wrong')
    }
    return response.json();
}).then((data) => console.log(data)).catch((err) => console.log(err))

//async and wait

const getTodo = async () => {
    const response = await fetch('/Fetch basics/todo.json');

    if (response.status !== 200) {
        throw new Error('Cannot fetch the data')
    }
    console.log(response); //gives you the status
    const data = await response.json();
    //console.log(data) gets you the actual data in the api 
    return data;
}

getTodo().then((data) => console.log(data)).catch((err) => console.log( 'rejected :', err.message));

//pay attention to the difference when you return data above and console.log(data)
const typicode = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6');

    const data = await response.json();

    console.log(data)
}

typicode();





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
    fetch(apiURL + '?_limit=4')
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
    div.classList.add('play')
            
    if(todo.completed) {
        div.classList.add('hot');
    }
    document.querySelector('#todo-list').appendChild(div);
}

const createToDO = (e) => {
    e.preventDefault();
    
    const newToDo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiURL, {
        method: "POST", 
        body: JSON.stringify(newToDo),
        headers:{
            'content-Type' : 'application/json'
        }
    }).then(res => res.json()).then(data => addToDoToDom(data))

}

const toggleCompleted = (e) => {

    if(e.target.classList.contains('play')){
        e.target.classList.toggle('hot');

        updateToDO(e.target.dataset.id, e.target.classList.contains('hot'))
    }
    
}

const updateToDO = (id, completed) => {
    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({completed}),
        headers: {
            'content-Type': 'application.json'
        }
    }).then((res) => res.json())
      .then(data => console.log(data))
}




const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createToDO);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted)
}

init();

//try ..... catch 

const movieShop = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=5");

        if (response.status === 200) {
            throw new Error ("Something is terribly wrong!!");
        }

        const data = await response.json();
        
        console.log(data)
   
}

movieShop();

