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

    /* 로그인 및 로그아웃 버튼 */
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        // 로그인 상태일 때
        loginButton.textContent = `${loggedInUser.name}님 환영합니다`;
        loginButton.style.pointerEvents = "none"; // 클릭 비활성화
        loginButton.style.cursor = "default"; // 포인터 모양 변경
        logoutButton.classList.remove("hidden"); // 로그아웃 버튼 표시

        // 로그아웃 버튼 클릭 이벤트
        logoutButton.addEventListener("click", () => {
            sessionStorage.removeItem("loggedInUser"); // 로그인 정보 삭제
            alert("로그아웃되었습니다.");
            window.location.href = "/login.html"; // 로그인 페이지로 이동
        });
    } else {
        // 비로그인 상태
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");

        loginButton.addEventListener("click", () => {
            window.location.href = "/login.html"; // 로그인 페이지로 이동
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
            location.href = '/JLPT_N_1to5/words.html?level=' + levels[index].toLowerCase();
        });
    });

    /* 등급별 단어 시험 버튼과 팝업 관련 */
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

            difficultyButtons.innerHTML = ""; // 기존 버튼 초기화
            difficulties.forEach(difficulty => {
                const button = document.createElement("button");
                button.className = "difficulty-button";
                button.textContent = difficulty;

                button.addEventListener("click", () => {
                    window.location.href = `/JLPT_N_1to5/test.html?level=${difficulty.toLowerCase()}`;
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

    /* 50음도 타자연습 */
    const typingPracticeButton = document.getElementById("typingbtn");

    if (typingPracticeButton) {
        typingPracticeButton.addEventListener("click", () => {
            showTypingPopup();
        });
    }

    /* 팝업 관련 함수 */
    function showTypingPopup() {
        // 팝업 오버레이와 컨테이너 생성
        const popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
        `;

        const popupContainer = document.createElement("div");
        popupContainer.className = "popup-container";
        popupContainer.style.cssText = `
            background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        `;

        // 팝업 내용
        popupContainer.innerHTML = `
            <h3>연습할 모드를 선택하세요</h3>
            <div>
                <button id="hiraganaButton" style="margin: 5px; padding: 10px 15px; font-size: 14px; background-color: white; border: 2px solid #FFB899; cursor: pointer; border-radius: 5px;">히라가나</button>
                <button id="katakanaButton" style="margin: 5px; padding: 10px 15px; font-size: 14px; background-color: white; border: 2px solid #FFB899; cursor: pointer; border-radius: 5px;">가타카나</button>
                <button id="totoalButton" style="margin: 5px; padding: 10px 15px; font-size: 14px; background-color: white; border: 2px solid #FFB899; cursor: pointer; border-radius: 5px;">전체</button>
            </div>
            <button id="closeTypingPopup" style="margin-top: 10px; padding: 5px 10px; font-size: 14px; color: white; background-color: #FFA07A; border: none; cursor: pointer; border-radius: 5px;">닫기</button>
        `;

        // 팝업 추가
        document.body.appendChild(popupOverlay);
        popupOverlay.appendChild(popupContainer);

        // 버튼 이벤트 설정
        document.getElementById("hiraganaButton").addEventListener("click", () => {
            window.location.href = "/typing_practice/hiragana.html"; // 히라가나 페이지로 이동
        });

        document.getElementById("katakanaButton").addEventListener("click", () => {
            window.location.href = "/typing_practice/katakana.html"; // 가타카나 페이지로 이동
        });

        document.getElementById("totoalButton").addEventListener("click", () => {
            window.location.href = "/typing_practice/total.html"; // 전체 페이지로 이동
        });

        document.getElementById("closeTypingPopup").addEventListener("click", () => {
            popupOverlay.remove(); // 팝업 닫기
        });

        popupOverlay.addEventListener("click", (e) => {
            if (e.target === popupOverlay) popupOverlay.remove(); // 팝업 외부 클릭 시 닫기
        });
    }
    // 50음도표 버튼 클릭 시 이미지 팝업 생성
    const higaButton = document.getElementById("higa");
    if (higaButton) {
        higaButton.addEventListener("click", () => {
            showHiraganaKatakanaImage();
        });
    }

    // 히라가나/가타카나 이미지 팝업 생성
    function showHiraganaKatakanaImage() {
        // 팝업 오버레이와 컨테이너 생성
        const popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
        `;

        const popupContainer = document.createElement("div");
        popupContainer.className = "popup-container";
        popupContainer.style.cssText = `
            background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 600px; width: 90%; /* 화면 크기에 맞게 조정 */
        `;

        // 이미지 URL 설정 (히라가나 또는 가타카나)
        const imageUrl = "/image/higa.png"; // 기본 이미지는 히라가나로 설정
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "50음도표";
        imageElement.style.maxWidth = "100%";
        imageElement.style.height = "auto";
        
        // 이미지 추가
        popupContainer.appendChild(imageElement);

        // 닫기 버튼
        const closeButton = document.createElement("button");
        closeButton.textContent = "닫기";
        closeButton.style.cssText = `
            margin-top: 15px; padding: 10px 20px; font-size: 16px; background-color: #FF5733; color: white; border: none; cursor: pointer; border-radius: 5px;
            display: block; /* 버튼을 새 줄에 배치 */
            margin-left: auto; /* 가운데 정렬 */
            margin-right: auto;
        `;
        closeButton.addEventListener("click", () => {
            popupOverlay.remove(); // 이미지 팝업 닫기
        });

        // 닫기 버튼 추가 (이미지 아래로)
        popupContainer.appendChild(closeButton);

        // 이미지 팝업 추가
        document.body.appendChild(popupOverlay);
        popupOverlay.appendChild(popupContainer);
    }
}
