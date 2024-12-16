// 네비게이션 바 로드
fetch('/navbar/navbar.html')
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
            window.location.href = "/index.html"; // Home(메인) 페이지로 이동
        });
    }

    /* 로그인 버튼 */
    const loginButton = document.getElementById("loginButton");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // 로그인 상태일 때
        loginButton.textContent = `${loggedInUser}님 환영합니다`; // 버튼 텍스트 변경
        loginButton.style.pointerEvents = "none"; // 클릭 비활성화
        loginButton.style.cursor = "default"; // 포인터 모양 변경
        logoutButton.classList.remove("hidden");

        logoutButton.addEventListener("click", () => {
            // 로그아웃 처리
            localStorage.removeItem("loggedInUser");
            alert("로그아웃되었습니다.");
            window.location.href = "/index.html"; // 페이지 새로고침
        });
    } else {
        // 비로그인 상태
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        loginButton.addEventListener("click", () => {
            window.location.href = "/login.html";
        });
    }

    /* 나만의 단어장 */
    const vocabButton = document.getElementById("vocabButton");
    if (vocabButton) {
        vocabButton.addEventListener("click", () => {
            window.location.href = "/vocablist.html";
        });
    }

    /* N1 ~ N5 버튼 클릭 이벤트 추가 */
    document.querySelectorAll(".sub-button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const levels = ["N1", "N2", "N3", "N4", "N5"];
            // JLPT_N_1to5 폴더 내 words.html로 이동, level 파라미터 전달
            location.href = '/JLPT_N_1to5/words.html?level=' + levels[index].toLowerCase();
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
