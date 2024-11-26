/* 메인 화면 js */

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





