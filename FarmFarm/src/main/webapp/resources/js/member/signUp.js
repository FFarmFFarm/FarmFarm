// 썸네일 클릭 시 Modal창으로 출력하기

// 즉시 실행되는 익명 함수
(()=>{
    const agreeText = document.getElementsByClassName("agree-text");

    if(agreeText.length > 0){ 

        // Modal 관련 요소 얻어오기
        const modal = document.querySelector(".modal");
        const modalClose = document.getElementById("modal-close");
        const modalImage = document.getElementById("modal-text");

        // 썸네일 요소에 클릭 이벤트 추가
        for(let th of agreeText){
            th.addEventListener("click", () => {
                // modal 창에 show 클래스가 없으면 추가 (있으면 삭제)
                modal.classList.toggle("show");
                
                // 클릭한 썸네일의 src 속성값을 얻어와
                // modal-image의 src 속성으로 세팅
                modalImage.setAttribute("src", th.getAttribute("src"));
            });
        }
        
        // x버튼 동작
        modalClose.addEventListener("click", () => {
            
            // hide 클래스를 추가해서 0.5초 동안 투명해지는 애니메이션 수행
            modal.classList.toggle("hide");

            // 0.5초 후에 show, hide 클래스를 모두 제거
            setTimeout(() => {
                modal.classList.remove("show", "hide");
            }, 500);

        });

    }

})();


// 주소
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}


// JS 객체를 이용한 유효성 검사 결과 저장 객체
// JS 객체 = {"K":V, "K": V, ...} (Map 형식)

// 변수명.key 또는 변수명["key"]를 이용하면 객체 속성 접근 가능

const checkObj = {
    "memberId"     : false,
    "memberPw"        : false,
    "memberPwConfirm" : false,
    "memberName"  : false,
    "memberNickname"  : false,
    "agreeInput1"         : false, // 동의
    "agreeInput"         : false, // 동의
    "farmImg"         : false // 사진
    // "userNum" :false
};

// 회원 가입 양식이 제출 되었을 때
if(document.getElementById("signUpFrm") != null){
    document.getElementById("signUpFrm").addEventListener("submit",function(event){
        // checkObj의 속성 중 하나라도 false가 있다면 제출 이벤트 제거

        // for in 구문 : 객체의 key 값을 순서데로 접근하는 반복문
        // [작성법]
        // for(let 변수명 in 객체명)
                // key
        // -> 객체에서 순서대로 key를 하나씩 꺼내 왼쪽 변수에 저장

        for (let key in checkObj){
            
            let str;

            // checkObj 속성 하나를 꺼내 값을 검사했는데 false인 경우
            if( !checkObj[key] ){

                switch(key){
                    case "memberId" : str = "아이디가 유효하지 않습니다."; break;
                    case "memberPw" : str = "비밀번호 유효하지 않습니다."; break;
                    case "memberPwConfirm" : str = "비밀번호 확인이 유효하지 않습니다."; break;
                    case "memberName" : str = "이름이 유효하지 않습니다."; break;
                    case "memberNickname" : str = "닉네임이 유효하지 않습니다."; break;
                    case "agreeInput1" : str = "농장인증 절차 확인을 확인해주세요."; break;
                    case "agreeInput" : str = "개인 정보 수집 및 이용동의를 확인해주세요."; break;
                    case "farmImg" : str = "농장 인증을 해주세요."; break;
                    // case "userNum" : str = "전화번호 인증을 해주세요."; break;
                }

                alert(str); // 대화상자 출력

                // 유효하지 않은 입력으로 포커스 이동
                document.getElementById(key).focus();

                event.preventDefault(); // 제출 이벤트 제거
                return; // 함수 종료

                
            }
        }
    });
}

// 전화번호 인증
if(document.getElementById("signUpFrm") != null){
    document.getElementById("signUpFrm").addEventListener("submit",(e)=>{

        const userNum = document.getElementById("userNum");
        if(userNum.value.trim().length == 0){
            alert("전화번호 인증을 해주세요.");
            userNum.focus();
            e.preventDefault();
            return;
        }
        
        if(!checkObj.userNum){
            alert("인증 번호가 잘못되었습니다.");
            userNum.focus();
            e.preventDefault();
            return;
        }
    });
}

// 체크박스 유효성 검사
const agreeInput1 = document.getElementById("agreeInput1");
const agreeInput = document.getElementById("agreeInput");
if(agreeInput1 != null){
    agreeInput1.addEventListener("change", function(){
        if(agreeInput1.checked){
            checkObj.agreeInput1 = true;
            return;
        }
    });
}
agreeInput.addEventListener("change", function(){
    if(agreeInput.checked){
        checkObj.agreeInput = true;
        return;
    }
});

// 농장 인증 유효성 검사
const farmImg = document.getElementById("farmImg");
if(farmImg != null){
    farmImg.addEventListener("change", function(){
        if(farmImg != null){
            checkObj.farmImg = true;
            return;
        }
    })
}


// 아이디 유효성 검사
const memberId = document.getElementById("memberId"); // input
const IdConfirm = document.getElementById("IdConfirm"); 

// input 이벤트 : input 태그에 입력이 되었을 경우 (모든 입력 인식)
memberId.addEventListener("input",function(){

    // 문자가 입력되지 않은 경우
    if(memberId.value.trim().length == 0){
        IdConfirm.innerText = "아이디를 입력해주세요.";
        memberId.value = "";

        // confirm, error 클래스 제거 -> 검정글씨로 만들기
        IdConfirm.classList.remove("confirm", "error");

        // 유효성 검사 확인 객체에 현재 상태 저장
        checkObj.memberId = false;
        return;
    }

    // 정규표현식을 이용한 유효성 검사
    const regEx = /^[a-zA-Z0-9-_]{6,20}$/;

    if(regEx.test(memberId.value)){ // 유효한 경우
        $.ajax({
            url : "/idDupCheck", // 비동기 통신을 진행할 서버 요청 주소
            data : { "memberId" : memberId.value }, // JS -> 서버로 전달할 값(여러개 가능)
            type : "GET", // 데이터 전달 방식(GET/POST) -> GET 방식을 많이 사용
            success : (result) => { // 비동기 통신을 성공해서 응답을 받았을 때
                // result : 서버로부터 전달 받은 응답 데이터
                //          (매개변수 이름은 자유)

                console.log(result);

                if(result == 0){ // 중복 X
                    IdConfirm.innerText = "사용 가능한 아이디 입니다.";
                    IdConfirm.classList.add("confirm");
                    IdConfirm.classList.remove("error");

                    checkObj.memberId = true;
                } else {
                    IdConfirm.innerText = "이미 사용 중인 아이디 입니다.";
                    IdConfirm.classList.add("error");
                    IdConfirm.classList.remove("confirm");

                    checkObj.memberId = false;
                }
            },
            error : () => { // 비동기 통신이 실패했을 때 수행
                console.log("ajax 통신 실패");
            },
            complete : () => { // succecc, error 수행여부 관계없이 무조건 수행
                console.log("중복 검사 수행 완료");
                
            }
        });

    } else { // 유효하지 않은 경우

        IdConfirm.innerText = "아이디 형식이 유효하지 않습니다.";
        IdConfirm.classList.add("error");
        IdConfirm.classList.remove("confirm");

        checkObj.memberId = false;
    }

});



// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwConfirm = document.getElementById("pwConfirm");

// 비밀번호 입력 시
memberPw.addEventListener("input",function(){

    // 비밀번호가 입력되지 않은 경우
    if(memberPw.value.trim().length == 0){
        pwConfirm.innerText = "영어, 숫자, 특수문자(!,@,#,-,_) 최소 6자 이상 입력해주세요.";
        memberPw.value = "";
        pwConfirm.classList.remove("confirm", "remove"); // 검정 글씨로 변환
        checkObj.memberPw = false;
        return;
    }

    // 비밀번호 정규표현식 검사
    const regEx = /^[a-zA-Z\d!@#-_]{6,}$/;

    if(regEx.test(memberPw.value)){ // 유효한 비밀번호
        checkObj.memberPw = true;

        // 유효한 비밀번호 + 확인 작성 X
        if(memberPwConfirm.value.trim().length == 0){
            pwConfirm.innerText = "유효한 비밀번호 형식입니다.";
            pwConfirm.classList.add("confirm");
            pwConfirm.classList.remove("error");
        
        } else{ // 유효한 비밀번호 + 확인 작성O -> 같은지 비교
            // 비밀번호가 입력될 때
            // 비밀번호가 확인에 작성된 값과 일치하는 경우
            if(memberPw.value == memberPwConfirm.value){
                pwConfirm.innerText = "비밀번호가 일치합니다."
                pwConfirm.classList.add("confirm");
                pwConfirm.classList.remove("error");
                
                checkObj.memberPwConfirm = true;
            
            } else { // 일치하지 않는 경우
                pwConfirm.innerText = "비밀번호가 일치하지 않습니다."
                pwConfirm.classList.add("error");
                pwConfirm.classList.remove("confirm");
                
                checkObj.memberPwConfirm = false;
            }
        
        }

    } else { // 유효하지 않음
        pwConfirm.innerText = "비밀번호 형식이 유효하지 않습니다.";
        pwConfirm.classList.add("error");
        pwConfirm.classList.remove("confirm");
        checkObj.memberPw = false;

    }

});


// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input",function(){

    // 비밀번호가 유효할 경우에만 
    // 비밀번호 == 확인 같은지 비교
    if(checkObj.memberPw){ // 비밀번호가 유효한 경우
        // 비밀번호와 비밀번호 확인이 같은지 검사
        if(memberPw.value == memberPwConfirm.value){
            pwConfirm.innerText = "비밀번호가 일치합니다.";
            pwConfirm.classList.add("confirm");
            pwConfirm.classList.remove("error");
    
            checkObj.memberPwConfirm = true;
        } else{
            pwConfirm.innerText = "비밀번호가 일치하지 않습니다.";
            pwConfirm.classList.add("error");
            pwConfirm.classList.remove("confirm");
    
            checkObj.memberPwConfirm = false;
        }

    } else { // 비밀번호가 유효하지 않은 경우
        checkObj.memberPwConfirm = false;
    }

});

// 이름 유효성 검사
const memberName = document.getElementById("memberName");
const nameConfirm = document.getElementById("nameConfirm");

memberName.addEventListener("input", function(){
    if(memberName.value.trim().length == 0){
        nameConfirm.innerText = "한글, 영어로만 2~10글자 입력해주세요.";
        nameConfirm.classList.remove("confirm", "error");
        checkObj.memberName = false;
        return;
    }
    const regEx = /^[a-zA-Z가-힇]{2,10}$/;
    if(regEx.test(memberName.value)){
        nameConfirm.innerText = "유효한 이름입니다."
        nameConfirm.classList.add("confirm");
        nameConfirm.classList.remove("error");
        checkObj.memberName=true;

    }else{
        nameConfirm.innerText="이름 형식이 유효하지 않습니다.";
        nameConfirm.classList.add("error");
        nameConfirm.classList.remove("confirm");
        checkObj.memberName=false;
    }
});


// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nicknameConfirm = document.getElementById("nicknameConfirm");

memberNickname.addEventListener("input",function(){

    // 닉네임에 문자가 입력되지 않은 경우
    if(memberNickname.value.trim().length == 0){
        nicknameConfirm = "한글, 영어, 숫자 2~10글자로 입력해주세요.";
        nicknameConfirm.classList.remove("confirm", "error");

        checkObj.memberNickname = false;
        return;
    
    } 

    // 닉네임 정규표현식 검사
    const regEx = /^[가-힣a-zA-Z0-9]{2,10}$/;
                    // \w == [a-zA-Z0-9]

    if(regEx.test(memberNickname.value)){ // 유효한 경우

        // ** 닉네임 중복검사 코드 추가 예정 **
        const param = {"memberNickname" : memberNickname.value};
        
        $.ajax({
            url : '/nicknameDupCheck',
            data : param,
            // type : "GET", // type 미작성 시 기본값 GET
            success : (res) => {
                // 매개변수 res == 서버 비동기 통신 응답 데이터
                // console.log("res : " + res);

                if(res == 0){ // 중복 X
                    nicknameConfirm.innerText = "사용 가능한 닉네임 입니다.";
                    nicknameConfirm.classList.add("confirm");
                    nicknameConfirm.classList.remove("error");

                    checkObj.memberNickname = true;
                } else {
                    nicknameConfirm.innerText = "이미 사용 중인 닉네임 입니다.";
                    nicknameConfirm.classList.add("error");
                    nicknameConfirm.classList.remove("confirm");

                    checkObj.memberNickname = false;
                }
            },
            error : () => {
                console.log("닉네임 중복 검사 실패");
            },
            complete : tempFn

        });
    
        // nickMessage.innerText = "유효한 닉네임 형식입니다."
        // nickMessage.classList.add("confirm");
        // nickMessage.classList.remove("error");
        // checkObj.memberNickname = true;
        
    } else { // 유효하지 않을 경우
        nicknameConfirm.innerText = "유효하지 않는 닉네임 형식입니다."
        nicknameConfirm.classList.add("error");
        nicknameConfirm.classList.remove("confirm");
        checkObj.memberNickname = false;
    }
});


function tempFn(){
    console.log("닉네임 검사 완료");

}


// 전화번호 유효성 검사
const memberTel = document.getElementById("to");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input", function(){
    if(memberTel.value.trim().length == 0){
        telMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
        telMessage.classList.remove("confirm", "error");
        checkObj.memberTel = false;
        return;
    } 

    // 전화번호 정규표현식 검사
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(memberTel.value)){ // 유효한 경우
        telMessage.innerText = "유효한 전화번호 형식입니다."
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true;
        
    } else{ // 유효하지 않은 경우
        telMessage.innerText = "전화번호 형식이 유효하지 않습니다."
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false;
    }

});

// 전화번호 인증 유효성 



// 생일 유효성 검사
const memberBirth = document.getElementById("memberBirth");
memberBirth.addEventListener("input", ()=>{
    if(memberBirth.value.trim().length == 0){
        alert("생일을 입력해주세요.");
        memberBirth.focus();
        checkObj.memberBirth=false;
        return;
    }
    checkObj.memberBirth=true;
});

// 이미지 미리보기
const inputImage = document.getElementsByClassName("input-image");
const preview = document.getElementsByClassName("preview");
const deleteImage = document.getElementsByClassName("delete-image");

// 미리보기와 관련된 모든 요소의 개수는 5개로 동일
// == 인덱스 번호를 통해 하나의 그룹을 지정할 수 있다.
// inputImage[0]  preview[0]  deleteImage[0]

for(let i=0; i<inputImage.length; i++){

    // inputImage[i] 요소의 값이 변했을 때
    inputImage[i].addEventListener("change", event => {

        // event.target.files : 선택된 파일의 정보가 배열 형태로 반환
        if(event.target.files[0] != undefined) { // 선택된 파일이 있을 경우

            const reader = new FileReader(); // 파일을 읽는 객체

            reader.readAsDataURL(event.target.files[0]);
            // 지정된 input type="file"의 파일을 읽어와서
            // URL 형태로 저장

            reader.onload = e => { // 파일을 다 읽어온 후
                // e.target == reader
                // e.target.result == 읽어온 파일 URL
                preview[i].setAttribute("src", e.target.result);

            }

        } else { // 취소를 누를 경우
            // 미리보기 지우기
            preview[i].removeAttribute("src"); // src 속성 제거

        }

    });

    // 미리보기 삭제 버튼 클릭 시 동작
    deleteImage[i].addEventListener("click", () => {

        // 미리보기 이미지가 존재할 때만 삭제
        if(preview[i].getAttribute("src") != ""){

            // 미리보기 삭제
            preview[i].removeAttribute("src");

            // input의 값을 ""으로 만들어서 삭제
            inputImage[i].value = "";
        }


    });
}

