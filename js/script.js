// console.log("Hello");

const formElement = document.querySelector('.add-items')
// console.log(formElement);
const itemList = document.querySelector('.plates')
// console.log(itemList);
let items = JSON.parse(localStorage.getItem('items')) || []

const getForm = function (e) {
    e.preventDefault();
    // console.log("Succesfully");
    // console.log(this);
    const text = this.querySelector('[name = item]').value;
    // console.log(text);
    const item = {
        text : text,
        done : false
    }
    items.push(item)
    // console.log(items);
    showItemsInHtml(items)
    localStorage.setItem("items",JSON.stringify(items));
    this.querySelector('[name = item]').value = ' ' 
}



const showItemsInHtml = function (lists) {
    if (lists.length === 0) {
        itemList.innerHTML = '<li>No items to display</li>';
        return;
    }
    let html = ''
    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        let htnlElement = `
            <li>
            <input type="checkbox" data-index=${i} id="item-${i}" ${list.done ? 'checked' : ''}>
            <label for="item-${i}">${list.text}</label>
            </li>
        `
        html += htnlElement
    }
    itemList.innerHTML = html
}




const toggleDone = function (e) {
    // console.log(e.target.tagName);
    if(!(e.target.tagName === 'INPUT')) return;
    // console.log(e.target);
    const index = e.target.dataset.index;
    // console.log(index);
    items[index].done = !items[index].done
    localStorage.setItem("items",JSON.stringify(items));
    showItemsInHtml(items)
}




const deleteBtn = document.getElementById('delete-btn')
// console.log(deleteBtn);

const deleteItems = function () {
    items = [] 
    localStorage.removeItem('items')
    // console.log(items);
    showItemsInHtml(items)
}



const ckeckAllElement =document.getElementById('check-items')
// console.log(ckeckAllElement);


// NOTE: check all items
const checkAll = function () {
    // console.log(items);
    items.forEach(item => {
        if(item.done === true) return;
        item.done = true
    })
    // NOTE: baraye save krdn dar local strorge
    localStorage.setItem("items",JSON.stringify(items));
    // NOTE: baraye update krdne HTML page
    showItemsInHtml(items)
}




const uncheckAllItems = document.getElementById('uncheck-items')
// console.log(uncheckAllItems);


const uncheckItems = function () {
    console.log(items);
    items.forEach(item => {
        if(item.done === false) return;
        item.done = false
    })

    // NOTE: baraye save krdn dar local strorge
    localStorage.setItem("items",JSON.stringify(items));
    // NOTE: baraye update krdne HTML page
    showItemsInHtml(items)
}








formElement.addEventListener('submit', getForm)




// NOTE: event Delegation
itemList.addEventListener('click',toggleDone)

window.addEventListener('load',showItemsInHtml(items))


deleteBtn.addEventListener('click',deleteItems)

ckeckAllElement.addEventListener('click',checkAll)


uncheckAllItems.addEventListener('click',uncheckItems)



