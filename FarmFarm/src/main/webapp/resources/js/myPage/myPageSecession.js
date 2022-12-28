// const checkObj = {
//     "agreeInput"         : false, // 동의
// };

// // 회원 가입 양식이 제출 되었을 때
// document.getElementById("secessionFrm").addEventListener("submit",function(event){

//     // checkObj의 속성 중 하나라도 false가 있다면 제출 이벤트 제거

//     // for in 구문 : 객체의 key 값을 순서데로 접근하는 반복문
//     // [작성법]
//     // for(let 변수명 in 객체명)
//                // key
//     // -> 객체에서 순서대로 key를 하나씩 꺼내 왼쪽 변수에 저장

//     for (let key in checkObj){
        
//         let str;

//         // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
//         if( !checkObj[key] ){

//             switch(key){
//                 case "agreeInput" : str = "탈퇴 안내 사항을 확인해주세요."; break;
//             }

//             alert(str); // 대화상자 출력

//             // 유효하지 않은 입력으로 포커스 이동
//             document.getElementById(key).focus();

//             event.preventDefault(); // 제출 이벤트 제거
//             return; // 함수 종료

//         }
//     }

// })

// // 체크박스 유효성 검사
// const agreeInput = document.getElementById("agreeInput");
// agreeInput.addEventListener("change", function(){
//     if(agreeInput.checked){
//         checkObj.agreeInput = true;
//         return;
//     }
// });




// 회원 탈퇴
const secessionFrm = document.getElementById("secessionFrm");
if(secessionFrm != null){
    secessionFrm.addEventListener("submit",(e)=>{
    
        const agreeInput = document.getElementById("agreeInput");
        if(!agreeInput.checked){
            alert("탈퇴를 원하신다면 약관에 동의해주세요.");
            e.preventDefault();
            return;
        }

        const memberPw = document.getElementById("memberPw");
        if(memberPw.value.trim().length == 0){
            alert("비밀번호를 입력해주세요.");
            memberPw.focus();
            e.preventDefault();
            return;
        }

        if(!confirm("정말 탈퇴하시겠습니까?")){
            alert("탈퇴가 취소되었습니다.");
            e.preventDefault();
            return;
        }
    });
}