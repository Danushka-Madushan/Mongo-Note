const userInput = document.querySelector('.user-note')

const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const addItemtoDB = (content, id) => {
    console.log({content: `${content}`, id:id})
}

export const removeItemfromDB = (id) => {
    console.log(id)
}

export const getInput = () => {
    return (userInput.value ? userInput.value : false)
}

export const createNote = (data) => {
    let date = new Date().toISOString().slice(0, 10)
    let nt = document.createElement('div')
    nt.className = 'note'
    nt.id = uuidv4()
    nt.innerHTML = `
    <button class="remove" type="button"><i class="fa-solid fa-circle-notch"></i></button>
    <div class="item-content">
        <span class="content">${data}</span>
        <span class="add-date">Today</span>
    </div>
    <button class="copy" type="button"><i class="fa-solid fa-clipboard"></i></button>
    `
    addItemtoDB(data, nt.id)
    return nt
}