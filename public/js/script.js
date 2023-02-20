import { createNote, getInput, removeItemfromDB } from "./locals.js"

const userNotes = document.querySelector('.items')
const ghostCalss = document.querySelector('.info-class')

$('.addItem').click(() => {
    let value = getInput()
    if (value) {
        $(ghostCalss).fadeOut(() => {
            let newItem = createNote(value, '', '')
            $(newItem).hide();
            userNotes.append(newItem)
            $(newItem).fadeIn();
        });        
    }
});

$('.items').on('click', '.remove', (e) => {
    let target = e.currentTarget
    let item = target.nextElementSibling.parentNode
    if (target.childNodes.length <= 1) {
        removeItemfromDB(item.id)
        $(target.children[0]).fadeOut(100, () => {

            let tick = document.createElement('i')
            tick.className = 'fa-solid fa-circle-check'
            $(target).css('color', '#009B77');
            $(tick).hide();
            target.append(tick)

            $(tick).fadeIn(()=> {
                $(item).slideUp();
                $(item).fadeOut(() => {
                    if (userNotes.children.length <= 2) {
                        $(ghostCalss).fadeIn(() => {
                            $(item).remove();
                        });
                    } else {
                        $(item).remove();
                    }
                });
            });
        });
    }
});

$('.items').on('click', '.copy', (e) => {
    let content = e.currentTarget
    .nextSibling
    .parentNode
    .children[1]
    .children[0]
    .innerText
    navigator.clipboard.writeText(content);
});
