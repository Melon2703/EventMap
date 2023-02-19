/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: закодировать (определять значения через пременные окружения?)
const app = initializeApp({
    apiKey: 'AIzaSyDfeJvnsgHunEeeHZ8WfGMZfYg_5vyXeno',
    authDomain: 'eventmap-2ba48.firebaseapp.com',
    projectId: 'eventmap-2ba48',
    storageBucket: 'eventmap-2ba48.appspot.com',
    messagingSenderId: '1006425403895',
    appId: '1:1006425403895:web:3da34fef547b9494b8fef2',
    measurementId: 'G-PFEDXTEEC3',
});

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export { auth, provider };
