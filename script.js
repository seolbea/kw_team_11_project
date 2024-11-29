/* 로그인 버튼 */
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
    window.location.href = "login.html"; // 로그인 페이지로 이동
});

/* 상단바 */
const examButton = document.getElementById("examButton");
const subNavbar = document.getElementById("subNavbar");

examButton.addEventListener("click", () => {
    subNavbar.classList.toggle("show");
});

/* 나만의 단어장 */
const vocabButton = document.getElementById("vocabButton");
vocabButton.addEventListener("click", () => {
    window.location.href = "vocablist.html";
});

/* 검색창 */
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

searchButton.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (query) {
        alert(`${query}`); // todo: 검색 동작 추가
    } else {
        alert("검색어를 입력하세요."); // 검색어 입력 안 할 시
    }
});

/* 퀴즈 버튼 이벤트 */
const quizOptions = document.querySelectorAll('.quiz-option');

quizOptions.forEach(option => {
    option.addEventListener('click', function () {
        alert(`선택한 문장: ${this.textContent}`);
    });
});

// 페이지네이션 버튼들
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumber = document.querySelector('.page-num');

let currentPage = 1;
const totalPages = 11;

// 페이지네이션 버튼 클릭 시 페이지 전환
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePageNumber();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePageNumber();
    }
});

// 페이지 번호 업데이트 함수
function updatePageNumber() {
    pageNumber.textContent = `${currentPage} / ${totalPages}`;
}


