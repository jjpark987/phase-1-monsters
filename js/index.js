document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    let monsterDiv = document.createElement('div')
    let page = 1

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        for(const monster of data) {
            createMonsterDiv(monster)

            monsterContainer.appendChild(monsterDiv)
        }
    })
    .catch(() => alert('There was an error with the GET request.'))

    const createMonsterDiv = function (monsterObject) {
        monsterDiv = document.createElement('div')
        
        const name = document.createElement('h2')
        name.textContent = monsterObject.name

        const age = document.createElement('h4')
        age.textContent = `Age: ${monsterObject.age}`

        const description = document.createElement('p')
        description.textContent = `Bio: ${monsterObject.description}`

        monsterDiv.append(name, age, description)
    }
    
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    form.addEventListener('submit', event => {
        event.preventDefault()

        const newMonster = {
            name: event.target[0].value,
            age: event.target[1].value,
            description: event.target[2].value
        }
        
        createMonsterDiv(newMonster)
        
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMonster)
        })
        .then(response => response.json())
        .then(() => {})
        .catch(() => alert('There was an error with the POST request.'))
    })
    
    const inputName = document.createElement('input')
    inputName.placeholder = 'name...'
    
    const inputAge = document.createElement('input')
    inputAge.placeholder = 'age...'
    
    const inputDescription = document.createElement('input')
    inputDescription.placeholder = 'description...'

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Create'

    form.append(inputName, inputAge, inputDescription, submitButton)
    formContainer.appendChild(form)

    const back = document.getElementById('back')
    back.addEventListener('click', () => {
        if(page !== 1) {
            monsterContainer.textContent = ''
            page --
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(response => response.json())
            .then(data => {
                for(const monster of data) {
                    createMonsterDiv(monster)

                    monsterContainer.appendChild(monsterDiv)
                }
            })
            .catch(() => alert('There was an error with the GET request.'))
        } else {
            alert('Aint no monsters here!')
        }
    })

    const forward = document.getElementById('forward')
    forward.addEventListener('click', () => {
        monsterContainer.textContent = ''
        page ++
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(response => response.json())
            .then(data => {
                for(const monster of data) {
                    createMonsterDiv(monster)

                    monsterContainer.appendChild(monsterDiv)
                }
            })
            .catch(() => alert('There was an error with the GET request.'))
    })
})