let addToy = false;
let newToyForm = document.getElementById('new-toy-form')
let url = 'http://localhost:3000/toys/'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch(url)
  .then(response => response.json())
  .then(toysData => toysData.forEach(toy => renderToy(toy)))
}

fetchToys(); 

function renderToy(toy) {
  let toyCollection = document.getElementById('toy-collection')
  let toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyCollection.appendChild(toyDiv)

  let h2 = document.createElement('h2')
    h2.textContent = toy.name
    toyDiv.appendChild(h2)

  let img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
    toyDiv.appendChild(img)

  let p = document.createElement('p')
    p.textContent = toy.likes
    p.id = `${toy.id}-like-tag`
    toyDiv.appendChild(p)

  let btn = document.createElement('btn')
    btn.className = 'like-btn'
    btn.id = toy.id
    btn.textContent = 'Like ❤️'
    btn.addEventListener('click', () => {
      toy.likes++
      updateLikes(toy)
    })
    toyDiv.appendChild(btn)
}

function updateLikes(toy) {
  const toyUrl = url  + toy.id
  const newNumberOfLikes = toy.likes

  let patchRequest = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  
  }
  fetch(toyUrl, patchRequest)
    .then(response => response.json())
    .then(data => {
      document.getElementById(`${toy.id}-like-tag`).textContent =toy.likes
    })

}
newToyForm.addEventListener('submit', event => newToy(event))


function newToy(event){
  event.preventDefault()
  let toyName = document.getElementById('new-toy-name').value
  let toyImg = document.getElementById('new-toy-img').value

  const newToyObj = {
    name: toyName, 
    image: toyImg,
    likes: 0
  }

  let postRequest = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  
  }
  fetch(url, postRequest)
    .then(response => response.json())
    .then(data => renderToy(data))    
}

