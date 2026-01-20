import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
apiKey:'AIzaSyDnp4fC2_cEw04ydtWOwYgVzRUsqScufFs',
authDomain:'cars-website-558c0.firebaseapp.com',
projectId:'cars-website-558c0'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = function(){
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then(()=>location.href='admin.html')
  .catch(()=>error.innerText='Wrong email or password');
};
