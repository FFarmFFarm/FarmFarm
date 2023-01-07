// 카테고리 선택시 선택 메뉴 show
const categoryBtn = document.getElementById("category-btn");
const categoryList = document.getElementById("category-list");

categoryBtn.addEventListener("click", ()=>{
  categoryList.classList.toggle("show-category");

  const selectIcon = document.querySelector(".select-icon");
  selectIcon.classList.toggle("rotate");
});

// 선택된 카테고리 불러오기
(()=>{
  const categoryNoList = document.getElementsByName("categoryNo");
  for(let item of categoryNoList){
    if(item.value==categoryNo){
      item.checked = true;
      document.getElementById("categoryName").innerText= item.nextElementSibling.innerText;
    }
  }
})();


// 카테고리 선택시 내용 출력
let category = document.querySelectorAll('input[name="categoryNo"]');
let categoryName = document.getElementById("categoryName");

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

const deleteSet = new Set();

for(let i=0; i<inputImg.length; i++){

  inputImg[i].addEventListener("change", (e)=>{
    if(e.target.files[0] != undefined){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = e =>{
        preview[i].setAttribute("src", e.target.result);
        // 삭제하면 안된다 == deleteSet에서 해당 순번 제거
        deleteSet.delete(i);

        preview[i].nextElementSibling.remove();
      }
    }else{
      preview[i].removeAttribute("src");
      if(preview[i].nextElementSibling==null){

        const addPhoto = document.createElement("p");
        addPhoto.innerText = "사진추가";
  
        preview[i].after(addPhoto);
      }
    }
  });

  deleteImg[i].addEventListener("click",()=>{
    if(preview[i].getAttribute("src")!=""){
      preview[i].removeAttribute("src");
      inputImg[i].value="";
      
      deleteSet.add(i)

      if(preview[i].nextElementSibling==null){
        const addPhoto = document.createElement("p");
        addPhoto.innerText = "사진추가";
  
        preview[i].after(addPhoto);
      }
    }
  });
}

const unitPrice = document.querySelector("[name='unitPrice']");


unitPrice.addEventListener("focus",()=>{
  unitPrice.setAttribute("placeholder", "");
})
unitPrice.addEventListener("focusout",()=>{
  unitPrice.setAttribute("placeholder", "0");
})


unitPrice.addEventListener('keyup', (e)=>{
  if((e.keyCode < 48 || e.keyCode > 57)&& e.keyCode!=8
    && (e.keyCode < 96 || e.keyCode > 105 )){
    alert("숫자만 입력해주세요");
    e.target.value="";
  }

  let value = e.target.value;                 
  value = Number(value.replaceAll(',', ''));
  const formatValue = value.toLocaleString('ko-KR');
  unitPrice.value = formatValue;
  
})

// 게시글 유효성 검사
const enrollPostForm = document.getElementById("enrollPostForm");

enrollPostForm.addEventListener("submit", (event)=>{

  const categoryNo = document.querySelectorAll("[name='categoryNo']");
  
  let countC = 0;
  for(let i=0; i<categoryNo.length; i++){
    if(categoryNo[i].checked){
      countC += 1;
    }
  }
  
  if(countC==0){
    alert("판매상품의 카테고리를 설정해주세요.");
    event.preventDefault();
    return;
  }

  const postTitle = document.querySelector("[name='postTitle']");
  if(postTitle.value.trim().length==0){
    alert("제목을 입력해주세요.");
    postTitle.value="";
    postTitle.focus();
    event.preventDefault();
    return;
  }

  const price= Number(unitPrice.value.split(",").join(""));
  unitPrice.value = price;

  if(unitPrice.value==0){
    alert("판매가격을 입력해주세요.");
    unitPrice.value=0;
    unitPrice.focus();
    event.preventDefault();
    return;
  }

  const openDate = document.querySelector("[name='openDate']");
  if(openDate.value.trim().length==0){
    alert("생산일을 입력해주세요.");
    openDate.value="";
    openDate.focus();
    event.preventDefault();
    return;
  }

  const thumbnail = document.getElementsByClassName("thumbnail-preview")[0];
  if(thumbnail.getAttribute("src")==null){
    alert("대표 이미지를 설정해주세요.");
    thumbnail.value="";
    event.preventDefault();
    return;
  }

  const postContent = document.querySelector("[name='postContent']");
  if(postContent.value.trim().length==0){
    alert("내용을 입력해주세요.");
    postContent.value="";
    postContent.focus();
    event.preventDefault();
    return;
  }

  document.getElementById("deleteList").value = Array.from(deleteSet);

});

