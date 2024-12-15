// 네비게이션 바 로드
fetch('/kw_team_11_project/navbar/navbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbar').innerHTML = html;
        initNavbar(); // 초기화 함수
    })
    .catch(error => {
        console.error('네비게이션 바 로드 실패:', error);
    });

// 네비게이션 바 이벤트 초기화
function initNavbar() {
    /* 상단바 */
    const NButton = document.getElementById("NButton");
    const subNavbar = document.getElementById("subNavbar");

    if (NButton && subNavbar) {
        NButton.addEventListener("click", () => {
            subNavbar.classList.toggle("show");
        });
    }

    // 홈 버튼
    const homeButton = document.getElementById("homeButton");
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "/kw_team_11_project/index.html"; // Home(메인) 페이지로 이동
        });
    }


    /* 로그인 버튼 */
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            window.location.href = "/kw_team_11_project/login.html"; // 로그인 페이지로 이동
        });
    }

    /* 나만의 단어장 */
    const vocabButton = document.getElementById("vocabButton");
    if (vocabButton) {
        vocabButton.addEventListener("click", () => {
            window.location.href = "/kw_team_11_project/vocablist.html";
        });
    }

    /* N1 ~ N5 버튼 클릭 이벤트 추가 */
    document.querySelectorAll(".sub-button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const levels = ["N1", "N2", "N3", "N4", "N5"];
            // JLPT_N_1to5 폴더 내 words.html로 이동, level 파라미터 전달
            location.href = '/kw_team_11_project/JLPT_N_1to5/words.html?level=' + levels[index].toLowerCase();
        });
    });

    // 등급별 단어 시험 버튼과 팝업 관련
    const examButton = document.getElementById("examButton");
    const popupContainer = document.getElementById("popupContainer");
    const popupOverlay = document.getElementById("popupOverlay");
    const difficultyButtons = document.getElementById("difficultyButtons");
    const closePopup = document.getElementById("closePopup");
    const difficulties = ["N1", "N2", "N3", "N4", "N5"];

    if (examButton && popupContainer && popupOverlay) {
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
                    alert(`${difficulty} 시험을 시작합니다!`);
                    closePopupHandler();
                });
                difficultyButtons.appendChild(button);
            });
        });
    }

    // 팝업 닫기 이벤트
    const closePopupHandler = () => {
        popupContainer.style.display = "none";
        popupOverlay.style.display = "none";
    };

    if (closePopup && popupOverlay) {
        closePopup.addEventListener("click", closePopupHandler);
        popupOverlay.addEventListener("click", closePopupHandler);
    }
}
