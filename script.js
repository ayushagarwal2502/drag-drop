const operationStack = [];

function handleUndo () {
  console.log("Undo called");
  if (!operationStack.length) {
    alert('No box has been moved yet');
    return;
  }

  swapBoxes(operationStack.pop());  
}

function swapBoxes([src, dest]) {
  console.log("swap called", src, dest);
  
  const tempContent = src.innerHTML;
  const tempID = src.id;

  src.innerHTML = dest.innerHTML; src.id = dest.id;
  dest.innerHTML = tempContent; dest.id = tempID; 
}


document.addEventListener('DOMContentLoaded', (event) => {

  /* drop targets */
  let boxes = document.querySelectorAll('.item .box');
  let srcBox;

  boxes.forEach(box => {
    box.addEventListener('dragstart',dragStart);
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('dragleave', dragEnd);
    box.addEventListener('drop', handleDrop);
  });

  function dragStart(e) {
    this.style.opacity = '0.4';
    srcBox = this;
    e.dataTransfer.effectAllowed = 'move';
  }

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }

  function dragEnd(e){
    this.style.opacity = '1';
    items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
  
    function dragOver(e) {
      e.preventDefault();
      return false;
    }
  
    function dragEnter(e) {
      this.classList.add('over');
    }
  
    function dragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.

    if (srcBox !== this) {
      operationStack.push([srcBox, this]);
      swapBoxes(operationStack[operationStack.length - 1]);     
    }
  return false;    
}

});