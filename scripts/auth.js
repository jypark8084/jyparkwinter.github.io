// Firebase 모듈 가져오기
import { getAuth, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import app from './firebase-init.js'; // Firebase 초기화 가져오기

// Firebase 인증 객체 생성
const auth = getAuth(app);

// 로그인 링크 요소 가져오기
const loginLink = document.getElementById("loginLink");

// 인증 상태 확인
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // 사용자가 로그인한 경우
        console.log("사용자 로그인:", user); // 디버깅용

        // 닉네임 확인
        const username = user.displayName || user.email.split('@')[0]; // 닉네임 또는 기본값
        console.log("사용자 이름:", username);

        // 로그인 버튼에 사용자 이름 표시
        loginLink.textContent = username;
        loginLink.href = "#"; // 로그인 상태에서는 이동 방지

        // 사용자에게 닉네임을 설정할 수 있는 옵션 추가 (필요한 경우)
        if (!user.displayName) {
            console.log("닉네임이 없습니다. 기본값을 표시 중입니다.");
            await promptToSetNickname(user);
        }
    } else {
        // 사용자가 로그아웃한 경우
        console.log("사용자가 로그아웃 상태입니다.");
        loginLink.textContent = "로그인";
        loginLink.href = "/login/login.html"; // 로그인 페이지로 이동
    }
});

// 닉네임 설정 요청 (옵션)
async function promptToSetNickname(user) {
    const nickname = prompt("닉네임을 설정해주세요:");
    if (nickname) {
        try {
            await updateProfile(user, { displayName: nickname });
            console.log("닉네임이 성공적으로 설정되었습니다:", nickname);
            loginLink.textContent = nickname; // 닉네임 업데이트
        } catch (error) {
            console.error("닉네임 설정 중 오류:", error);
        }
    }
}
