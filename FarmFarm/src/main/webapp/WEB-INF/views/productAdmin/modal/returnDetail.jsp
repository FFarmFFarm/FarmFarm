<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<section class="return-detail-section hide" id="returnDetail">
  <div class="return-modal">
    <div class="detail-top">
      <button type="button" class="back-btn" id="detailBackBtn">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      반품 상세 정보
    </div>
    <div class="return">
      <div class="return-detail">
        <p class="detail-title">환불정보</p>

        <div class="return-detail-top">
          <div>
            <span class="small-title">반품번호</span>
            <span id="returnDetailNo"></span>
          </div>
          <div>
            <span class="small-title">주문번호</span>
            <span id="orderNo"></span>
          </div>
        </div>


        <table class="return-status-table">
          <tr>
            <th>반품상태</th>
            <td>
              <select name="key" id="returnStatus">
                <option value="0">반품진행중</option>
                <option value="1">반품완료</option>
                <option value="2">반려</option>
              </select>
            </td>
            <th>반품사유</th>
            <td id="returnReason">단순변심</td>
          </tr>
        </table>


        <table class="return-detail-table" id="productDetail">
          <thead>
            <tr class="return-table-head">
                <th>상품번호</th>
                <th>상품명</th>
                <th>판매가</th>
                <th>반품수량</th>
                <th>총액</th>
            </tr>
          </thead>
          <tbody id="returnDetailBody">
          </tbody>
        </table>
  </div>

  <div class="account-detail">
      <p class="detail-title">환불계좌</p>

      <table class="account-detail-table">
          <tr>
              <th>예금주</th>
              <td id="accountName"></td>
              <th>계좌번호</th>
              <td id="accountNo"></td>
          </tr>
      </table>
      </div>
    </div>
  </div>
</section>