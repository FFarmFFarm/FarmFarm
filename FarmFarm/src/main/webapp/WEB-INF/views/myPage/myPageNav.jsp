<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


        <section class="mypage-nav">
          <span class="mypage-nav-title">마이팜팜</span>

            <c:if test="${loginMember.authority == 0}">
                <a href="/myPage" class="ordered">
                  <span>주문 내역</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/review" class="review-wrote">
                  <span>작성 후기</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/board" class="board-wrote">
                  <span> 작성 게시글</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/comment" class="comment-wrote">
                  <span>작성 댓글</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/wishList" class="wish">
                  <span>찜 목록</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/notify" class="alert">
                  <span>알림센터</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/profile" class="setting">
                  <span>개인 정보 수정</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/updatePw" class="update-pw">
                  <span>비밀번호 변경</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/secession" class="secession">
                  <span>회원 탈퇴</span><i class="fa-solid fa-chevron-right"></i
                ></a>
            </c:if>
            <c:if test="${loginMember.authority == 1}">
                <a href="/myPage/profile" class="setting">
                  <span>개인 정보 수정</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/updatePw" class="update-pw">
                  <span>비밀번호 변경</span><i class="fa-solid fa-chevron-right"></i
                ></a>
                <a href="/myPage/secession" class="secession">
                  <span>회원 탈퇴</span><i class="fa-solid fa-chevron-right"></i
                ></a>
            </c:if>
        </section>