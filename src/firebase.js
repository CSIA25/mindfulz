import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBLEF_-LbfhJotNbjmsGO760YjZKQhPLos",
  authDomain: "deepika-59bd0.firebaseapp.com",
  projectId: "deepika-59bd0",
  storageBucket: "deepika-59bd0.appspot.com",
  messagingSenderId: "740764696391",
  appId: "1:740764696391:web:your-app-id-here" 
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
