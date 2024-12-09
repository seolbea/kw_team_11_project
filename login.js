document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const id = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem('user')); // LocalStorage에서 사용자 정보 가져오기

    if (user && user.id === id && user.password === password) {
        alert(`${user.name}님, 로그인 성공!`);
        localStorage.setItem('loggedInUser', user.name); // 로그인된 사용자 이름 저장
        window.location.href = 'index.html'; // 메인 페이지로 이동
    } else {
        alert('ID 또는 비밀번호가 일치하지 않습니다.');
    }
});
