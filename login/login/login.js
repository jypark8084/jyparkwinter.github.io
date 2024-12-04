// Firebase 관련 코드 및 초기화
// Firebase 모듈 임포트
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyA5_BgEbK2ux2Rv3VMcDyKbP0mlvKRpFwE",
    authDomain: "jyparkwinter.firebaseapp.com",
    projectId: "jyparkwinter",
    storageBucket: "jyparkwinter.firebasestorage.app",
    messagingSenderId: "129060399086",
    appId: "1:129060399086:web:5b0709599000db0ba590ff",
    measurementId: "G-60W3MPY0BG"
  };

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOMContentLoaded 이벤트 리스너
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // 로그인 함수
    async function login(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const usernameElement = document.getElementById("username");
        const passwordElement = document.getElementById("password");
        const loginMessageElement = document.getElementById("loginMessage");

        if (!usernameElement || !passwordElement || !loginMessageElement) {
            console.error("필수 요소가 없습니다.");
            return;
        }

        const identifier = usernameElement.value.trim();
        const password = passwordElement.value.trim();

        try {
            let emailToLogin;

            // Firestore에서 사용자 정보 가져오기
            const userDoc = await getDoc(doc(db, "users", identifier));
            if (userDoc.exists()) {
                // 아이디로 이메일 찾기
                emailToLogin = userDoc.data().email;
            } else {
                // 이메일 직접 사용
                emailToLogin = identifier;
            }

            // Firebase Authentication으로 로그인 시도
            await signInWithEmailAndPassword(auth, emailToLogin, password);
            alert("로그인 성공!");
            window.location.href = "../../index.html"; // 로그인 후 리다이렉트
        } catch (error) {
            loginMessageElement.innerText = "아이디 또는 비밀번호가 올바르지 않습니다.";
            console.error("로그인 오류:", error.message);
        }
    }

    // 로그인 폼에 이벤트 리스너 추가
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    } else {
        console.error("로그인 폼을 찾을 수 없습니다. ID가 'loginForm'인지 확인하세요.");
    }
});
