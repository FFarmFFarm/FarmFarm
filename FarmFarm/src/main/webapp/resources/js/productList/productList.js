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

/* 모든 상품 목록을 가져오는 ajax 함수 */
const getAllProductList = () => {
    $.ajax({
        url: '/product/list/all',
        method: 'GET',
        dataType: 'JSON',
        success : (productMap) => {
            console.log(productMap);
            /* productMap : productList, pagination */
        },
        error : (message) => {
            alert('message');
        }
    })
}