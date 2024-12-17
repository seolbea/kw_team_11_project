/* 검색창 */
let csvData = []; // CSV 데이터를 저장할 변수

function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        var row = allRows[singleRow];
        var rowCells = [];
        var currentField = "";
        var inQuotes = false; // 쌍따옴표 안에 있는지 상태를 추적

        for (var i = 0; i < row.length; i++) {
            var char = row[i];

            if (char === '"' && (i === 0 || row[i - 1] !== '\\')) {
                // 쌍따옴표가 열리거나 닫힘
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                // 쌍따옴표 밖에서 콤마를 만나면 필드 종료
                rowCells.push(currentField.trim());
                currentField = "";
            } else {
                // 현재 필드에 문자 추가
                currentField += char;
            }
        }

        // 마지막 필드 추가
        if (currentField.length > 0) {
            rowCells.push(currentField.trim());
        }

        // 예외 처리: 행이 4개의 필드를 포함하지 않으면 무시
        if (rowCells.length !== 4) {
            console.warn(`Invalid row skipped (line ${singleRow + 1}):`, row);
            continue;
        }

        // CSV 데이터를 객체로 저장
        if (singleRow !== 0) { // 헤더 제외
            csvData.push({
                expression: rowCells[0],
                reading: rowCells[1],
                meaning: rowCells[2],
                tags: rowCells[3]
            });
        }
    }
    console.log("CSV data loaded successfully. Total valid rows:", csvData.length);
}


$.ajax({
    url: 'https://raw.githubusercontent.com/elzup/jlpt-word-list/refs/heads/master/out/all.csv',
    dataType: 'text'
}).done(successFunction);

let SearchBtn = document.querySelector("#searchButton");

SearchBtn.addEventListener("click", () => {
    let input = document.querySelector("#searchBox");
    let text = input.value.trim();
    if (!text.length) return;

    // 선택된 난이도
    var selectedLevel = document.querySelector('input[name="LevelChoose"]:checked');
    if (!selectedLevel) return;
    console.log(selectedLevel.id);

    // 로마자 -> 히라가나 변환 테이블 (za, ba, gu, di, pi, du, pu, ze, pe, go, do, bo, po)
    const romajiToHiragana = {
        a: "あ",    ka: "か",   sa: "さ",   ta: "た",   na: "な",   ha: "は",   ma: "ま",   ya: "や",   ra: "ら",   wa: "わ",   n: "ん",
        i: "い",    ki: "き",   shi: "し",  chi: "ち",  ni: "に",   hi: "ひ",   mi: "み",               ri: "り",
        u: "う",    ku: "く",   su: "す",   tsu: "つ",  nu: "ね",   fu: "ふ",   mu: "む",   yu: "ゆ",   ru: "る",
        e: "え",    ke: "け",   se: "せ",   te: "て",   ne: "ね",   he: "へ",   me: "め",               re: "れ",
        o: "お",    ko: "こ",   so: "そ",   to: "と",   no: "の",   ho: "ほ",   mo: "も",   yo: "よ",   ro: "ろ",
                ga: "が",   za: "ざ",   da: "だ",   ba: "ば",   pa: "ぱ",
                gi: "ぎ",   ji: "じ",   di: "ヂ",   bi: "び",   pi: "ぴ",
                gu: "ぐ",   u: "ず",    du: "づ",   bu: "ぶ",   pu: "ぷ",
                ge: "げ",   ze: "ぜ",   de: "で",   be: "べ",   pe: "ぺ",
                go: "ご",   zo: "ぞ",   do: "ど",   bo: "ぼ",   po: "ぽ",
        shu: "しゅ", ryo: "りょ", byo: "びょ", hya:"ひゃ", jyu: "じゅ", tto: "っと",
        ppa: "っぱ", ttsu: "っつ", kku: "っく", tto: "っと", ssu: "っす", tte: "って"
    };

    // 로마자 -> 카타가나 변환 테이블 (hi, u, nu, yu, ke, he, yo, /pa, /di, bi, gu, /du, bu, ge, ze, go, zo, po)
    const romajiToKatagana = {
        a: "ア",    ka: "カ",   sa: "サ",   ta: "タ",   na: "ナ",   ha: "ハ",   ma: "マ",   ya: "ヤ",   ra: "ラ",   wa: "ワ",   n: "ン",
        i: "イ",    ki: "キ",   shi: "シ",  chi: "チ",  ni: "ニ",   hi: "ヒ",   mi: "ミ",               ri: "リ",
        u: "ウ",    ku: "ク",   su: "ス",   tsu: "ツ",  nu: "ヌ",   fu: "フ",   mu: "ム",   yu: "ユ",   ru: "ル",
        e: "エ",    ke: "ケ",   se: "セ",   te: "テ",   ne: "ネ",   he: "ヘ",   me: "メ",               re: "レ",
        o: "オ",    ko: "コ",   so: "ソ",   to: "ト",   no: "ノ",   ho: "ホ",   mo: "モ",   yo: "ヨ",   ro: "ロ",
                    ga: "ガ",   za: "ザ",   da: "ダ",   ba: "バ",   pa: "パ",
                    gi: "ギ",   ji: "ジ",   di: "ヂ",   bi: "ビ",   pi: "ピ",
                    gu: "グ",   zu: "ズ",   du: "ヅ",   bu: "ブ",   pu: "プ",
                    ge: "ゲ",   ze: "ゼ",   de: "デ",   be: "ベ",   pe: "ペ",
                    go: "ゴ",   zo: "ゾ",   do: "ド",   bo: "ボ",   po: "ポ",
        fa: "ファ", fo: "フォ", 
        cchi: "ッチ", sho: "ショ", nyu: "ニュ"
    };

    function convertToKana(romaji) {
        let hiragana = "";
        let katakana = "";
        let i = 0;

        while (i < romaji.length) {
            let matched = false;

            // 최대 3글자 길이부터 1글자까지 검사
            for (let len = 3; len > 0; len--) {
                const substr = romaji.slice(i, i + len);
                if (romajiToHiragana[substr]) {
                    hiragana += romajiToHiragana[substr];
                    katakana += String.fromCharCode(romajiToHiragana[substr].charCodeAt(0) + 96); // 히라가나 -> 카타카나
                    i += len; // 매칭된 길이만큼 점프
                    matched = true;
                    break;
                }
            }

            // 매칭 실패 처리
            if (!matched) {
                // 특수 문자나 매칭되지 않는 문자를 스킵
                hiragana += romaji[i];
                katakana += romaji[i];
                i++;
            }
        }

        return { hiragana, katakana };
    }


let selectedMode = "read";

// 선택된 모드에 따라 검색 조건 설정
let searchFilter = (row) => {
    if (!text || typeof text !== "string") return false;

    if (selectedMode === "read") {
        const { hiragana, katakana } = convertToKana(text);
        console.log(`Hiragana: ${hiragana}, Katakana: ${katakana}`);

        return (
            typeof row.reading === "string" &&
            (row.reading === hiragana || row.reading === katakana)
        );
    } else if (selectedMode === "mean") {
        console.log(text);

        // 의미(meaning)를 단어로 나눈 배열 생성
        const words = row.meaning.split(/\s+/); // 공백으로 단어를 분리
        const meaningWithCommas = row.meaning.split(',').join(' ').split(/\s+/); // 콤마를 공백으로 변환한 후 다시 단어로 분리

        // 검색어가 단어 배열에 정확히 일치하는지 확인
        const searchMatch = (wordsArray) => wordsArray.some(word => word.toLowerCase() === text.toLowerCase());

        // 기본적으로 검색어 그대로 매칭하고, 콤마를 처리한 경우도 매칭
        return searchMatch(words) || searchMatch(meaningWithCommas);
    }
    return false;
};

// 난이도에 따라 태그 필터링 설정
let levelFilter = (row) => true; // 기본적으로 모든 데이터 포함
switch (selectedLevel.id) {
    case "n1": levelFilter = (row) => row.tags.includes("JLPT_1"); break;
    case "n2": levelFilter = (row) => row.tags.includes("JLPT_2"); break;
    case "n3": levelFilter = (row) => row.tags.includes("JLPT_3"); break;
    case "n4": levelFilter = (row) => row.tags.includes("JLPT_4"); break;
    case "n5": levelFilter = (row) => row.tags.includes("JLPT_5"); break;
    case "all": levelFilter = (row) => true; break;
}

// 필터링된 데이터 검색
selectedMode = "read";
let foundData1 = csvData.filter(row => levelFilter(row) && searchFilter(row));
selectedMode = "mean";
let foundData2 = csvData.filter(row => levelFilter(row) && searchFilter(row));

///*
if (foundData1.length > 0 || foundData2.length > 0) {
    // 검색된 데이터를 JSON 형식으로 browse_result.html로 전달
    const encodedData1 = encodeURIComponent(JSON.stringify(foundData1));
    const encodedData2 = encodeURIComponent(JSON.stringify(foundData2));
    window.location.href = `browse_result.html?data1=${encodedData1}&data2=${encodedData2}`;

} else {
    // 검색 결과 없음을 전달
    window.location.href = `browse_result.html?results=${encodeURIComponent('none')}`;
}
//*/
    input.value = ""; // 입력창 초기화
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
