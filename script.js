/* 메인 화면 js */

/* 로그인 버튼 */
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
    window.location.href = "login.html"; // 로그인 페이지로 이동
});

/* 상단바 */
const NButton = document.getElementById("NButton");
const subNavbar = document.getElementById("subNavbar");

NButton.addEventListener("click", () => {
    subNavbar.classList.toggle("show");
});

/* 나만의 단어장 */
const vocabButton = document.querySelector(".simple-button");
vocabButton.addEventListener("click", () => {
    window.location.href = "vocablist.html";
});

/* 검색창 */
const searchButton=document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

searchButton.addEventListener("click", ()=>{
    const query = searchBox.value.trim();
    if (query) {
        alert(`${query}`); /*todo: 검색할때 동작*/
    } else{
        alert("검색어를 입력하세요.") /*검색어 입력 안할 시의 동작*/
    }
})

document.addEventListener("DOMContentLoaded", () => {
    // N1 ~ N5 버튼에 클릭 이벤트 추가
    document.querySelectorAll(".sub-button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const levels = ["N1", "N2", "N3", "N4", "N5"];
            // JLPT_N_1to5 폴더 내 words.html로 이동, level 파라미터 전달
            location.href = `JLPT_N_1to5/words.html?level=${levels[index].toLowerCase()}`;
        });
    });
});

// 등급별 단어 시험 버튼과 서브 네비게이션 바
const examButton = document.getElementById("examButton");
const popupContainer = document.getElementById("popupContainer");
const popupOverlay = document.getElementById("popupOverlay");
const difficultyButtons = document.getElementById("difficultyButtons");
const closePopup = document.getElementById("closePopup");

// 난이도 목록
const difficulties = ["N1", "N2", "N3", "N4", "N5"];

// 버튼 클릭 시 팝업 표시
examButton.addEventListener("click", () => {
    popupContainer.style.display = "block";
    popupOverlay.style.display = "block";

    // 난이도 버튼 동적 생성
    difficultyButtons.innerHTML = ""; // 기존 버튼 초기화
    difficulties.forEach(difficulty => {
        const button = document.createElement("button");
        button.className = "difficulty-button";
        button.textContent = difficulty;
        button.addEventListener("click", () => {
            alert(`${difficulty} 시험을 시작합니다!`); // 실제 행동 정의 가능
            closePopupHandler();
        });
        difficultyButtons.appendChild(button);
    });
});

// 팝업 닫기
const closePopupHandler = () => {
    popupContainer.style.display = "none";
    popupOverlay.style.display = "none";
};

closePopup.addEventListener("click", closePopupHandler);
popupOverlay.addEventListener("click", closePopupHandler);