const table = document.getElementById('table')
const addButton = document.getElementById('add')
addButton.onclick = () => newTableInfo()


const keys = ['#', 'name', 'amount', 'date', '']
let data = JSON.parse(localStorage.getItem('data')) || []


//data
function getDate() {
    const date = new Date()
    const setDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes()) + ':' + (date.getSeconds())
    return setDate
}

// create new row
function renderTable() {
    data.map((item) => {
        const rowElement = document.createElement('tr')

        for (let key of keys) {
            const columnElement = document.createElement('td')

            if (key === 'Date') {
            } else {
                columnElement.textContent = item[key]
            }

            rowElement.appendChild(columnElement)

        }
        table.appendChild(rowElement)
    })
    deleteEditButtons()
}

//add NEW info to table
function newTableInfo() {
    table.innerHTML = ' '
    const nameInput = document.getElementById('inputName').value
    const amountInput = document.getElementById('inputAmount').value
    const idValue = data.length + nameInput


    const newInfo = {
        id: idValue,
        name: nameInput,
        amount: amountInput,
        date: getDate()
    }

    data.push(newInfo)
    setItem('data', data)
    renderTable()

}



function deleteEditButtons() {
    table.innerHTML = ' '
    data.map((data, index) => {
        const rowElement = document.createElement('tr')

        for (let key of keys) {
            const columnElement = document.createElement('td')
            columnElement.textContent = data[key]

            if (key === '#') {
                columnElement.textContent = index + 1
            } else if (!key) {
                const editButton = document.createElement('button')
                editButton.textContent = 'Edit'
                editButton.classList.add('btn', 'btn-secondary')
                editButton.onclick = () => {
                    const popup = document.getElementById('popup')
                    popup.style.display = 'block'

                    const inputName = document.getElementById('firstInput')
                    inputName.value = data.name

                    const inputAmount = document.getElementById('secontInput')
                    inputAmount.value = data.amount

                    const confirm = document.getElementById('editButton')
                    confirm.onclick = () => {
                        data.name = inputName.value
                        data.amount = inputAmount.value
                        data.date = getDate()

                        setItem('data', data)
                        renderTable()

                    }

                    const cancelButton = document.getElementById('cancelButton')
                    cancelButton.textContent = 'Cancel'
                    cancelButton.onclick = () => {
                        popup.style.display = 'none'
                    }
                }

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Delete'
                deleteButton.classList.add('btn', 'btn-danger')
                deleteButton.onclick = () => del(data.id)

                columnElement.appendChild(editButton)
                columnElement.appendChild(deleteButton)
            }

            rowElement.appendChild(columnElement)
        }
        table.appendChild(rowElement)
    })

}

function del(id) {
    data = data.filter(item => item.id !== id)
    localStorage.setItem('data', JSON.stringify(data))
    renderTable()
}

function setItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value))
}

renderTable()