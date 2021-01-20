
const BASE_URL = 'http://localhost:3000/monsters/'

let sub_url = 1

document.addEventListener("DOMContentLoaded", () => {
  create_form();
  getMonster();
  back_btn();
  fw_btn();
  
})

const create_form = () => {
  let create_form = document.querySelector('#create-monster');
  
  let form = document.createElement('form')
  form.id = "form"
  form.innerHTML = `
        <input id='search' type='text' name='name'>
        <input id='search' type='text' name='age'>
        <input id='search' type='text' name='description'>
        <input type='submit' name='submit'/>`

  create_form.appendChild(form)

  document.querySelector('#form').addEventListener('submit', event => updateMonster(event))
}


const updateMonster = (event) => {
  event.preventDefault()
  newMonster = {
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.description.value
  }

  let reqPackage = {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(newMonster)
    }

  fetch(BASE_URL, reqPackage)
  .then(res => res.json())
  .then(monster => renderMonster(monster))
  document.querySelector('#form').reset()
}


const back_btn = () => {
  document.querySelector('#back').addEventListener('click', () => {
    sub_url -= 1;
  })
  getMonster(sub_url);
}

const fw_btn = () => {
  document.querySelector('#forward').addEventListener('click', () => {
    sub_url += 1;
    getMonster(sub_url);
  })
}


const getMonster = async (sub_url) => {
  document.querySelector('#monster-container').innerHTML = ""

  const res = await fetch(BASE_URL+`?_limit=50&_page=${sub_url}`);
  const monsters = await res.json();
  monsters.forEach(monster => renderMonster(monster));
}

const renderMonster = (monster) => {
  div = document.querySelector('#monster-container')

  s_div = document.createElement('div')
  
  let h2 = document.createElement('h2')
  h2.innerText = `Name: ${monster.name}`

  let h4 = document.createElement('h4')
  h4.innerText = `Age: ${monster.age}`
  
  let p = document.createElement('p')
  p.innerText = `Description: ${monster.description}`

  div.append(s_div)
  s_div.append(h2, h4, p)
  
}



// `Name<input id='search' type='text' name='name'>
//       Age<input id='search' type='text' name='age'>
//       Destination<input id='search' type='text' name='description'>
//       <input type='submit' name='submit'/>`