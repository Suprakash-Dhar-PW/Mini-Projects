let expenses = [];

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");

const submitBtn = document.getElementById("submitBtn");
const expenseList = document.getElementById("expenseList");

const totalExpenses = document.getElementById("totalExpenses");
const categoryTotals = document.getElementById("categoryTotals");
const highestCategory = document.getElementById("highestCategory");

const loadingText = document.getElementById("loadingText");

function validateInputs() {

    let isValid = true;

    titleError.textContent = "";
    amountError.textContent = "";
    categoryError.textContent = "";
    dateError.textContent = "";

    if (title.value.trim() === "") {
        titleError.textContent = "Title is required";
        isValid = false;
    }

    if (amount.value === "" || Number(amount.value) <= 0) {
        amountError.textContent = "Enter a valid amount";
        isValid = false;
    }

    if (!category.value) {
        categoryError.textContent = "Select a category";
        isValid = false;
    }

    if (!date.value) {
        dateError.textContent = "Choose a date";
        isValid = false;
    }

    return isValid;
}

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    if (!validateInputs()) return;

    const expense = {
        id: Date.now(),
        title: title.value.trim(),
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    loadingText.style.display = "block";

    submitBtn.disabled = true;

    setTimeout(() => {

        expenses.push(expense);

        renderExpenses();
        updateSummary();
        clearForm();

        loadingText.style.display = "none";

        submitBtn.disabled = false;

    }, 1000);
});

function renderExpenses() {

    expenseList.innerHTML = "";

    let processedExpenses = [...expenses];

    if (filterCategory.value !== "All") {
        processedExpenses = processedExpenses.filter(
            exp => exp.category === filterCategory.value
        );
    }

    if (sortBy.value === "amount") {
        processedExpenses.sort((a, b) => b.amount - a.amount);
    } 
    else {
        processedExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    if (processedExpenses.length === 0) {
        expenseList.innerHTML =
            "<p class='text-muted'>No expenses found.</p>";
        return;
    }

    processedExpenses.forEach(exp => {

        const div = document.createElement("div");

        div.className =
            "border rounded p-2 mb-2 d-flex justify-content-between align-items-center";

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


function deleteExpense(id) {

    expenses = expenses.filter(exp => exp.id !== id);

    renderExpenses();
    updateSummary();
}

function clearForm() {

    title.value = "";
    amount.value = "";
    category.value = "";
    date.value = "";
}

function updateSummary() {

    const total = expenses.reduce(
        (sum, exp) => sum + exp.amount, 0
    );

    totalExpenses.textContent = total;

    const totals = {};

    expenses.forEach(exp => {
        totals[exp.category] =
            (totals[exp.category] || 0) + exp.amount;
    });

    categoryTotals.innerHTML = "";

    for (let cat in totals) {

        const p = document.createElement("p");
        p.textContent = `${cat}: ₹${totals[cat]}`;

        categoryTotals.appendChild(p);
    }

    let max = 0;
    let highest = "None";

    for (let cat in totals) {

        if (totals[cat] > max) {
            max = totals[cat];
            highest = cat;
        }
    }

    highestCategory.textContent = highest;
}

filterCategory.addEventListener("change", renderExpenses);
sortBy.addEventListener("change", renderExpenses);
