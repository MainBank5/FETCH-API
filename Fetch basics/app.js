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