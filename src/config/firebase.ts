// Importamos lo necesario
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCfEz1U7ALXj5mzw7bne3r4RaxtvDKvB8I',
  authDomain: 'trabajopracticofirebase-4a016.firebaseapp.com',
  projectId: 'trabajopracticofirebase-4a016',
  storageBucket: 'trabajopracticofirebase-4a016.firebasestorage.app',
  messagingSenderId: '998421190127',
  appId: '1:998421190127:web:78662cc1570f48e7ad521a',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

export default database