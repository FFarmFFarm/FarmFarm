// todo: 
// 전체 조회 글자 자르기
/*
유효성
아이디 6~20자
이름 2~10자
닉네임 2~10자


아이디 10자
주소 25자
닉네임 10자 
*/

// jsp 첫 페이지  글자 자르기
const sId = document.getElementById("sId");
if(sId.innerText.length > 10){
    sId.innerText = sId.innerText.substring(0, 9) + '...';
} else {
    sId.innerText = sId.innerText;
}

const sNickname = document.getElementById("sNickname");
if(sNickname.innerText.length > 10){
    sNickname.innerText = sNickname.innerText.substring(0,9) + '...';
} else {
    sNickname.innerText = sNickname.innerText;
}

// const sAddress = document.getElementById("sAddress");
const sAddress = document.getElementsByClassName("sAddress");

for(let s of sAddress){
    if(s.innerText.length > 25){
        s.innerText = s.innerText.substring(0, 24) + '...';
    } else {
        s.innerText = s.innerText;
    }
}

// if(sAddress.innerText.length > 25){
//     sAddress.innerText = sAddress.innerText.substring(0, 24) + '...';
// } else {
//     sAddress.innerText = sAddress.innerText;
// )