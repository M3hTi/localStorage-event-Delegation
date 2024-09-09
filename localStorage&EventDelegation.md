# Local Tapas Project Explanation

## 1. localStorage

localStorage is a web storage object that allows JavaScript websites and apps to store key-value pairs in a web browser with no expiration date. This means the stored data will persist even after the browser window is closed.

Key features of localStorage:
- Data is stored as strings, so you need to parse/stringify objects and arrays.
- It has a storage limit (usually around 5MB).
- Data is specific to the protocol of the page.
- It's synchronous, which means it can affect performance if overused.

Common methods:
- `localStorage.setItem(key, value)`: Add a key-value pair to localStorage.
- `localStorage.getItem(key)`: Retrieve a value by its key.
- `localStorage.removeItem(key)`: Remove an item by its key.
- `localStorage.clear()`: Clear all localStorage data.

## 2. Event Delegation

Event delegation is a technique where you add a single event listener to a parent element instead of adding listeners to multiple child elements. This is particularly useful when you have dynamically added elements or when dealing with a large number of similar elements.

Benefits of event delegation:
- Reduces memory usage by having fewer event listeners.
- Simplifies dynamic element handling.
- Can improve performance in certain scenarios.

How it works:
1. An event is triggered on a child element.
2. The event bubbles up through its ancestors.
3. The listener on the parent element handles the event.
4. You can check the event's target to determine which child triggered it.

## 3. HTML File Explanation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags and title -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="wrapper">
        <h2>LOCAL TAPAS</h2>
        <p></p>
        <ul class="plates">
          <li>Loading Tapas...</li>
        </ul>
        <form class="add-items">
          <input type="text" name="item" placeholder="Item Name" required>
          <input type="submit" value="+ Add Item">
        </form>
        <button id="delete-btn">Delete All Items</button>
        <button id="check-items">Check all of Items</button>
        <button id="uncheck-items">unchecked All of Items</button>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
```

This HTML file sets up the structure for the Local Tapas application:
- A heading "LOCAL TAPAS"
- An unordered list with class "plates" to display the items
- A form to add new items
- Buttons to delete all items, check all items, and uncheck all items

## 4. JavaScript File Explanation

```javascript
// Selecting DOM elements
const formElement = document.querySelector('.add-items');
const itemList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to handle form submission
const getForm = function (e) {
    e.preventDefault();
    const text = this.querySelector('[name = item]').value;
    const item = {
        text : text,
        done : false
    };
    items.push(item);
    showItemsInHtml(items);
    localStorage.setItem("items", JSON.stringify(items));
    this.querySelector('[name = item]').value = ' ';
};

// Function to display items in HTML
const showItemsInHtml = function (lists) {
    if (lists.length === 0) {
        itemList.innerHTML = '<li>No items to display</li>';
        return;
    }
    let html = '';
    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        let htmlElement = `
            <li>
            <input type="checkbox" data-index=${i} id="item-${i}" ${list.done ? 'checked' : ''}>
            <label for="item-${i}">${list.text}</label>
            </li>
        `;
        html += htmlElement;
    }
    itemList.innerHTML = html;
};

// Function to toggle item status
const toggleDone = function (e) {
    if(!(e.target.tagName === 'INPUT')) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    showItemsInHtml(items);
};

// Function to delete all items
const deleteItems = function () {
    items = [];
    localStorage.removeItem('items');
    showItemsInHtml(items);
};

// Function to check all items
const checkAll = function () {
    items.forEach(item => {
        if(item.done === true) return;
        item.done = true;
    });
    localStorage.setItem("items", JSON.stringify(items));
    showItemsInHtml(items);
};

// Function to uncheck all items
const uncheckItems = function () {
    items.forEach(item => {
        if(item.done === false) return;
        item.done = false;
    });
    localStorage.setItem("items", JSON.stringify(items));
    showItemsInHtml(items);
};

// Event listeners
formElement.addEventListener('submit', getForm);
itemList.addEventListener('click', toggleDone);
window.addEventListener('load', showItemsInHtml(items));
document.getElementById('delete-btn').addEventListener('click', deleteItems);
document.getElementById('check-items').addEventListener('click', checkAll);
document.getElementById('uncheck-items').addEventListener('click', uncheckItems);
```

This JavaScript file implements the functionality for the Local Tapas application:

1. It selects necessary DOM elements and initializes the `items` array from localStorage.
2. The `getForm` function handles adding new items to the list.
3. `showItemsInHtml` renders the list of items in the HTML.
4. `toggleDone` handles checking/unchecking individual items (using event delegation).
5. `deleteItems`, `checkAll`, and `uncheckItems` handle bulk operations on the list.
6. Event listeners are set up for various user interactions.

The code demonstrates the use of localStorage to persist data and event delegation for efficient event handling. It also shows how to dynamically update the DOM based on user interactions and data changes.
## 5. New Feature: Delete Checked Items

A new feature has been added to the Local Tapas application: the ability to delete all checked items at once. This functionality is implemented in the `deleteCheckItems` function:

```javascript
const deleteCheckItemsEl = document.getElementById('delete-check-items');

const deleteCheckItems = function () {
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if(item.done === true) {
            const index = items.indexOf(item);
            items.splice(index, 1);
        }
    }
    localStorage.setItem("items", JSON.stringify(items));
    showItemsInHtml(items);
};

deleteCheckItemsEl.addEventListener('click', deleteCheckItems);
```

### How it works:

1. **Backward Iteration**: 
   - The function iterates through the `items` array from the end to the beginning (`for (let i = items.length - 1; i >= 0; i--)`).
   - This approach is used to avoid issues that can occur when modifying an array while iterating forward through it.

2. **Checking and Removing Items**:
   - For each item, it checks if the item is marked as done (`if(item.done === true)`).
   - If the item is done, it finds the index of the item and removes it from the array using `splice`.

3. **Updating Storage and UI**:
   - After removing all checked items, the function updates the localStorage with the modified array.
   - It then calls `showItemsInHtml(items)` to update the UI, reflecting the changes made to the `items` array.

### Important Note:

While this function works, there's a potential optimization that could be made. The line `const index = items.indexOf(item)` is unnecessary because we already know the index (`i`) from the loop. The function could be simplified to:

```javascript
const deleteCheckItems = function () {
    for (let i = items.length - 1; i >= 0; i--) {
        if(items[i].done === true) {
            items.splice(i, 1);
        }
    }
    localStorage.setItem("items", JSON.stringify(items));
    showItemsInHtml(items);
};
```

This optimized version directly uses the loop index `i` to splice the array, avoiding the extra step of finding the index of each item.

### Event Listener:

An event listener is added to the "Delete Checked Items" button to trigger this function when clicked:

```javascript
deleteCheckItemsEl.addEventListener('click', deleteCheckItems);
```

This new feature enhances the functionality of the Local Tapas application by allowing users to easily remove multiple completed items at once, improving the overall user experience and management of the tapas list.