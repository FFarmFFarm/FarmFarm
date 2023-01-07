<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

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
    <link rel="stylesheet" href="/resources/css/myPage/myPageSeller-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageSecession-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>

      <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <c:if test="${loginMember.authority == 0}">
            <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>
        </c:if>
        <c:if test="${loginMember.authority == 1}">
            <jsp:include page="/WEB-INF/views/myPage/myPageSeller.jsp"/>
        </c:if>
      
      <section class="list-container">
        <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>
        <div class="board-list">
          <span class="board-list-title">회원 탈퇴 안내</span>
              <form  action="/myPage/myPageSecession" id="secessionFrm" class="profile-form" method="post">
                <section class="secession">
                  <div class="title">사용하고 계신 아이디 "${loginMember.memberId}" 는 탈퇴할 경우 재사용 및 복구가 불가능합니다.<br>
                    탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.<br><br>
                    <h3>탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</h3><br>
                    회원정보 및 배송지 등 개인형 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.<br>
                    삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요.<br><br>
                    <h3>탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.</h3><br>
                    판매, 커뮤니티 등에 올린 게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아 있습니다.<br>
                    삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.<br>
                    탈퇴 후에는 회원정보가 삭제되어 본인 여부를 확인할 수 있는 방법이 없어, 게시글을 임의로 삭제해드릴 수 없습니다.<br><br><br>
                    <p>탈퇴 후에는 아이디 "${loginMember.memberId}" 로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다.<br>
                    게시판형 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.<br>
                    또한, 팜팜 아이디를 사용해 다른 서비스에 로그인 할 수 없게 됩니다.<br></p>      
                    
                    </div>
                </section>

                <section class="secession">
                  <div class="secession-wrap">
                    <label>비밀번호: </label>
                    <input type="password" id="memberPw" name="memberPw" maxlength="20">
                  </div>
                </section>

                <section class="agree-wrap agree-wrapper agree">
                  <!-- <i class="fa-solid fa-check check-icon"> -->
                      <input type="checkbox" name="agree" id="agreeInput">
                  <!-- </i> -->
                  <div class="agree-text">안내 사항을 모두 확인하였으며, 이에 동의합니다.(필수)</div>
                </section>
              <button class="secession-btn" id="chPw">탈퇴하기</button>
            </form>
      </section>
      
      </div>
    </main>
    
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script>
      $(document).ready(function () {
        $(".agree-text").click(function () {
            $("#agreeInput").prop("checked", true);
            // checkObj.agreeInput = true;
        });
      });
    </script>
      
      <c:if test="${!empty message}">
      <script>
        alert("${message}");
      </script>

      <c:remove var="message"/>
    </c:if>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <script src="/resources/js/common/common.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageSecession.js"></script>

  </body>
</html>
