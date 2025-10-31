// elements
const desc = document.getElementById('desc');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const add = document.getElementById('add');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const liveDate = document.getElementById('live-date');

// load transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// live clock/date
function updateDateTime(){
  const now = new Date();
  liveDate.textContent = now.toLocaleString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// enable/disable add button based on validation
function validateInputs(){
  const hasDesc = desc.value.trim().length > 0;
  const hasAmount = amount.value !== '' && !isNaN(Number(amount.value));
  const hasType = type.value !== '';
  add.disabled = !(hasDesc && hasAmount && hasType);
}
desc.addEventListener('input', validateInputs);
amount.addEventListener('input', validateInputs);
type.addEventListener('change', validateInputs);

// render transactions newest -> oldest
function renderList(){
  list.innerHTML = '';
  let totalIncome = 0, totalExpense = 0;

  // newest first
  const sorted = [...transactions].slice().reverse();

  sorted.forEach(t => {
    const li = document.createElement('li');

    const left = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = t.desc;
    left.appendChild(title);

    const time = document.createElement('small');
    time.textContent = t.dateTime;
    left.appendChild(time);

    const amt = document.createElement('span');
    amt.textContent = `${t.type === 'income' ? '+' : '-'}₹${t.amount}`;
    amt.className = t.type === 'income' ? 'amount-income' : 'amount-expense';

    li.appendChild(left);
    li.appendChild(amt);
    li.title = `Added on ${t.dateTime}`;

    list.appendChild(li);

    if (t.type === 'income') totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  incomeEl.textContent = `₹${totalIncome}`;
  expenseEl.textContent = `₹${totalExpense}`;
  balance.textContent = `₹${(totalIncome - totalExpense).toFixed(2)}`;
}

// add transaction
add.addEventListener('click', () => {
  // double-check
  if (!desc.value.trim() || !amount.value || type.value === '') {
    alert('Please fill description, amount, and select a type.');
    return;
  }

  const now = new Date();
  const dateTime = now.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const tx = {
    desc: desc.value.trim(),
    amount: parseFloat(amount.value),
    type: type.value,
    dateTime
  };

  transactions.push(tx);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // clear and reset
  desc.value = '';
  amount.value = '';
  type.value = '';
  validateInputs(); // will disable add again

  renderList();
});

// initial render
validateInputs();
renderList();