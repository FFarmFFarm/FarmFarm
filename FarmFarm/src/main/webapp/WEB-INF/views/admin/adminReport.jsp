<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="reportListCount" value="${map.reportListCount}" />
<c:set var="report" value="${map.newReportList}" />
<c:set var="pagination" value="${map.pagination}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전체 신고 내역</title>

    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminReport-style.css" />
    <link rel="stylesheet" href="/resources/css/admin/adminReportDetail-modal-style.css" />

    <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/common/adminHeader.jsp"/> 

    <main>
      <!--nav-->
      <jsp:include page="/WEB-INF/views/admin/adminNav.jsp"/> 
        

        <!-- 오른쪽 -->
        <section class="admin-content-section">
            <div class="page-title" id="pageTitle">
              <p>미처리 신고</p>
            </div>

            <div class="report-total-div">
                <div class="title-div">
                    <span class="report-title">신고 접수 내역</span>
                    <span class="report-title"> 
                      총 ${reportListCount}건
                    </span>
                </div>

                <div class="report-select">
                    <table class="report-list-table">
                        <tr class="report-list-header">
                            <th>신고번호</th>
                            <th class="report-list-type">
                                <span id="typeText">유형</span>
                            </th>

                            <th>신고 대상 아이디/게시글</th>
                            <th>신고 사유</th>
                            <th>신고 일자</i>
                            </th>
                            <th>누적 횟수
                              <i class="fa-solid fa-arrow-up-short-wide caret-icon sortFilter" id="up"></i> <!-- 오름차순 -->
                              <i class="fa-solid fa-arrow-down-wide-short caret-icon sortFilter" id="down"></i> <!-- 내림차순 -->
                              <!-- <i class="fa-solid fa-arrow-up-1-9 caret-icon"></i>
                              <i class="fa-solid fa-arrow-down-9-1 caret-icon"></i> -->
                              <!-- <i class="fa-solid fa-caret-up caret-icon"></i> 오름차순 -->
                              <!-- <i class="fa-solid fa-caret-down caret-icon"></i>  -->
                            </th>
                            <!-- <th>누적 정지
                              <i class="fa-solid fa-arrow-up-short-wide caret-icon"></i>
                              <i class="fa-solid fa-arrow-down-wide-short caret-icon"></i> 
                            </th> -->
                            <th>처리 상태</th>
                        </tr>

                        <tbody>
                         <!-- 한 행 반복 -->
                          <tr class="report-list-row">
                              <td>1</td>
                              <td>일반 회원</td>
                              <td>longideneti12</td>
                              <td>음란물 배포</td>
                              <td>2022-12-10 12:01:05</td>
                              <td>10</td>
                              <td>접수</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <!-- todo: 페이지네이션 반복문 -->
              <div class="admin-pagination-area">
                  <ul class="admin-pagination">
                      <li><a href="">&lt;&lt;</a></li>
                      <li><a href="">&lt;</a></li>
                      <li><a href="">1</a></li>
                      <li><a href="">2</a></li>
                      <li><a href="">3</a></li>
                      <li><a href="">4</a></li>
                      <li><a href="">5</a></li>
                      <li><a href="">6</a></li>
                      <li><a href="">7</a></li>
                      <li><a href="">8</a></li>
                      <li><a href="">9</a></li>
                      <li><a href="">10</a></li>
                      <li><a href="">&gt;</a></li>
                      <li><a href="">&gt;&gt;</a></li>
                  </ul>
              </div>
          </div>
        </section>
    </main>

    <!-- 신고 상세페이지 모달 -->
    <div class="report-detail-container" id="adminModalContainer">
      <div class="report-detail-modal">
        <span class="report-modal-title">신고 상세 정보</span>

        <table class="report-modal-table">
          <tr>
            <td class="detail-bold">신고 번호</td>
            <td>34</td>
            <td class="detail-bold">신고 대상</td>
            <td>USER02</td>
          </tr>
          <tr>
            <td class="detail-bold">유형</td>
            <td>댓글</td>
            <td class="detail-bold">처리 여부</td>
            <td>접수</td>
          </tr>
          <tr>
            <td class="detail-bold">신고 일자</td>
            <td>2022-12-19 15:06:55</td>
            <td class="detail-bold">누적 정지 횟수</td>
            <td>0</td>
          </tr>
          <tr>
            <td class="detail-bold">신고자</td>
            <td>USER01</td>
            <td class="detail-bold">신고 사유</td>
            <td>댓글 도배</td>
          </tr>
          <tr><!-- 공란 --></tr>
          <tr>
            <td class="detail-bold">타이틀</td>
            <td colspan="4">[팜팜자체상품]오늘만이가격최대특가...</td>
          </tr>
          <tr>
            <td class="detail-bold">내용</td>
          </tr>
          <tr>
            <td colspan="4" rowspan="8">
              팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈.    ......
            </td>
          </tr>
        </table>

        <div class="button-div">
          <button id="stopAccountBtn">계정 정지</button>
          <button id="secessionAccountBtn">탈퇴</button>
          <button id="passAccountBtn">반려</button>
        </div>
      </div>
    </div>  



    <%-- jquery --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/admin/adminReport.js"></script> 
    <script src="/resources/js/admin/adminModal.js"></script> 

</body>
</html>