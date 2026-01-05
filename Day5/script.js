let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const total = document.getElementById("total");
const error = document.getElementById("error");

let descText = "";
let inputAmount = 0;

desc.addEventListener("input", () => {
  descText = desc.value;
});

amount.addEventListener("input", () => {
  inputAmount = parseFloat(amount.value);
});

addBtn.addEventListener("click", () => {
  if (descText === "" || inputAmount <= 0) {
    error.innerText = "Invalid data entered! Please enter a valid data.";
    throw new Error("Invalid data entered");
  }
  error.innerText = "";
  let expense = { desc: descText, amount: inputAmount };
  expenses = [...expenses, expense];
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
  desc.value = "";
  amount.value = "";
  descText = "";
  inputAmount = "";
});

function render() {
  // 1. render list with delete button for each item
  const listItems = expenses.map((listItem, idx) => {
    return `<li>
        ${listItem.desc} : ${listItem.amount}
        <button class="delete" data-index="${idx}">Delete</button>
      </li>`;
  });
  // 2. calculate total
  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // 3. update UI
  const listHTML = listItems.join("");
  list.innerHTML = listHTML;
  total.innerText = totalAmount;
}
render();

// delete handler (event delegation)
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const idx = Number(e.target.dataset.index);
    expenses = expenses.filter((_, i) => i !== idx);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    render();
  }
});
