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

// 썸네일 이미지 미리보기
const inputImg = document.getElementsByClassName("productImage");
const preview = document.getElementsByClassName("preview")[0];
const deleteImg = document.getElementsByClassName("delete-img");

const deleteSet = new Set();

for(let i=0; i<inputImg.length; i++){

  // 썸네일 이미지일 경우
  if(i==0){
    inputImg[i].addEventListener("change", (e)=>{
      console.log("되나?");
      if(e.target.files[0] != undefined){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = e =>{
          preview.setAttribute("src", e.target.result);

          deleteSet.delete(i);

          preview.nextElementSibling.remove();
        }
      }else{
        preview.removeAttribute("src");
        if(preview.nextElementSibling==null){
          const addPhoto = document.createElement("i");
          addPhoto.classList.add("fa-solid", "fa-plus");
          preview.after(addPhoto);
        }
      }
    })
  }else{
    

  }


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

const productPrice = document.querySelector("[name='productPrice']");

productPrice.addEventListener('keyup', (e)=>{
  if((e.keyCode < 48 || e.keyCode > 57)&& e.keyCode!=8){
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

  const thumbnail = document.getElementById("img0");
  if(thumbnail.value.length==0){
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

