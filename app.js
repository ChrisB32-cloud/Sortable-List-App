const draggable_list = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

// richest people are in order
const richTurds = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerbuerg',
  'Michael Bloomberg',
  'Larry Page'
];

// store the list items
const listItems = [];

// keep track of the idx of each list item
let dragStartIdx;

createList();

// insert list items into DOM
function createList() {
  [...richTurds]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((turd, index) => {
      // console.log(turd);
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="turd-name">${turd}</p>
            <i class="fas fa-grip-lines"
        </div>
       `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('event: ', 'dragstart');
  dragStartIdx = this.closest('li').getAttribute('data-index');
  // console.log(dragStartIdx);
}

function dragOver(e) {
  // console.log('event: ', 'dragover');
  e.preventDefault();
}

function dragEnter() {
  // console.log('event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('event: ', 'dragleave');
  this.classList.remove('over');
}

function dragDrop() {
  // console.log('event: ', 'drop');
  const dragEndIdx = +this.getAttribute('data-index');
  swapItems(dragStartIdx, dragEndIdx);

  this.classList.remove('over');
}

// swap list items that are drag and drop
function swapItems(fromIdx, toIdx) {
  const itemOne = listItems[fromIdx].querySelector('.draggable');
  const itemTwo = listItems[toIdx].querySelector('.draggable');

  listItems[fromIdx].appendChild(itemTwo);
  listItems[toIdx].appendChild(itemOne);
}

// check the order of the list itmes on button click
function checkOrder() {
  listItems.forEach((listItem, idx) => {
    const turdName = listItem.querySelector('.draggable').innerText.trim();
    // console.log(turdName);
    if (turdName !== richTurds[idx]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);

check.addEventListener('click', function() {
  checkOrder();
});
