/* 팜팜마켓 상품 js */

/* <div class="product-box">
    <div class="product-content">
        <img src="/src/main/webapp/resources/images/productList/carrot.jpg">
    </div>
    <div class="product-detail">
        <div class="product-name">
            토마토는 거꾸로해도 토마토
        </div>
        <div class="product-price">
            3,000 원
        </div>
        <div class="product-message">
            토마토는 맛있어요
        </div>
    </div>
</div> */

/* ajax */
/* 카테고리는 페이지 이동 때 session에 올려서 가져올 예정 */

window.addEventListener("load", ()=>{
    getAllProductList();
})

/* 모든 상품 목록을 가져오는 ajax 함수 */
const getAllProductList = () => {
    $.ajax({
        url: '/product/list/all',
        method: 'GET',
        dataType: 'JSON',
        success : (productMap) => {

            if(productMap.length == 0) {
                console.log('없는데요?')
            } else {
                console.log(productMap);
                for(let product of productMap) {
                    // listAreaBody 선택
                    const listAreaBody = document.querySelector('.list-area-body');
        
                    // 필요한 div 생성
                    const productBox = document.createElement("a");
                    productBox.classList.add("product-box");
                    console.log(product.productNo);
                    productBox.setAttribute("href", "/product/" + product.productNo)
                    // 이미지
                    const productContent = document.createElement("div");
                    productContent.classList.add("product-content");
                    // productContent.innerHTML = '<img src="/src/main/webapp/resources/images/productList/carrot.jpg">'
                    productContent.innerHTML = '<img src="' + 
                                            product.thumbnailImg
                                             + '">'

                    // 내용
                    const productDetail = document.createElement("div");
                    productDetail.classList.add("product-detail");
                    
                    // 내용 - 판매글 제목
                    const productName = document.createElement("div");
                    productName.classList.add("product-name");
                    productName.innerText = product.productName;

                    // 내용 - 가격
                    const productPrice = document.createElement("div");
                    productPrice.classList.add("product-price");
                    productPrice.innerText = product.productPrice;
                    
                    // 내용 - 한줄 소개
                    const productMessage = document.createElement("div");
                    productMessage.classList.add("product-message");
                    productMessage.innerText = product.productMessage;
        
                    // detail 포장하기
                    productDetail.append(productName, productPrice, productMessage);
        
                    // box 포장하기
                    productBox.append(productContent, productDetail);
        
                    // listAreaBody에 추가
                    listAreaBody.append(productBox);
                }

            }


        },
        error : (message) => {
            alert('message');
        }
    })
}