// 카테고리 선택시 선택 메뉴 show
const categoryBtn = document.getElementById("category-btn");
const categoryList = document.getElementById("category-list");

categoryBtn.addEventListener("click", ()=>{
  categoryList.classList.toggle("show-category");

  const selectIcon = document.querySelector(".select-icon");
  selectIcon.classList.toggle("rotate");
});

// 카테고리 선택시 내용 출력
let category = document.querySelectorAll('input[name="category"]');
let categoryName = document.getElementById("category-name");

for(let i=0; i<category.length; i++){
  category[i].addEventListener("change", (e)=>{
    let current = e.currentTarget;
    if(current.checked){
      categoryName.innerText= current.nextElementSibling.innerText;
    }
  });
}

// 이미지 미리보기
const inputImg = document.getElementsByClassName("input-img");
const preview = document.getElementsByClassName("preview");
const deleteImg = document.getElementsByClassName("delete-img");

for(let i=0; i<inputImg.length; i++){

  inputImg[i].addEventListener("change", (e)=>{
    if(e.target.files[0] != undefined){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = e =>{
        preview[i].setAttribute("src", e.target.result);
      }
    }else{
      preview[i].removeAttribute("src");
    }
  });

  deleteImg[i].addEventListener("click",()=>{
    if(preview[i].getAttribute("src")!=""){
      preview[i].removeAttribute("src");
      inputImg[i].value="";
    }
  });
}


// 게시글 유효성 검사
const enrollValidate = ()=>{
  const postTitle = document.querySelector("[name='postTitle']");
  const unitPrice = document.querySelector("[name='unitPrice']");
  const openDate = document.querySelector("[name='openDate']");
  const postContent = document.querySelector("[name='postContent']");

  if(postTitle.value.trim().length==0){
    alert("제목을 입력해주세요.");
    postTitle.value="";
    postTitle.focus();
    return false;
  }
  if(unitPrice.value.trim().length==0){
    alert("판매가격을 입력해주세요.");
    unitPrice.value="";
    unitPrice.focus();
    return false;
  }
  if(openDate.value.trim().length==0){
    alert("생산일을 입력해주세요.");
    openDate.value="";
    openDate.focus();
    return false;
  }
  if(postContent.value.trim().length==0){
    alert("내용을 입력해주세요.");
    postContent.value="";
    postContent.focus();
    return false;
  }

};