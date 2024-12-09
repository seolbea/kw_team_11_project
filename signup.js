document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const name = document.getElementById('name').value;
    const id = document.getElementById('signupId').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        // LocalStorage에 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify({ name, id, password }));
        alert(`${name}님, 회원가입이 성공적으로 완료되었습니다!`);
        window.location.href = 'login.html'; // 로그인 페이지로 이동
    } else {
        alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
});
