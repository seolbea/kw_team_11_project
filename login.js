document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // LocalStorage에 저장된 모든 회원 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || []; 

    // 입력한 ID와 비밀번호가 일치하는 사용자 찾기
    const user = users.find((u) => u.id === username && u.password === password);

    if (user) {
        // 로그인 성공: 현재 로그인한 사용자 정보를 sessionStorage에 저장
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        alert(`${user.name}님, 환영합니다!`);
        window.location.href = "index.html"; // 메인 페이지로 이동
    } else {
        // 로그인 실패: 메시지 표시
        alert("ID 또는 비밀번호가 잘못되었습니다.");
    }
});
