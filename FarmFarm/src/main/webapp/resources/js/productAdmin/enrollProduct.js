// 카테고리 선택시 선택 메뉴 show
const categoryBtn = document.getElementById("category-btn");
const categoryList = document.getElementById("category-list");

categoryBtn.addEventListener("click", ()=>{
  categoryList.classList.toggle("show-category");

  const selectIcon = document.querySelector(".select-icon");
  selectIcon.classList.toggle("rotate");
});

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

// 썸네일 이미지 미리보기
const inputThumbnail = document.getElementById("img0");
const preview = document.getElementsByClassName("preview")[0];
const deleteThumbnail = document.getElementsByClassName("delete-thumbnail")[0];

inputThumbnail.addEventListener("change", (e)=>{
  if(e.target.files[0] != undefined){
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = e =>{
      preview.setAttribute("src", e.target.result);
      // preview.display="block";
      preview.nextElementSibling.style.display='none';
    }
  }else{
    preview.removeAttribute("src");
    preview.nextElementSibling.style.display='block';
    
  }
});

deleteThumbnail.addEventListener("click",()=>{
  if(preview.getAttribute("src")!=""){
    preview.removeAttribute("src");
    inputThumbnail.value="";
    preview.nextElementSibling.style.display='block';
  }
});

// 상품 이미지 버튼
const inputImg = document.getElementsByClassName("input-img");
const deleteImg = document.getElementsByClassName("delete-img");
for(let i=0;i<inputImg.length;i++){

  inputImg[i].addEventListener("change", (e)=>{
    if(e.target.files[0]!= undefined){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      
      deleteImg[i].style.display='block';
    }else{
      deleteImg[i].style.display='none';
    }
  })

  deleteImg[i].addEventListener("click",()=>{
    if(inputImg[i].files[0]!= undefined){
      inputImg[i].value="";
      deleteImg[i].style.display='none';
    }
  })
}

const unitPrice = document.querySelector("[name='unitPrice']");

unitPrice.addEventListener('keyup', (e)=>{
  if((e.keyCode < 48 || e.keyCode > 57)&& e.keyCode!=8){
    alert("숫자만 입력해주세요");
    e.target.value="";
  }

  let value = e.target.value;                 
  value = Number(value.replaceAll(',', ''));
  const formatValue = value.toLocaleString('ko-KR');
  unitPrice.value = formatValue;
})

// 게시글 유효성 검사
const enrollproductForm = document.getElementById("enrollproductForm");

enrollproductForm.addEventListener("submit", (event)=>{

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

  const productTitle = document.querySelector("[name='productTitle']");
  if(productTitle.value.trim().length==0){
    alert("제목을 입력해주세요.");
    productTitle.value="";
    productTitle.focus();
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

  const thumbnail = document.getElementById("img0");
  if(thumbnail.value.length==0){
    alert("대표 이미지를 설정해주세요.");
    thumbnail.value="";
    event.preventDefault();
    return;
  }



  const productContent = document.querySelector("[name='productContent']");
  if(productContent.value.trim().length==0){
    alert("내용을 입력해주세요.");
    productContent.value="";
    productContent.focus();
    event.preventDefault();
    return;
  }

});

