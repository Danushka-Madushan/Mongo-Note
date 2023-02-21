import { createNote, getInput, removeItemfromDB } from "./locals.js"

const userNotes = document.querySelector('.items')
const ghostCalss = document.querySelector('.info-class')

const NewNote = (content, id, refresh) => {
    $(ghostCalss).fadeOut(() => {
        let newItem = createNote(content, id, refresh)
        if (newItem) {
            $(newItem).hide()
            userNotes.append(newItem)
            $(newItem).fadeIn()
        }
    })
}

const RefreshNotes = () => {
    let target = document.querySelector('.refresh')
    $(target).css('animation', 'setRotation 2s infinite linear')

    const clearAnim = () => {
        $(target).fadeOut(()=>{
            $(target).css('animation', 'none');
            target.className = 'fa-solid fa-circle-check refresh'
            $(target).css('color', '#009B77');
            $(target).fadeIn()
            setTimeout(() => {
                $(target).fadeOut(() => {
                    target.className = 'fa-solid fa-rotate refresh'
                    $(target).css('color', '#fff')
                    $(target).fadeIn()
                });
            }, 1000)
        })
    }

    $.ajax({
        type: "GET",
        url: "/db/request",
        success: (data) => {
            if (data.length != 0) {
                let idList = []
                for (let x of data) {
                    idList.push(x['_id'])
                }
                for (let each of document.getElementsByClassName('note')) {
                    if (!idList.includes(each.id)) {
                        $(each).slideUp(() => {
                            each.remove()
                        })
                    }
                }
                for (let each of data) {
                    NewNote(each['content'], each['_id'], true)
                }
            } else {
                for (let each of document.getElementsByClassName('note')) {
                    each.remove()
                }
                $(ghostCalss).fadeIn()
            }
            clearAnim()
        },
        error: (errMsg) => {
            console.log(errMsg)
        }
    })
}

$('.addItem').click(() => {
    let value = getInput()
    if (value) {
        NewNote(value)  
    }
})

$('.items').on('click', '.remove', (e) => {
    let target = e.currentTarget
    let item = target.nextElementSibling.parentNode
    if (target.childNodes.length <= 1) {
        removeItemfromDB(item.id)
        $(target.children[0]).fadeOut(100, () => {

            let tick = document.createElement('i')
            tick.className = 'fa-solid fa-circle-check'
            $(target).css('color', '#009B77')
            $(tick).hide()
            target.append(tick)

            $(tick).fadeIn(()=> {
                $(item).slideUp()
                $(item).fadeOut(() => {
                    if (userNotes.children.length <= 2) {
                        $(ghostCalss).fadeIn(() => {
                            $(item).remove()
                        })
                    } else {
                        $(item).remove()
                    }
                })
            })
        })
    }
})

$('.items').on('click', '.copy', (e) => {
    let content = e.currentTarget
    .nextSibling
    .parentNode
    .children[1]
    .children[0]
    .innerText
    navigator.clipboard.writeText(content)

})

$('.refresh').click( (e) => { 
    RefreshNotes()
})

$( document ).ready(() => {
    RefreshNotes()
})