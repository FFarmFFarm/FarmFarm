<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<section class="order-detail-section hide" id="orderDetail">
  <div class="order-modal">
    <div class="detail-top">
      <button type="button" class="back-btn" id="detailBackBtn">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      주문 상세 정보
    </div>
    <div class="order">
      <div class="order-detail">
        <p class="detail-title">주문정보</p>

        <div class="order-detail-top">
          <div>
            <span class="small-title">주문번호</span>
            <span>20220301-123</span>
          </div>
          <div>
            <span class="small-title">주문일시</span>
            <span>2022-12-13 13:14:15</span>
          </div>
        </div>
        <table class="order-detail-table">
            <tr class="order-table-head">
                <th>주문상품</th>
                <th>판매가</th>
                <th>수량</th>
                <th>총액</th>
                <th>배송료</th>
                <th>결제금액</th>
                <th>주문상태</th>
                <th>송장번호</th>
            </tr>
            <tr class="order-table-row">
              <td class="order-product">
                <div class="product-img">
                  <img src="" alt="">
                </div>
                <span>제너럴킹갓모종삽</span>
              </td>
              <td>8,000</td>
              <td>3</td>
              <td>24,000</td>
              <td>3,000</td>
              <td>27,000<span>원</span></td>
              <td>
                <select name="key" id="orderStatus">
                  <option value="payComplete">결제완료</option>
                  <option value="duringDelivery">배송중</option>
                  <option value="deliveryComplete">배송완료</option>
                  <option value="cancel">주문취소</option>
                </select>
              </td>
              <td>
                <input type="text"
                name="invoiceNo" maxlength="15"
                placeholder="송장번호 입력">
              </td>
            </tr>
        </table>
  </div>

  <div class="orderer-detail">
      <p class="detail-title">주문자 정보</p>

      <table class="orderer-detail-table">
          <tr>
              <th>수령인</th>
              <td>김길자</td>
              <th>전화번호</th>
              <td>010-1234-1234</td>
          </tr>
          <tr>
              <th>주소</th>
              <td colspan="3">서울시 노원구 중계동</td>
          </tr>
      </table>
      </div>
    </div>
  </div>
</section>