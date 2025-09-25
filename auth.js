firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();
async function signUp(){ const email=document.getElementById('email').value; const pass=document.getElementById('password').value; try{ const u=await auth.createUserWithEmailAndPassword(email,pass); await db.collection('users').doc(u.user.uid).set({email:email,created_at:firebase.firestore.FieldValue.serverTimestamp()}); alert('Signed up'); location.href='/feed.html'; }catch(e){ document.getElementById('msg').textContent = e.message; } }
async function signIn(){ const email=document.getElementById('email').value; const pass=document.getElementById('password').value; try{ await auth.signInWithEmailAndPassword(email,pass); location.href='/feed.html'; }catch(e){ document.getElementById('msg').textContent = e.message; } }
