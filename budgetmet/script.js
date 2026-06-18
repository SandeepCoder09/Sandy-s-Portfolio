// script.js — main app (compat firebase assumed loaded)
if (typeof firebase === 'undefined') {
  console.error('Firebase not loaded. Include firebase-app-compat.js and other SDKs in the page.');
}

const auth = firebase.auth();
const db = firebase.firestore();

// elements
const userEmailEl = document.getElementById('userEmail');
const signOutBtn = document.getElementById('signOutBtn');
const liveDateEl = document.getElementById('live-date');

const descEl = document.getElementById('desc');
const amountEl = document.getElementById('amount');
const typeEl = document.getElementById('type');
const addBtn = document.getElementById('add');
const syncNowBtn = document.getElementById('syncNow');

const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const balanceEl = document.getElementById('balance');
const listEl = document.getElementById('list');

let currentUid = null;
let unsubscribe = null;

// Live clock
function updateClock() {
  const now = new Date();
  liveDateEl.textContent = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// redirect to login if not authenticated
auth.onAuthStateChanged(user => {
  if (!user) {
    // not logged in — redirect to login page
    window.location.href = 'login.html';
    return;
  }
  currentUid = user.uid;
  userEmailEl.textContent = user.email || 'Anonymous';
  bindRealtime(currentUid);
});

// bind realtime listener for the user's transactions (newest first)
function bindRealtime(uid) {
  if (unsubscribe) unsubscribe();
  const col = db.collection('users').doc(uid).collection('transactions');
  unsubscribe = col.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    const txs = [];
    snapshot.forEach(doc => {
      const d = doc.data();
      txs.push({ id: doc.id, ...d });
    });
    renderTransactions(txs);
  }, err => {
    console.error('Realtime error', err);
  });
}

// render transactions list
function renderTransactions(txs) {
  listEl.innerHTML = '';
  let income = 0, expense = 0;

  txs.forEach(tx => {
    const li = document.createElement('li');
    li.className = 'tx-item ' + (tx.type === 'income' ? 'inc' : 'exp');

    const left = document.createElement('div');
    left.className = 'tx-left';
    left.innerHTML = `<strong>${escapeHtml(tx.desc)}</strong><small>${new Date(tx.createdAt).toLocaleString()}</small>`;

    const right = document.createElement('div');
    right.className = 'tx-right';
    right.innerHTML = `<span class="amt ${tx.type === 'income' ? 'green' : 'red'}">${tx.type === 'income' ? '+' : '-'}₹${Number(tx.amount).toFixed(2)}</span>
                       <button class="del" data-id="${tx.id}" title="Delete">✕</button>`;

    li.appendChild(left);
    li.appendChild(right);
    listEl.appendChild(li);

    if (tx.type === 'income') income += Number(tx.amount);
    else expense += Number(tx.amount);
  });

  incomeEl.textContent = `₹${income.toFixed(2)}`;
  expenseEl.textContent = `₹${expense.toFixed(2)}`;
  balanceEl.textContent = `₹${(income - expense).toFixed(2)}`;
}

// Add transaction
addBtn.addEventListener('click', async () => {
  const desc = descEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const type = typeEl.value;

  if (!desc || !amount || !type) {
    flashButton(addBtn, 'Fill all fields', false);
    return;
  }
  if (!currentUid) {
    // should not happen — redirect to login
    window.location.href = 'login.html';
    return;
  }

  addBtn.disabled = true;
  try {
    await db.collection('users').doc(currentUid).collection('transactions').add({
      desc,
      amount,
      type,
      createdAt: new Date().toISOString()
    });
    descEl.value = '';
    amountEl.value = '';
    typeEl.value = '';
    flashButton(addBtn, 'Added', true);
  } catch (err) {
    console.error(err);
    flashButton(addBtn, 'Error', false);
  } finally {
    addBtn.disabled = false;
  }
});

// Delete transaction (event delegation)
listEl.addEventListener('click', async (e) => {
  if (!e.target.matches('button.del')) return;
  const id = e.target.dataset.id;
  if (!id) return;
  if (!confirm('Delete this transaction?')) return;
  try {
    await db.collection('users').doc(currentUid).collection('transactions').doc(id).delete();
  } catch (err) {
    console.error('Delete failed', err);
    alert('Delete failed');
  }
});

// Sync now: rebind snapshot
syncNowBtn.addEventListener('click', () => {
  if (currentUid) {
    bindRealtime(currentUid);
    flashButton(syncNowBtn, 'Syncing', true);
    setTimeout(()=> flashButton(syncNowBtn, 'Sync Now', true), 900);
  }
});

// Sign out
signOutBtn.addEventListener('click', async () => {
  await auth.signOut();
  window.location.href = 'login.html';
});

// small helpers
function flashButton(btn, text, ok=true) {
  const orig = btn.textContent;
  btn.textContent = text;
  btn.style.boxShadow = ok ? '0 8px 22px rgba(142,252,154,0.12)' : '0 8px 22px rgba(255,110,110,0.08)';
  setTimeout(()=> { btn.textContent = orig; btn.style.boxShadow = ''; }, 900);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
