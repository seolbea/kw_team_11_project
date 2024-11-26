loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username && password) {
        /* todo: 로그인 완료되며 메인으로 이동 */
        window.location.href = "index.html"; // 메인 화면으로 이동
    } else {
        /* todo: 아이디/pw 틀렸을때 또는 입력 안한경우*/
        alert("로그인 안됨");
    }
});
