<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="/resources/css/order/deliveryInfo-style.css">
  <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
  <title>팜팜 | 배송지변경</title>
</head>
<body>
  <div>
    <div class="address-info">
      <div class="address-header">
        <h2 class="address-title">배송지</h2>
        <div class="column-name">
          <span>선택</span>
          <span>배송 정보</span>
          <span>수정</span>
        </div>
      </div>

      <%-- 배송지 선택 --%>
      <div class="delivery-address-area">

        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>

        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>

        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
        <div class="one-address">
          <div class="check-address">
            <label>
              <i class="fa-solid fa-circle-check" name="checkIcon"></i>
              <input type="checkbox" checked>
            </label>
          </div>
          <div class="address-area">
            <span class="selected-address">기본 배송지</span>
            <p class="address-detail">서울시 노원구 한글비석로 46가길 16</p>
            <div class="member-info">
              <span>정현재</span>
              <span class="bar"></span>
              <span>010-5441-4230</span>
            </div>
          </div>
          <div class="edit-address">
            <button class="fa-regular fa-pen-to-square" name="editBtn"></button>
          </div>
        </div>
      </div>

      <%-- 배송지 추가 --%>
      <div class="add-address">
        <button class="add-btn" type="button" height="60">
          <i class="fa-solid fa-plus"></i>
          <span>새 배송지 추가</span>
        </button>
      </div>
    
    </div>
  
  </div>



</body>
</html>
