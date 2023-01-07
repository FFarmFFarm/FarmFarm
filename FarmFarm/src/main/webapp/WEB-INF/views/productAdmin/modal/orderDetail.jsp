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
            <span id="orderDetailNo"></span>
          </div>
          <div>
            <span class="small-title">주문일시</span>
            <span id="orderDetailDate"></span>
          </div>
        </div>


        <table class="order-status-table">
          <tr>
            <th>주문상태</th>
            <td>
              <select name="key" id="orderStatus">
                <option value="0">결제완료</option>
                <option value="1">배송중</option>
                <option value="2">취소완료</option>
                <option value="3">구매확정</option>
              </select>
            </td>
            <th>송장번호 입력</th>
            <td>
              <input type="text"
                id="invoiceNo" maxlength="15"
                placeholder="송장번호 입력">
              <div class="invoice-btn">
              </div>
              <%-- <button type="button" id="enrollBtn">입력</button> --%>
            </td>
          </tr>
        </table>


        <table class="order-detail-table" id="productDetail">
          <thead>
            <tr class="order-table-head">
                <th>주문상품</th>
                <th>판매가</th>
                <th>수량</th>
                <th>총액</th>
                <th>배송료</th>
                <th>결제금액</th>
                <th>반품여부</th>
            </tr>
          </thead>
          <tbody id="orderDetailBody">
          
          </tbody>
            <%-- <tr class="order-table-row">
              <td class="order-product">
                <div class="product-img">
                  <img src="" alt="">
                </div>
                <span class="product-name">제너럴킹갓모종삽</span>
              </td>
              <td>8,000</td>
              <td>3</td>
              <td>24,000</td>
              <td>3,000</td>
              <td>27,000<span>원</span></td>
              <td>반품신청</td>
            </tr> --%>
        </table>
  </div>

  <div class="orderer-detail">
      <p class="detail-title">주문자 정보</p>

      <table class="orderer-detail-table">
          <tr>
              <th>수령인</th>
              <td id="memberName"></td>
              <th>전화번호</th>
              <td id="memberTel"></td>
          </tr>
          <tr>
              <th>주소</th>
              <td colspan="3" id="orderAddress"></td>
          </tr>
      </table>
      </div>
    </div>
  </div>
</section>