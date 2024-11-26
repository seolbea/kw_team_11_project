//todo: localstorage 사용
const vocabList=['word1','word2','word3'];

const wordBox = document.getElementById('currentWord');
const checkBtn=document.getElementById('checkBtn');
const xBtn = document.getElementById('xBtn');

let currentIndex=null;

function showRandomWord(){
    if(vocabList.length===0){
        wordBox.textContent = '단어장 체크 완료';
        return;
    }
    currentIndex = Math.floor(Math.random() * vocabList.length);
    wordBox.textContent = vocabList[currentIndex];
}

// 체크버튼 클릭
checkBtn.addEventListener('click',()=>{
    if(currentIndex!==null){
        vocabList.splice(currentIndex,1);
        currentIndex=null;
        showRandomWord();
    }
});

// X 버튼 클릭
xBtn.addEventListener('click',()=>{
    if(currentIndex!==null){
        showRandomWord();
        //todo: 못외운 단어가 바로 다시 나오지 않고 다음 시험때 나오도록 조정
    }
})