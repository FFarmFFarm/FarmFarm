<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<section class="order-detail-section hide" id="orderDetail">
  <div class="order-modal">
    <div class="detail-top">
      <button type="button" class="back-btn" id="detailBackBtn">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      반품 상세 정보
    </div>
    <div class="order">
      <div class="order-detail">
        <p class="detail-title">주문정보</p>

        <div class="order-detail-top">
          <div>
            <span class="small-title">반품번호</span>
            <span id="orderDetailNo"></span>
          </div>
          <div>
            <span class="small-title">주문번호</span>
            <span id="orderDetailDate"></span>
          </div>
        </div>


        <table class="order-status-table">
          <tr>
            <th>반품상태</th>
            <td>
              <select name="key" id="orderStatus">
                <option value="0">반품진행중</option>
                <option value="1">반품완료</option>
                <option value="2">반려</option>
              </select>
            </td>
            <th>반품사유</th>
            <td>단순변심</td>
          </tr>
        </table>


        <table class="order-detail-table" id="productDetail">
          <thead>
            <tr class="order-table-head">
                <th>상품번호</th>
                <th>상품명</th>
                <th>판매가</th>
                <th>반품수량</th>
                <th>총액</th>
            </tr>
          </thead>
          <tbody id="orderDetailBody">
          
          </tbody>
            <tr class="order-table-row">
              <td>3</td>
              <td class="order-product">모종삽</td>
              <td>8,000</td>
              <td>3</td>
              <td>24,000<span>원</span></td>
            </tr>
        </table>
  </div>

  <div class="orderer-detail">
      <p class="detail-title">환불계좌</p>

      <table class="orderer-detail-table">
          <tr>
              <th>예금주</th>
              <td id="memberName"></td>
              <th>계좌번호</th>
              <td id="memberTel"></td>
          </tr>
      </table>
      </div>
    </div>
  </div>
</section>