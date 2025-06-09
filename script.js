window.onload=()=>{
    renderData();
}

// Add Income 
document.getElementById("incomeForm").addEventListener("submit",function(e){
  e.preventDefault();
  const title=document.getElementById("incomeTitle").value ;
  const amount=document.getElementById("incomeAmount").value ;
  if(!title || amount <=0)return alert("Kindly enter valid details");

  const income ={id:Date.now(),title,amount};
  const incomes=JSON.parse(localStorage.getItem("incomes"))|| [];
  incomes.push(income);
  localStorage.setItem("incomes",JSON.stringify(incomes));
  this.reset();
  renderData();
})

// Add expense
document.getElementById("expenseForm").addEventListener("submit",function(e){
    e.preventDefault();
    const title=document.getElementById("expenseTitle").value;
    const amount=document.getElementById("expenseAmount").value;
    if(!title || amount<=0)return alert("Please Enter a valid amount");
    const expense={id:Date.now(),title,amount};
    const expenses=JSON.parse(localStorage.getItem("expenses"));
    expenses.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenses));
    this.reset();
    renderData();
})

// Delete income/expense by id

function deleteItem(id,type){
    let data=JSON.parse(localStorage.getItem(type))||[];
    data=data.filter(item=>item.id !== id);
    localStorage.setItem(type,JSON.stringify(data));
    renderData();
}

function renderData(){
    const incomes=JSON.parse(localStorage.getItem("incomes")) || [] ;
    const expenses=JSON.parse(localStorage.getItem("expenses")) || [];

    // showing incomelist at screen

    const incomeList=document.getElementById("incomeList");
    incomeList.innerHTML="";
    let totalIncome=0;
    incomes.forEach(item=>{totalIncome+=item.amount;
        const li=document.createElement("li");
        li.innerHTML=`${item.title}:${item.amount}
        <button onClick="deleteItem(${item.id},'incomes')">❌</button>
        `
        incomeList.appendChild(li);
})

const expenseList= document.getElementById("expenseList");
expenseList.innerHTML="";
let totalExpense=0;
expenses.forEach(item=>{
    totalExpense+=item.amount;
    const li=document.createElement("li");
    li.innerHTML=`${item.title}:${item.amount}
    <button onClick="deleteItem(${item.id},'expenses')">❌</button>
    `
    expenseList.appendChild(li);
})
document.getElementById("totalIncome").innerText=totalIncome;
document.getElementById("totalExpense").innerText=totalExpense;
document.getElementById("balance").innerText=totalIncome-totalExpense;
}
