const desc = document.getElementById('desc');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const add = document.getElementById('add');
const list = document.getElementById('list');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const balance = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  totalIncome.textContent = `₹${income}`;
  totalExpense.textContent = `₹${expense}`;
  balance.textContent = `₹${income - expense}`;
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderChart(income, expense);
}

function renderList() {
  list.innerHTML = '';
  transactions.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = `${t.desc} <span>${t.type === 'income' ? '+' : '-'}₹${t.amount}</span>`;
    list.appendChild(li);
  });
}

add.addEventListener('click', () => {
  if (desc.value && amount.value) {
    transactions.push({ desc: desc.value, amount: parseFloat(amount.value), type: type.value });
    desc.value = '';
    amount.value = '';
    renderList();
    updateValues();
  }
});

let chart;
function renderChart(income, expense) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#00ffc8', '#ff5252']
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#fff' } } }
    }
  });
}

renderList();
updateValues();
