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
            check = check+1;
        }
    }
    if(check>2){
        alert("카테고리를 선택해주세요.");
        e.preventDefault();
    }
    
    if(inputTitle.value.trim().length == 0){
        alert("제목을 입력해주세요");
        e.preventDefault();
    }
    if(inputContent.value.trim().length == 0){
        alert("내용을 입력해주세요");
        e.preventDefault();
    }

})
