const desc = document.getElementById('desc');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const add = document.getElementById('add');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const liveDate = document.getElementById('live-date');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 🔥 Live clock & date
function updateDateTime() {
  const now = new Date();
  liveDate.textContent = now.toLocaleString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 🧾 Render transactions
function renderList() {
  list.innerHTML = '';
  let totalIncome = 0, totalExpense = 0;

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${t.desc}</strong><br>
        <small>${t.dateTime}</small>
      </div>
      <span style="color:${t.type === 'income' ? '#00ffc8' : '#ff5252'};">
        ${t.type === 'income' ? '+' : '-'}₹${t.amount}
      </span>
    `;
    list.appendChild(li);

    if (t.type === 'income') totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  incomeEl.textContent = `₹${totalIncome}`;
  expenseEl.textContent = `₹${totalExpense}`;
  balance.textContent = `₹${(totalIncome - totalExpense).toFixed(2)}`;
}

// ➕ Add new transaction
add.addEventListener('click', () => {
  if (!desc.value || !amount.value) return alert('Please fill all fields!');

  const now = new Date();
  const dateTime = now.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const transaction = {
    desc: desc.value,
    amount: parseFloat(amount.value),
    type: type.value,
    dateTime
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  desc.value = '';
  amount.value = '';
  renderList();
});

renderList();