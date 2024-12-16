document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = JSON.parse(localStorage.getItem("user")); // LocalStorage에 저장된 회원 정보 가져오기

    if (user && username === user.id && password === user.password) {
        // 로그인 성공 시 현재 로그인한 사용자 이름 저장
        localStorage.setItem("loggedInUser", user.name);
        alert(`${user.name}님, 환영합니다!`);
        window.location.href = "index.html"; // 메인 페이지로 이동
    } else {
        // 로그인 실패 시 메시지 표시
        alert("ID 또는 비밀번호가 잘못되었습니다.");
    }
});