// Firebase 모듈 가져오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Realtime Database 모듈

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyA5_BgEbK2ux2Rv3VMcDyKbP0mlvKRpFwE",
    authDomain: "jyparkwinter.firebaseapp.com",
    projectId: "jyparkwinter",
    storageBucket: "jyparkwinter.firebasestorage.app",
    messagingSenderId: "129060399086",
    appId: "1:129060399086:web:5b0709599000db0ba590ff",
    measurementId: "G-60W3MPY0BG"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Realtime Database 참조
const database = getDatabase(app);

// 데이터베이스 확인 로그
console.log("Firebase Initialized", database);
