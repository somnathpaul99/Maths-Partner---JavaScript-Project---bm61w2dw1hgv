//getting resulatSection from the html and also it placed in global scope because it will used in below some function
const resultSection = document.getElementsByClassName("output")[0];

//placed this variable in global scope because it will used in below some function
//and this variable gets value from SearchButton function
let result;
let operation ;
let expression ; 

//when click SearchButton icon this function will fetch from Api and also append the Ans to the UI
async function SearchButton() {
   // Clear previous history from UI
  resultSection.innerHTML = '';
    // console.log("working");
    let problem = document.getElementById("problemSection").value;
    let category = document.getElementById("categorySection").value;
    const urlEncodedInput = encodeURIComponent(problem);
    const fetchApi = await fetch(`https://newton.vercel.app/api/v2/${category}/${urlEncodedInput}`)
    const data = await fetchApi.json();
    //  console.log(data)
     result = data.result;
     operation = data.operation;
     expression = data.expression;
  
    const div = document.createElement("div");
    div.className = "output";

    div.innerHTML = `
    <p class="key">${operation}: ${expression}</p>
    <p class="ans">Ans: ${result}</p>
  `;

  resultSection.appendChild(div);
}

//when click savedButton this function will saved all the details to the localStorage
function savedButton(){
  if (resultSection.innerHTML.trim() === '') {
    generateToastMessage("Nothing to Save"); // Show a toast message indicating there is nothing to save
    return; // Exit the function early if resultSection is empty
  }
  
  if (resultSection.innerText.trim() === 'History is Empty') {
    generateToastMessage("Nothing to Save"); // Show a toast message indicating there is nothing to save
    return; // Exit the function early if resultSection displays "History is Empty"
  }

  localStorage.setItem(`${operation}: ${expression}`, result);
  generateToastMessage("Answer Saved");

}

//when click historyButton this function will show all saved history to the UI
function historyButton() {
  // Clear previous history from UI
  resultSection.innerHTML = '';

  //if history is empty then this code will exicute
  if (localStorage.length === 0) {
    let p = document.createElement("p");
    p.innerText = "History is Empty";
    p.className = "history-storage";
    resultSection.appendChild(p);
    return; // Exit the function early if history is empty
  }


  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    let p = document.createElement("p");
    let ans = `${key} => Ans: ${value}`;
    p.innerText = ans;
    p.className = "history-storage";

    // Create a delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-button";

    // Append delete button to the <p> element
    p.appendChild(deleteButton);

    resultSection.appendChild(p);

    // When the delete button is clicked, remove the answer from local storage and UI
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the double-click event from firing
      resultSection.removeChild(p);
      // Remove item from localStorage
      localStorage.removeItem(key);
      generateToastMessage("This Answer Deleted");
    });
  }
}



//when click delete button once it will clear display
function deleteBtn() {
  resultSection.innerHTML = ""; // Clear displayed history
}

//getting delete button from html
const deleteHistory = document.getElementById("deleteBtn");

//adding an event Listener when dubble click the delete icon it will clear all localStorage history
deleteHistory.addEventListener("dblclick", ()=>{
  if (localStorage.length === 0) {
    generateToastMessage("Nothing to Clear"); // Show a toast message indicating there is nothing to save
    return; // Exit the function early if history is empty
  }
   
  localStorage.clear();
  generateToastMessage("Clear All Saved Answer")
})

//creating a function for toast messege
const container = document.getElementById("container");
let currentToast = null;

function generateToastMessage(string) {
  // Remove previous toast message if it exists
  if (currentToast) {
    currentToast.remove();
    currentToast = null;
  }

  const div = document.createElement("div");
  div.innerText = string;
  div.className = 'toast-message toast-message-slide-in';

  div.addEventListener('click', () => {
    div.classList.remove('toast-message-slide-in');
    div.classList.add('toast-message-slide-out');
    div.addEventListener('animationend', () => {
      div.remove();
    });
  });

  container.appendChild(div);
  currentToast = div;
}
