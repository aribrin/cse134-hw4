/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    //walkBtnAdv
    element = document.getElementById('walkBtnAdv');
    element.addEventListener('click', function () {
        let walkTextArea = document.getElementById('walk-text');
        let root = document.documentElement;
        walkTextArea.value =  advancedWalk(root,0);
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    //modifyBtnAdv
    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    //addBtnAdv
    element = document.getElementById('addBtnAdv');
    element.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
    
        addAdv();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDelete');
    element.addEventListener('click', function () {
        let root = document.documentElement;
        safeDelete(root);
    });

    element = document.getElementById('selectorDelete');
    element.addEventListener('click', function () {
        selectorDelete();
    });

    element = document.getElementById('basicClone');
    element.addEventListener('click', function () {
        let root = document.documentElement;
        basicClone();
    });

    element = document.getElementById('advancedClone');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function advancedWalk(node, level) {
    let treeStructure = "";
    let indent = "  "; // 2 spaces for each level
    
    //this element
    if (node.nodeType === Node.TEXT_NODE) {
        let textContent = node.textContent.trim();
        if (textContent !== "") {
            treeStructure += `${indent.repeat(level)}|-- ${textContent}\n`;
        }
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {
        treeStructure += `${indent.repeat(level)}|-- ${node.tagName.toLowerCase()}\n`;
    }

    //add children
    if(node.childElementCount > 0){

        for (childNode of node.childNodes) {
            treeStructure += advancedWalk(childNode, level + 1);
        }
    }
   
    return treeStructure;
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let walkTextArea = document.getElementById('walk-text');
    walkTextArea.value = (`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify() {
    
    let h1_el = document.getElementById("h1");
    let p_el = document.getElementById("p1");

    // Change the text of the h1 element
    h1_el.innerHTML = "DOM Manipulation is Fun!";

    // Change the color of the h1 element to a random dark color
    let darkColors = ["--darkcolor1", "--darkcolor2", "--darkcolor3", "--darkcolor4", "--darkcolor5", "--darkcolor6"];
    let randomColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    h1_el.style.color = `var(${randomColor})`;

    // Toggle the class "shmancy" for the p element to apply the CSS text effect
    p_el.classList.toggle("shmancy");
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function addAdv() {
    let elementTypeSelect = document.getElementById("elementType");
    let elementContentInput = document.getElementById("elementContent");
    let outputDiv = document.getElementById("output");

    let elementType = elementTypeSelect.value;
    let elementContent = elementContentInput.value;

    let newElement;

    let currentTimeStamp = new Date().toLocaleString();

    if (elementType === "textNode") {
        newElement = document.createTextNode(`New Text Node (${currentTimeStamp}): ${elementContent}`);
    } else if (elementType === "comment") {
        newElement = document.createComment(`New Comment (${currentTimeStamp}): ${elementContent}`);
    } else if (elementType === "element") {
        let parser = new DOMParser();
        let parsedElement = parser.parseFromString(`<${elementContent}></${elementContent}>`, "text/html").body.firstChild;
        if (!parsedElement || !(parsedElement instanceof HTMLElement)) {
            alert("Invalid HTML element name!");
            return;
        }
        newElement = document.createElement(elementContent);
        newElement.innerHTML = `New Element (${currentTimeStamp})`;
        newElement.classList.add("new-element");
    }

    if (outputDiv) {
        outputDiv.appendChild(newElement);
      } 

      /*else {
        const outputSection = document.createElement("section");
        outputSection.id = "output";
        outputSection.classList.add("output");
        outputSection.appendChild(newElement);
        document.body.appendChild(outputSection);
      }*/
}

//Remove Functions
function remove() {
  document.body.removeChild(document.body.lastChild);
}


function safeDelete(startNode) {
    let elements = startNode.childNodes;
    let total = 0;
    // Delete elements from the bottom up, but skip the 'controls' section
    for (let i = elements.length - 1; i >= 0; i--) {
        let element = elements[i];
        if (!(element.id == 'controls')) {
            total += safeDelete(element);
        }else total += 10;
    }

    if(total == 0)
        startNode.remove();
    
    return total;
}

/*
function safeDelete(nodeToDelete) {
    let protectedSection = document.getElementById("controls");
    let total = 0;
    
    if(nodeToDelete.id == protectedSection.id) {
        console.log("hitsec")
        return 10;
    }
    
    if (nodeToDelete.childElementCount > 0) {
        for (const childNode of nodeToDelete.childNodes) {
            total += safeDelete(childNode);
        }
    }

    if (total === 0) {
        nodeToDelete.remove();
    }

    return total;
} */

function selectorDelete(){
    let selectorInput = document.getElementById("selectorInput").value;
    //let elements = document.querySelectorAll(selectorInput);

    // Delete elements that match the given selector
    //for (let i = 0; i < elements.length; i++) {
    //  const element = elements[i];
    for(element of document.querySelectorAll(selectorInput)) {
      element.remove();
    }
}

function basicClone() {
    let p1 = document.getElementById("p1");
    let clone = p1.cloneNode(true);
    //document.querySelector(".content").appendChild(clone);

    let outputDiv = document.getElementById("output");

    if (outputDiv) {
        outputDiv.appendChild(clone);
    } 
}

function advancedClone() {
    let cardTemplate = document.getElementById("cardTemplate");
    let clone = document.importNode(cardTemplate.content, true);
    let randomNumber = Math.floor(Math.random() * 1000);
    clone.querySelector(".card-title").textContent = `Card Title ${randomNumber}`;
    clone.querySelector(".card-text").textContent = `This is a card with some text. Random number: ${randomNumber}`;
    
    let outputDiv = document.getElementById("output");
    if (outputDiv) {
        outputDiv.appendChild(clone);
    } 
}


window.addEventListener('DOMContentLoaded', init);
