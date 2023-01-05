<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="boardList" value="${map.boardList}" />
<c:set var="boardCount" value="${map.boardCount}" />


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 | 비밀번호 변경</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageUpdatePw-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>

      <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>
      
      <section class="list-container">
        <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>
        <div class="board-list">
          <span class="board-list-title">비밀번호 변경</span> ${loginMember.memberPw}
              <form  action="/myPage/updatePw" id="updatePwFrm" class="profile-form" method="post">
                <section class="update">
                  <div class="title">현재 비밀번호</div>
                  <input type="password" name="currentPw" id="currentPw" placeholder="현재 비밀번호" maxlegnth="20">
                </section>

                <section class="update">
                  <div class="title">새 비밀번호</div>
                  <input type="password" name="newPw" id="newPw" placeholder="새 비밀번호" maxlegnth="20">
                  <div class="title">새 비밀번호 확인</div>
                  <input type="password" name="newPwConfirm" id="newPwConfirm" placeholder="새 비밀번호 확인" maxlegnth="20">
                  <div id="pwConfirm" class="coner">영어, 숫자, 특수문자(!,@,#,-,_) 최소 6자 이상 입력해주세요.</div>
                </section>
              <button class="update-btn" id="chPw">변경하기</button>
            </form>
      </section>
      
      </div>
    </main>

    <c:if test="${!empty message}">
      <script>
          alert("${message}");
      </script>

      <c:remove var="message"/>
    </c:if>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>

    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageUpdatePw.js"></script>
    <script src="/resources/js/common/common.js"></script>
  </body>
</html>
