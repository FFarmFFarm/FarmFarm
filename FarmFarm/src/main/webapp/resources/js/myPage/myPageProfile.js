// 프로필 수정_이미지
const imgFrm = document.getElementById("imgFrm");
const profileImage = document.getElementById("memberProfileImg");
const deleteImage = document.getElementById("delete-img");
const imageInput = document.getElementById("farmImg");

if(imgFrm != null){
    // 초기 프로필 이지 상태를 저장하는 변수
    // (true : 업로드된 이미지 있음, false : 기본 이미지)
    let initCheck; 

    // 이미지가 업로드 되었거나 삭제되었음을 나타내는 변수
    // (-1 : 초기값(취소), 0 : 프로필 삭제(x버튼 클릭), 1 : 새 이미지 업로드)
    let deleteCheck = -1;



    // 프로필 수정 페이지에 처음 들어왔을 때의 이미지 경로
    const originalImage = profileImage.getAttribute("src");
    const defaultImg = "/resources/images/myPage/profile/profileImg.png";

    if(profileImage.getAttribute("src") == defaultImg){
        // 기본 이미지인 경우
        initCheck = false;
    } else {
        initCheck = true;
    }

    imageInput.addEventListener("change", e=>{
        if(e.target.files[0] != undefined){ // 선택된 파일O
            const reader = new FileReader(); // 파일을 읽음 
            reader.readAsDataURL(e.target.files[0]); // 지정된 파일 읽기 시작 
            reader.onload = event => {
                profileImage.setAttribute("src", event.target.result);
                deleteCheck = 1;
            }
        } else{ // 사진 업로드 취소 버튼 클릭
            profileImage.setAttribute("src", originalImage);
            deleteCheck = -1;
        }
    });

    deleteImage.addEventListener("click", ()=>{
        profileImage.setAttribute("src", defaultImg);
        imageInput.value="";
        deleteCheck = 0;
    });

    function profileValidate(){
        if(!initCheck && deleteCheck==1){return true;}
        if(initCheck && deleteCheck==0){return true;}
        if(initCheck && deleteCheck==1){return true;}
        alert("이미지 변경 후 클릭하세요");
        return false;
    }

};

// 프로필 수정_개인 정보
const myProfileFrm = document.getElementById("myProfileFrm");

if(myProfileFrm != null){
    // 비밀번호 변경
    const currentPw = document.getElementById("currentPw");
    const newPw = document.getElementById("newPw");
    const newPwConfirm = document.getElementById("newPwConfirm");
    const pwConfirm = document.getElementById("pwConfirm");

    const checkpw = {
        "newPw" : false,
        "newPwConfirm" : false
    }

    myProfileFrm.addEventListener("submit", (e)=>{

        if(currentPw.value.trim().length==0){
            alert("현재 비밀번호를 작성해주세요.");
            currentPw.focus();
            e.preventDefault();
            return;
        }
        if(newPw.value.trim().length==0){
            alert("새 비밀번호를 작성해주세요.");
                newPw.focus();
                e.preventDefault();
                return;
        }
        if(newPwConfirm.value.trim().length==0){
            alert("새 비밀번호 확인을 작성해주세요.");
                newPwConfirm.focus();
                e.preventDefault();
                return;
        }
        for(let key in checkpw){
            if(!checkpw[key]){
                switch(key){
                    case "newPw" : alert("새 비밀번호가 유효하지 않습니다."); break;
                    case "newPwConfirm" : alert("새 비밀번호 확인이 유효하지 않습니다."); break;
                }
                document.getElementById(key).focus();
                e.preventDefault();
                return;
            }
        }
    })

    currentPw.addEventListener("input",()=>{
        if(currentPw.value.trim().length==0){
            alert("현재 비밀번호를 작성해주세요.");
            currentPw.focus();
            e.preventDefault();
            return;
        } 
    })

    pwConfirm.classList.remove("confirm", "error");
    
    newPw.addEventListener("input",(e)=>{

            const regEx = /^[a-zA-Z\d!@#-_]{6,}$/;
            if(regEx.test(newPw.value)){
                checkpw.newPw = true;
    
                if(newPwConfirm.value.trim().length == 0){
                    pwConfirm.innerText="유효한 비밀번호입니다.";
                    pwConfirm.classList.add("confirm");
                    pwConfirm.classList.remove("error");
                    e.preventDefault();
                    return;
                }else{
                    if(newPw.value == newPwConfirm.value){
                        checkpw.newPwConfirm=true;
                        pwConfirm.innerText="비밀번호가 일치합니다.";
                        pwConfirm.classList.add("confirm");
                        pwConfirm.classList.remove("error");
                    }else{
                        checkpw.newPwConfirm=false;
                        pwConfirm.innerText="비밀번호가 일치하지 않습니다.";
                        pwConfirm.classList.remove("confirm");
                        pwConfirm.classList.add("error");
                    }
                }
            }else{
                pwConfirm.innerText="유효하지 않는 비밀번호입니다.";
                pwConfirm.classList.add("error");
                pwConfirm.classList.remove("confirm");
                checkpw.newPw=false;
            }
    });

    newPwConfirm.addEventListener("input", ()=>{

        if(checkpw.newPw){

            if(newPw.value == newPwConfirm.value){
                pwConfirm.innerText="비밀번호가 일치합니다.";
                pwConfirm.classList.remove("error");
                pwConfirm.classList.add("confirm");
                checkpw.newPwConfirm=true;
            }else{
                pwConfirm.innerText="비밀번호가 일치하지 않습니다.";
                pwConfirm.classList.add("error");
                pwConfirm.classList.remove("confirm");
                checkpw.newPwConfirm=false;
            }
        }else{
            checkpw.newPwConfirm=false;
        }
    })


    // 닉네임 
    const memberNickname = document.getElementById("memberNickname");
    const nicknameConfirm = document.getElementById("nicknameConfirm");
    
    memberNickname.addEventListener("click", () => {
        nicknameConfirm.innerText="한글, 영어, 숫자 2~10글자 입력해주세요.";
        nicknameConfirm.classList.remove("confirm", "error");
    });

    const ntcheck = {
        "memberNickname" : true
    }

    memberNickname.addEventListener("input", () => {
        const regEx = /^[가-힣a-zA-Z0-9]{2,10}$/;

        if(oriNickname != memberNickname.value){
            if(regEx.test(memberNickname.value)){
                $.ajax({
                    url : "/nicknameDupCheck",
                    data : {"memberNickname" : memberNickname.value},
                    success : result => {
                        if(result == 0){
                            nicknameConfirm.innerText = "사용 가능한 닉네임입니다.";
                            nicknameConfirm.classList.add("confirm");
                            nicknameConfirm.classList.remove("error");
                            ntcheck.memberNickname = true;
                        } else{
                            nicknameConfirm.innerText="사용 중인 닉네임입니다.";
                            nicknameConfirm.classList.add("error");
                            nicknameConfirm.classList.remove("confirm");
                            ntcheck.memberNickname = false;
                        }
                    },
                    error : ()=>{
                        alert("ajax 통신 중 오류 발생 : 닉네임 수정");
                        ntcheck.memberNickname = false;
                    }
                })
            } else{
                nicknameConfirm.innerText="이름 형식이 유효하지 않습니다.";
                nicknameConfirm.classList.add("error");
                nicknameConfirm.classList.remove("confirm");
                ntcheck.memberNickname = false;
            }
        }
    });
    function checkValidate(){
        if(oriNickname == memberNickname.value){
            alert("변경 사항이 없습니다.");
            return false;
        }

        if(memberNickname.value.trim().length == 0){
            alert("닉네임을 입력해주세요.");
            return false;
        }

        if(!ntcheck.memberNickname){
            alert("닉네임을 다시 입력해주세요.");
            return false;
        }
    }
};

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

