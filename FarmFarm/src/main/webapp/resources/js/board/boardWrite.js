
(e=>{
    if(loginMember == ""){
    loginConfirmOpen();
    e.preventDefault();
    // alert("로그인해라ㅡㅡ");
}
})();


// 게시글의 카테고리 번호 표시해주기
const share = document.getElementById("share");
const tip = document.getElementById("tip");
const question = document.getElementById("question");
if(typeNo === 1){
    share.checked = true;
}
if(typeNo === 2){
    tip.checked = true;
}
if(typeNo === 3){
    question.checked = true;
}



const inputImg = document.getElementsByClassName("board-input-img");
const preview = document.getElementsByClassName("board-preview");
const deleteImg = document.getElementsByClassName("board-img-delete");

for(let i=0; i<inputImg.length; i++){
    inputImg[i].addEventListener("change", e=>{

        if(e.target.files[0] != undefined){
            const reader = new FileReader();

            reader.readAsDataURL(e.target.files[0]);

            reader.onload = event =>{
                preview[i].setAttribute("src", event.target.result);
            }
        }else{
            preview[i].setAttribute("src");
        }
    });

    deleteImg[i].addEventListener("click", ()=>{
        if(preview[i].getAttribute("src") != ""){
            preview[i].removeAttribute("src");
            inputImg[i].value="";
        }
    });
}



const inputTitle = document.querySelector(".input-write-title");
const inputContent = document.querySelector(".write-content");
const categorys = document.getElementsByClassName("boardTypeNo")

const writeBtn = document.querySelector(".board-submit");
writeBtn.addEventListener("click", e=>{
    
    let check = 0;
    for(const category of categorys){
        if(!category.checked){
            console.log("카테고리를 선택해주세요.");
            check = 0;
        }else{
            check = check+1;
        }
    }
    
    // if(check == 0){
    //     alert("카테고리를 선택해주세요.");
    //     e.preventDefault();
    // }
    
    if(inputTitle.value.trim().length == 0){
        alert("제목을 입력해주세요");
        inputTitle.value="";
        inputTitle.focus();
        e.preventDefault();
    }

    if(inputContent.value.trim().length == 0){
        alert("내용을 입력해주세요");
        inputContent.value="";
        inputContent.focus();
        e.preventDefault();
    }

})
