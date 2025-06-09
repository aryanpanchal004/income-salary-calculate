window.onload = () => {
    renderData();
};

document.getElementById("incomeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("incomeTitle").value;
    const amount = parseFloat(document.getElementById("incomeAmount").value);

    if (!title || amount <= 0 || isNaN(amount)) {
        return alert("Kindly enter valid details");
    }

    const income = {
        id: Date.now(),
        title,
        amount
    };

    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    incomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    this.reset();
    renderData();
});

document.getElementById("expensesForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("expenseTitle").value;
    const amount = parseFloat(document.getElementById("expensesAmount").value);

    if (!title || amount <= 0 || isNaN(amount)) {
        return alert("Please enter a valid amount");
    }

    const expense = { id: Date.now(), title, amount };
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    this.reset();
    renderData();
});

// Corrected delete function
function deleteItem(id, type) {
    const key = type === "income" ? "incomes" : "expenses";
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const filtered = data.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    renderData();
}

function renderData() {
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const incomelist = document.getElementById("incomeList");
    incomelist.innerHTML = "";
    let totalIncome = 0;

    incomes.forEach(item => {
        totalIncome += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `${item.title}: ${item.amount} 
        <button onclick="deleteItem(${item.id}, 'income')">❌</button>`;
        incomelist.appendChild(li);
    });

    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    let totalExpense = 0;

    expenses.forEach(item => {
        totalExpense += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `${item.title}: ${item.amount} 
        <button onclick="deleteItem(${item.id}, 'expense')">❌</button>`;
        expenseList.appendChild(li);
    });

    document.getElementById("totalIncome").innerText = totalIncome;
    document.getElementById("totalExpense").innerText = totalExpense;
    document.getElementById("balance").innerText = totalIncome - totalExpense;
}
