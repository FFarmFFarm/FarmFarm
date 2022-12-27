// 프로필 수정
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

}


