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

if(inputTitle.value.trim().length == 0){
    alert("제목을 입력해주세요");
}
if(inputContent.value.trim().length == 0){
    alert("내용을 입력해주세요");
}