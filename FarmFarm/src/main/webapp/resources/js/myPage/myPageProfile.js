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
        "currentPw" :false,
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
            pwConfirm.innerText ="현재 비밀번호를 작성해주세요.";
            pwConfirm.classList.remove("confirm");
            pwConfirm.classList.add("error");
            currentPw.focus();
            e.preventDefault();
            return;
        } else {
            if(currentPw.value == loginMemberPw.value){
                checkpw.currentPw=true;
                pwConfirm.innerText="현재 비밀번호가 일치합니다.";
                pwConfirm.classList.add("confirm");
                pwConfirm.classList.remove("error");
            }else{
                checkpw.currentPw=false;
                pwConfirm.innerText="현재 비밀번호가 일치하지 않습니다.";
                pwConfirm.classList.remove("confirm");
                pwConfirm.classList.add("error");
            }
        }
    })

    pwConfirm.classList.remove("confirm", "error");
    
    newPw.addEventListener("input",()=>{

            const regEx = /^[\w!@#-_]{8,20}$/;
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
};

