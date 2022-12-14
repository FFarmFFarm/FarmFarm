<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<body>
  <!-- 프로필 클릭 시 모달창 출력 -->
  <%-- <c:if test="${board.memberNickname != '관리자' || board.memberNo != 0}"> <!-- 여기 추가했습니다. --> --%>
    <div class="modal" id="memberModal">
      <div class="container" id="modal-text">
          <div class="container-sub">
              <div class="modal-middle">
                <span class="close-x" id="modal-close">&times;</span>
                <section class="profile-area">
                  <div class="profile-image" id="modalImgarea"></div>
                  <h3 class="memberNickname" name="memberNickname" id="memberNickname">닉네임</h3>
                  <section class="member">
                      <div class="signup-date" id="modalSignUpDate">가입일</div>
                  </section>
                </section>
              </div>
  
              <div class="close-wrap" id="modal-close">
                  <button type="button" id="close-btn-wrap">
                      <div class="close-btn" id="reportMemberBtn">
                          신고하기
                      </div>
                  </button>
              </div>
          </div>
      </div>
    </div>
  <%-- </c:if> --%>
</body>