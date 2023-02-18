/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDfeJvnsgHunEeeHZ8WfGMZfYg_5vyXeno',
    authDomain: 'eventmap-2ba48.firebaseapp.com',
    projectId: 'eventmap-2ba48',
    storageBucket: 'eventmap-2ba48.appspot.com',
    messagingSenderId: '1006425403895',
    appId: '1:1006425403895:web:3da34fef547b9494b8fef2',
    measurementId: 'G-PFEDXTEEC3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
