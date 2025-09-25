firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();
async function subscribeNewsletter(){ const email = document.getElementById('newsletterEmail').value; if(!email||!email.includes('@')) return alert('Enter valid email'); await db.collection('subscribers').add({email,created_at:firebase.firestore.FieldValue.serverTimestamp()}); alert('Subscribed'); document.getElementById('newsletterEmail').value=''; }
