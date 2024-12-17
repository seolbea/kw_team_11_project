// 현재 로그인한 사용자 불러오기
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

if (!loggedInUser || !loggedInUser.id) {
    alert('로그인이 필요합니다.');
    window.location.href = 'login.html'; // 로그인 페이지로 리디렉션
}

// 고유한 키로 단어장 데이터 저장 및 불러오기
const userKey = `vocab_${loggedInUser.id}`; // 사용자별 고유 단어장 키
const userData = JSON.parse(localStorage.getItem(userKey)) || { vocabList: [] };
let vocabList = userData.vocabList || [];

// DOM 요소 가져오기
const vocabListContainer = document.getElementById('vocabList');

// 단어 목록 렌더링
function renderVocabList() {
    vocabListContainer.innerHTML = '';

    if (vocabList.length === 0) {
        vocabListContainer.innerHTML = `<li>나만의 단어장이 비어있습니다.</li>`;
        return;
    }

    vocabList.forEach((word, index) => {
        const li = document.createElement('li');
        li.textContent = word;

        // 삭제 버튼 추가
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => deleteWord(index));

        li.appendChild(deleteBtn);
        vocabListContainer.appendChild(li);
    });

    updateUserData();
}

// 단어 삭제
function deleteWord(index) {
    vocabList.splice(index, 1);
    updateUserData();
    renderVocabList();
}

// 사용자 데이터 업데이트
function updateUserData() {
    localStorage.setItem(userKey, JSON.stringify({ vocabList }));
}

// 초기화
renderVocabList();
