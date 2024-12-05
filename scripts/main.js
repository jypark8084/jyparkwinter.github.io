import { ref, set, onValue } from "firebase/database";
import { database } from "./firebase-init.js";

const container = document.querySelector(".container");
const popup = document.getElementById("messagePopup");
const form = document.getElementById("messageForm");
const cancelButton = document.getElementById("cancelButton");
let selectedPosition = null;

// 맵 클릭 이벤트
container.addEventListener("click", (event) => {
    const rect = container.getBoundingClientRect();
    selectedPosition = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
    };
    popup.classList.remove("hidden");
});

// 팝업 닫기
cancelButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    selectedPosition = null;
});

// 메시지 저장
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nickname = form.nickname.value;
    const message = form.message.value;

    if (selectedPosition) {
        const messageId = Date.now().toString();
        set(ref(database, `messages/${messageId}`), {
            nickname,
            message,
            position: selectedPosition,
        });
    }

    popup.classList.add("hidden");
    form.reset();
    selectedPosition = null;
});

// 메시지 불러오기 및 표시
onValue(ref(database, "messages"), (snapshot) => {
    const messages = snapshot.val();
    container.innerHTML = ""; // 기존 메시지 제거
    for (const id in messages) {
        const { nickname, message, position } = messages[id];
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.style.position = "absolute";
        messageElement.style.left = `${position.x}%`;
        messageElement.style.top = `${position.y}%`;
        messageElement.textContent = `${nickname}: ${message}`;
        container.appendChild(messageElement);
    }
});
