// 아이디 찾기
if(document.getElementById("findFrm") != null){

    document.getElementById("findFrm").addEventListener("submit", (e)=>{

        const inputName = document.getElementById("memberName");
        const inputTel = document.getElementById("to");
        const userNum = document.getElementById("userNum");

        if(inputName.value.trim().length == 0){
            alert("이름을 입력해주세요.");
            inputName.focus();
            e.preventDefault();
            return;
        }

        if(inputTel.value.trim().length == 0){
            alert("전화번호를 입력해주세요.");
            inputTel.focus();
            e.preventDefault();
            return;
        }

        if(userNum.value.trim().length == 0){
            alert("전화번호 인증을 해주세요.");
            userNum.focus();
            e.preventDefault();
            return;
        }
    });
};

// 비밀번호 찾기
if(document.getElementById("findPwFrm") != null){

    document.getElementById("findPwFrm").addEventListener("submit", (e)=>{

        const inputId = document.getElementById("memberId");
        const inputName = document.getElementById("memberName");
        const inputTel = document.getElementById("to");
        const userNum = document.getElementById("userNum");

        if(inputId.value.trim().length == 0){
            alert("아이디를 입력해주세요.");
            inputName.focus();
            e.preventDefault();
            return;
        }

        if(inputName.value.trim().length == 0){
            alert("이름을 입력해주세요.");
            inputName.focus();
            e.preventDefault();
            return;
        }

        if(inputTel.value.trim().length == 0){
            alert("전화번호를 입력해주세요.");
            inputTel.focus();
            e.preventDefault();
            return;
        }

        if(userNum.value.trim().length == 0){
            alert("전화번호 인증을 해주세요.");
            userNum.focus();
            e.preventDefault();
            return;
        }
    });
}

const checkObj = {
    "memberPw"        : false,
    "memberPwConfirm" : false,
};

// 비밀번호 변경
if(document.getElementById("changePwFrm") != null){

    document.getElementById("changePwFrm").addEventListener("submit", (e)=>{
        const inputName = document.getElementById("memberName");
        const inputId = document.getElementById("memberId");
        const inputTel = document.getElementById("to");
        
        if(inputName.value.trim().length == 0){
            alert("이름을 입력해주세요");
            inputName.focus();
            e.preventDefault();
            return;
        }
        if(inputId.value.trim().length == 0){
            alert("아이디를 입력해주세요");
            inputId.focus();
            e.preventDefault();
            return;
        }
        if(inputTel.value.trim().length == 0){
            alert("전화번호를 입력해주세요");
            inputTel.focus();
            e.preventDefault();
            return;
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

}