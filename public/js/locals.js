const userInput = document.querySelector('.user-note')

const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const addItemtoDB = (content, id) => {
    $.ajax({
        type: "POST",
        url: "/db/insert",
        data: JSON.stringify({content: `${content}`, id:id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: (errMsg) => {
            console.log(errMsg);
        }
    });
}

export const removeItemfromDB = (id) => {
    $.ajax({
        type: "POST",
        url: "/db/remove",
        data: JSON.stringify({id:id}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: (errMsg) => {
            console.log(errMsg);
        }
    });
}

export const getInput = () => {
    return (userInput.value ? userInput.value : false)
}

export const createNote = (data, id, refresh) => {
    let date = new Date().toISOString().slice(0, 10)

    if (!document.getElementById(id)) {
        let nt = document.createElement('div')
        nt.className = 'note'

        id ? nt.id = id : nt.id = uuidv4()
        refresh ? false : addItemtoDB(data, nt.id)

        nt.innerHTML = `
        <button class="remove" type="button"><i class="fa-solid fa-circle-notch"></i></button>
            <div class="item-content">
                <span class="content">${data}</span>
                <span class="add-date">Today</span>
            </div>
        <button class="copy" type="button"><i class="fa-solid fa-clipboard"></i></button>
        `
        return nt
    } else {
        return false
    }
}