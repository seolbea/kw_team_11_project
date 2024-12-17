const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("signupId").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.id === id);

    if (userExists) {
        alert("이미 존재하는 ID입니다.");
    } else {
        const newUser = { name, id, password, vocabList: [] };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("회원가입이 완료되었습니다!");
        window.location.href = "login.html";
    }
});
