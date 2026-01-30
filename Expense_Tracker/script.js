let expenses = [];

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

const submitBtn = document.getElementById("submitBtn");
const expenseList = document.getElementById("expenseList");

function validateInputs(){

    let isValid = true;

    document.getElementById("titleError").textContent = "";
    document.getElementById("amountError").textContent = "";
    document.getElementById("categoryError").textContent = "";
    document.getElementById("dateError").textContent = "";

    if(title.value.trim() === ""){
        document.getElementById("titleError").textContent = "Title is required";
        isValid = false;
    }

    if(amount.value === "" || Number(amount.value) <= 0){
        document.getElementById("amountError").textContent = "Enter a valid amount";
        isValid = false;
    }

    if(!category.value){
        document.getElementById("categoryError").textContent = "Please select a category";
        isValid = false;
    }

    if(date.value === ""){
        document.getElementById("dateError").textContent = "Please choose a date";
        isValid = false;
    }

    return isValid;
}


submitBtn.addEventListener("click", function(e){

    e.preventDefault(); 

    if(!validateInputs()){
        return;
    } 

    const expense = {
        id: Date.now(),
        title: title.value.trim(),
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    expenses.push(expense);

    renderExpenses();

    clearForm();
});


function renderExpenses(){

    expenseList.innerHTML = "";

    if(expenses.length === 0){
        expenseList.innerHTML = "<p>No expenses added yet.</p>";
        return;
    }

    expenses.forEach(exp => {

        const div = document.createElement("div");

        div.className = "border rounded p-2 mb-2 d-flex justify-content-between align-items-center";

        div.innerHTML = `
            <div>
                <strong>${exp.title}</strong><br>
                ₹${exp.amount} | ${exp.category} | ${exp.date}
            </div>

            <button class="btn btn-danger btn-sm"
                onclick="deleteExpense(${exp.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(div);
    });
}


function deleteExpense(id){

    expenses = expenses.filter(exp => exp.id !== id);

    renderExpenses();
}

function clearForm(){

    title.value = "";
    amount.value = "";
    category.value = "";
    date.value = "";
}
