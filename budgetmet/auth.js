// auth.js
// Handles both login.html and register.html behavior
// Assumes firebase.js is loaded via <script> and this file is included with type="module" or regular script (we use compat here so normal script works)

const { auth, db } = (function(){
  // If module import not used in this environment, use global firebase
  if (typeof firebase !== 'undefined') {
    return { auth: firebase.auth(), db: firebase.firestore() };
  }
  throw new Error('Firebase not available');
})();

const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const msgEl = document.getElementById('message');

function showMsg(text, ok = true) {
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.style.color = ok ? '#8efc9a' : '#ff8a8a';
  msgEl.style.opacity = '1';
  setTimeout(()=> msgEl.style.opacity = '0', 4500);
}

// Redirect to app if already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    // user logged in — redirect to app
    window.location.href = 'index.html';
  }
});

const signInBtn = document.getElementById('signIn');
if (signInBtn) {
  signInBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailEl.value.trim();
    const pass = passEl.value;
    if (!email || !pass) return showMsg('Fill both fields', false);
    try {
      await auth.signInWithEmailAndPassword(email, pass);
      showMsg('Signed in — redirecting...', true);
      setTimeout(()=> window.location.href = 'index.html', 600);
    } catch (err) {
      showMsg(err.message || 'Sign in failed', false);
    }
  });
}

const signUpBtn = document.getElementById('signUp');
if (signUpBtn) {
  signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailEl.value.trim();
    const pass = passEl.value;
    if (!email || pass.length < 6) return showMsg('Use valid email & password (min 6)', false);
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      // create user doc
      await db.collection('users').doc(cred.user.uid).set({
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      showMsg('Account created — redirecting...', true);
      setTimeout(()=> window.location.href = 'index.html', 800);
    } catch (err) {
      showMsg(err.message || 'Signup failed', false);
    }
  });
}

// Guest button support
const guestBtn = document.getElementById('guest');
if (guestBtn) {
  guestBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // continue to app in guest mode (no sync)
    window.location.href = 'index.html';
  });
}
