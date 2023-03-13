<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 왼쪽 nav -->
<nav class="admin-nav-section">
    <div>
        <img class="admin-profile" src="/resources/images/admin/farmer.png" alt="">
        <span class="admin-profile">팜팜 관리자</span>
    </div>

    <div class="nav-lower">
        <div class="with-icon-div">
            <a href="/admin" class="admin-nav-menu" id="dashboard">
                <i class="fa-solid fa-table-columns"></i>
                팜팜보드
            </a>
        </div>

        <div class="with-icon-div">
            <span class="admin-nav-menu">
                <i class="fa-solid fa-bars-progress"></i>
                팜팜 관리
            </span>
        </div>
        <a href="/admin/member" class="admin-nav-sub">회원 관리</a>
        <a href="/admin/seller" class="admin-nav-sub">판매자 인증 관리</a>
        <a href="/admin/inquiries" class="admin-nav-sub" id="inquireBtn">
            상담 관리

            <i class="fa-solid fa-circle hide" id="newMessage"></i>

        </a>
        
        <div class="with-icon-div">
            <span class="admin-nav-menu">
                <i class="fa-solid fa-chart-line"></i>
                판매 관리
            </span>
        </div>
        
        <a href="/admin/enroll" class="admin-nav-sub">상품 등록</a>
        <a href="/admin/orderList" class="admin-nav-sub">주문 내역 관리</a>
        <a href="/admin/stock" class="admin-nav-sub">상품 관리</a>
        <a href="/admin/return" class="admin-nav-sub">반품 관리</a>
        
        <div class="with-icon-div">
            <span class="admin-nav-menu">
                <i class="fa-solid fa-circle-exclamation"></i>                            
                신고 관리
            </span>
        </div>
        <a href="/admin/report" class="admin-nav-sub">미처리 신고</a>
        <a href="/admin/reportList" class="admin-nav-sub">전체 신고 내역</a>
    </div>
</nav>

