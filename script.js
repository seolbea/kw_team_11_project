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

// 퀴즈 데이터 (예제 데이터)
const quizData = [
    { word: "けさ", options: ["말기.", "오늘 아침.", "납(기호: Pb).", "사림."], answer: 1 },
    { word: "はる", options: ["봄.", "여름.", "가을.", "겨울."], answer: 0 },
    { word: "さくら", options: ["벚꽃.", "국화.", "난초.", "소나무."], answer: 0 },
    { word: "きょう", options: ["오늘.", "어제.", "내일.", "지난주."], answer: 0 },
    { word: "明るい", options: ["밝다.", "어둡다.", "붉다.", "늦다."], answer: 0 },
];

// 현재 페이지 및 총 페이지 수
let currentPage = 1;
const totalPages = quizData.length;

// 페이지 번호 업데이트 함수
function updatePageNumber() {
    const pageNumber = document.querySelector('.page-num');
    pageNumber.textContent = `${currentPage} / ${totalPages}`;
}

// 퀴즈 데이터를 로드하고 DOM 업데이트
function loadQuiz(page) {
    const quizWord = document.querySelector('.quiz-word');
    const quizOptionsContainer = document.getElementById('quiz-options');

    // 현재 페이지 퀴즈 데이터
    const quiz = quizData[page - 1];
    quizWord.textContent = quiz.word;

    // 기존 옵션 초기화
    quizOptionsContainer.innerHTML = '';
    console.log(quiz);
    console.log(quizOptionsContainer);
    // 새로운 옵션 버튼 생성
    quiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;

        // 클릭 이벤트 추가
        button.addEventListener('click', () => {
            const isCorrect = index === quiz.answer; // 정답 확인
            alert(isCorrect ? '정답입니다!' : '틀렸습니다!');
        });

        // 옵션 버튼 추가
        quizOptionsContainer.appendChild(button);
    });
}

// 이전 페이지 버튼 이벤트
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePageNumber();
        loadQuiz(currentPage); // 퀴즈 업데이트
    }
});

// 다음 페이지 버튼 이벤트
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePageNumber();
        loadQuiz(currentPage); // 퀴즈 업데이트
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updatePageNumber();
    loadQuiz(currentPage); // 첫 번째 퀴즈 로드
});
