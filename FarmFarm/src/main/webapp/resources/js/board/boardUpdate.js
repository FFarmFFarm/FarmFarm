
// 해당 게시판에 언더바 나오게하기
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const type3 = document.getElementById("type3");
if(boardTypeNo === 1){
    type1.classList.add("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
}
if(boardTypeNo === 2){
    type1.classList.remove("nowType");
    type2.classList.add("nowType");
    type3.classList.remove("nowType");
}
if(boardTypeNo === 3){
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
}


// 이미지 관련
const updateImg = document.getElementsByClassName("board-input-img");
const updatePrev = document.getElementsByClassName("board-preview");
const updateImgDelete = document.getElementsByClassName("board-img-delete");

// 기존에 있다가 삭제된 이미지의 순서 기록
const deleteSet = new Set();

for(let i=0; i<updateImg.length; i++){

    updateImg[i].addEventListener("change", e=>{

        // 선택된 파일이 있음
        if(e.target.files[0] != undefined){

            // 파일 읽는 객체입니다.
            const reader = new FileReader();
    
            // 자 파일을 읽어서 url에 저장
            reader.readAsDataURL(e.target.files[0]);
    
            reader.onload = ee =>{
                updatePrev[i].setAttribute("src", ee.target.result);
    
                // 미리보기가 추가 되었으니 deleteSet에서 삭제
                deleteSet.delete(i);
            }

        }else{ // 취소를 눌러서 업로드 된 미리보기를 지우기
            updatePrev[i].removeAttribute("src");
        }
    });

    // 삭제 버튼을 눌렀을 경우
    updateImgDelete[i].addEventListener("click", ()=>{

        // 미리보기에 이미지가 있을 경우에만 삭제
        if(updatePrev[i].getAttribute("src") != ""){

            // 미리보기 삭제하기
            updatePrev[i].removeAttribute("src");

            // input 값도 "" 만들어주자
            updateImg[i].value="";

            // 삭제 했으니 deleteSet에 이미지 순서를 추가해주자
            deleteSet.add(i);
        }
    });
}



// 수정하기 버튼 누르기 전 검사
const boardUpdate = document.querySelector(".board-update");

boardUpdate.addEventListener("click", e=>{
    const updateTitle = document.querySelector(".input-write-title");
    const updateContent = document.querySelector(".write-content");

    if(updateTitle.value.trim().length == 0){
        alert("게시글 제목을 작성해주세요.");
        updateTitle.focus();
        e.preventDefault();
    }
    if(updateContent.value.trim().length == 0){
        alert("게시글 내용을 입력해주세요.");
        updateContent.focus();
        e.preventDefault();
    }

    // 삭제된 이미지를 deleteImgList에 저장
    document.getElementById("deleteImgList").value=Array.from(deleteSet);

    confirm("정말 수정하시겠습니까?");
});

