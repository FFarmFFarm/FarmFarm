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

  
// 상품 설명 이미지 파일명 보기
const productImage = document.getElementsByName("productImage");
const preview = document.getElementsByClassName("preview")[0];
const deleteImg = document.getElementsByClassName("delete-img");

const deleteSet = new Set();

for(let i=0; i<productImage.length; i++){

  productImage[i].addEventListener("change", (e)=>{
    // 파일이 있으면
    if(e.target.files[0] != undefined){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      
      // 읽어오기 성공하면
      reader.onload = e =>{

        if(i==0){
          // 썸네일 이미지일 경우 미리보기
          preview.setAttribute("src", e.target.result);
          preview.nextElementSibling.remove();
        } else{
          // input 다음에 있는 요소 비우고
          productImage[i].nextElementSibling.innerHTML="";
          productImage[i].parentElement.nextElementSibling.innerHTML = "";

          // span태그 만들어서 파일 이름 넣기
          const imgAddress = document.createElement("span");
          imgAddress.classList.add("img-address");
          imgAddress.innerText = productImage[i].files[0].name;
          
          productImage[i].after(imgAddress);

          // 삭제버튼 만들기
          const deleteImgBtn = document.createElement("span");
          deleteImgBtn.classList.add("delete-img");
          deleteImgBtn.innerHTML = "&times;";

          productImage[i].parentElement.after(deleteImgBtn);

          // 만들어진 삭제버튼에 이미지 추가 (이미지x->삽입->삭제시)
          deleteImgBtn.addEventListener("click", () => {
            productImage[i].nextElementSibling.innerHTML="";
  
            const imgAddress = document.createElement("span");
            imgAddress.classList.add("img-address");
            imgAddress.innerText = "선택된 파일 없음";
              
            productImage[i].after(imgAddress);

            productImage[i].parentElement.nextElementSibling.innerHTML = "";
          })
  
          // deleteSet에서 해당 인덱스 삭제
          deleteSet.delete(i);
        }
      }
    }else{
      // 취소 누른 경우
      if(i==0){ // 썸네일
        preview.removeAttribute("src");
        if(preview.nextElementSibling==null){

          const addPhoto = document.createElement("i");
          addPhoto.classList.add("fa-solid", "fa-plus");
    
          preview.after(addPhoto);
        }
      }else{ // 상세 이미지
        productImage[i].nextElementSibling.innerHTML="";
  
        const imgAddress = document.createElement("span");
        imgAddress.classList.add("img-address");
        imgAddress.innerText = "선택된 파일 없음";
          
        productImage[i].after(imgAddress);
      }

    }
  })

  deleteImg[i].addEventListener("click",()=>{

    if(i==0 && preview.getAttribute("src")!=""){
      preview.removeAttribute("src");
      productImage[i].value="";
      deleteSet.add(i);

      const addPhoto = document.createElement("i");
      addPhoto.classList.add("fa-solid", "fa-plus");

      preview.after(addPhoto);

    } else {
      productImage[i].nextElementSibling.innerHTML="";
      productImage[i].value="";
      deleteSet.add(i);

      const imgAddress = document.createElement("span");
      imgAddress.classList.add("img-address");
      imgAddress.innerText = "선택된 파일 없음";
      
      productImage[i].after(imgAddress);

      productImage[i].parentElement.nextElementSibling.innerHTML = "";

    }
  })
};

const productPrice = document.querySelector("[name='productPrice']");

productPrice.addEventListener("focus",()=>{
  productPrice.setAttribute("placeholder", "");
})
productPrice.addEventListener("focusout",()=>{
  productPrice.setAttribute("placeholder", "0");
})

productPrice.addEventListener('keyup', (e)=>{
  if((e.keyCode < 48 || e.keyCode > 57)&& e.keyCode!=8
    && (e.keyCode < 96 || e.keyCode > 105 )){
    alert("숫자만 입력해주세요");
    e.target.value="";
  }

  let value = e.target.value;                 
  value = Number(value.replaceAll(',', ''));
  const formatValue = value.toLocaleString('ko-KR');
  productPrice.value = formatValue;
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

  const productName = document.querySelector("[name='productName']");
  if(productName.value.trim().length==0){
    alert("제목을 입력해주세요.");
    productName.value="";
    productName.focus();
    event.preventDefault();
    return;
  }

  const price= Number(productPrice.value.split(",").join(""));
  productPrice.value = price;

  if(productPrice.value==0){
    alert("판매가격을 입력해주세요.");
    productPrice.value=0;
    productPrice.focus();
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

  const productMessage = document.querySelector("[name='productMessage']");
  if(productMessage.value.trim().length==0){
    alert("내용을 입력해주세요.");
    productMessage.value="";
    productMessage.focus();
    event.preventDefault();
    return;
  }

});

