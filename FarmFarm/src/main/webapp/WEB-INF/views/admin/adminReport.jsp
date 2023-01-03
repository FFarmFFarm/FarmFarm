<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="reportListCount" value="${map.reportListCount}" />
<c:set var="newReportList" value="${map.newReportList}" />
<c:set var="pagination" value="${map.pagination}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>미처리 신고 내역</title>

    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminReport-style.css" />
    <link rel="stylesheet" href="/resources/css/admin/adminReportDetail-modal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

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
                    <span class="report-title" id="reportCount">총 ${reportListCount}건</span>
                </div>

                <div class="report-select">
                    <table class="report-list-table">
                        <tr class="report-list-header">
                            <th>NO</th>
                            <th>신고번호</th>
                            <th class="report-list-type" id="thTypeFilter">
                              <span id="dropBtn">
                                <span id="dropBtnText">유형</span>
                                <!-- <i class="fa-solid fa-caret-down filter-icon"></i> -->
                              </span>
                              <div class="drop-menu" id="dropMenu">
                                <ul class="drop-ul" id="dropUl">
                                    <li class="typeFilter" id="t0">전체</li>
                                    <li class="typeFilter" id="t1">일반 회원</li>
                                    <li class="typeFilter" id="t2">판매자</li>
                                    <li class="typeFilter" id="t3">판매 게시글</li>
                                    <li class="typeFilter" id="t4">커뮤니티 게시글</li>
                                    <li class="typeFilter" id="t5">커뮤니티 댓글</li>
                                </ul>
                              </div>
                            </th>

                            <th>신고 대상 아이디/게시글</th>
                            <th>신고 사유</th>
                            <th>신고 일자</th>
                            <!-- <th>처리 일자</th> -->
                            <th>누적 횟수
                              <i class="fa-solid fa-arrow-up-short-wide caret-icon sortFilter" id="down"></i> <!-- 오름차순 -->
                              <i class="fa-solid fa-arrow-down-wide-short caret-icon sortFilter" id="up"></i> <!-- 내림차순 -->
                            </th>
                            <!-- <th>누적 정지
                              <i class="fa-solid fa-arrow-up-short-wide caret-icon"></i>
                              <i class="fa-solid fa-arrow-down-wide-short caret-icon"></i> 
                            </th> -->
                            <th>처리 상태</th>
                        </tr>

                        <tbody id="tbody">
                         <!--todo: 한 행 반복 / ajax생성 -->
                          <c:forEach var="report" items="${newReportList}">
                            <c:set var="i" value="${i+1}" />
                            <tr class="report-list-row">
                              <th class="report-seq">${i}</th>
                              <td>${report.reportNo}</td>

                              <c:if test="${not empty report.reportType}">
                                <c:if test="${report.reportType eq 'M' && report.authority == 0}">
                                  <td>일반 회원</td>
                                </c:if>
                                <c:if test="${report.reportType eq 'M' && report.authority == 1}">
                                    <td>판매자</td>
                                </c:if>
                                <c:if test="${report.reportType eq 'P'}">
                                   <td>판매 게시글</td>
                                </c:if>
                                <c:if test="${report.reportType eq 'B'}">
                                   <td>커뮤니티 게시글</td>
                                </c:if>
                                <c:if test="${report.reportType eq 'C'}">
                                   <td>커뮤니티 댓글</td>
                                </c:if>
                              </c:if>

                              <!-- 신고 아이디, 게시글 -->
                              <c:if test="${not empty report.reportType}">
                                <c:if test="${report.reportType eq 'M'}">
                                  <td>${report.memberId}</td>
                                </c:if>
                                <c:if test="${report.reportType eq 'B' || report.reportType eq 'P'}">
                                  <td class="rTitle">${report.title}</td>
                                </c:if>
                              </c:if>

                              <td>${report.reportReason}</td>
                              <td>${report.reportDate}</td>
                              <td>${report.reportVolume}</td>
                              
                              <c:if test="${report.reportPenalty eq 'N' || empty report.reportPenalty}">
                                <td>접수</td>
                              </c:if>

                              <input type="hidden" class="hidden-reportNo" name="hiddenReportNo" value="${report.reportNo}">
                              <input type="hidden" class="hidden-memberNo" name="hiddenNo" value="${report.memberNo}">
                          </tr>
                        </c:forEach>
                      </tbody>
                  </table>
              </div>

              <!-- todo: 페이지네이션 반복문 -->
              <div class="admin-pagination-area" id="adminPaginationArea">
                <ul class="admin-pagination">
                    <li id="1" class="page-box">
                        <i class="fa-solid fa-angles-left"></i>
                    </li>
                    <li id="${pagination.prevPage}" class="page-box">
                        <i class="fa-solid fa-angle-left"></i>
                    </li>

                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                        <c:choose>
                            <c:when test="${i == pagination.currentPage}">
                                <li class="current-page-box">
                                    ${i}
                                </li>
                            </c:when>
                            <c:otherwise>
                                <li id="${i}" class="page-box">
                                    ${i}
                                </li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                  
                    <li id="${pagination.nextPage}" class="page-box">
                        <i class="fa-solid fa-angle-right"></i>
                    </li>
                    <li id="${pagination.endPage}" class="page-box">
                        <i class="fa-solid fa-angles-right"></i>
                    </li> 
                </ul>
            </div>
          </div>
        </section>
    </main>

    <!-- todo: 신고 상세페이지 모달 -->
    <div class="report-detail-container" id="reportDetailContainer">
      <div class="report-detail-modal">
        <span class="report-modal-title">신고 상세 정보</span>

        <table class="report-modal-table">
          <tbody id="tbodyDetail">
            <!-- <tr>
              <td class="detail-bold left">신고 번호</td>
              <td class="left-content">34</td>
              <td class="detail-bold right">처리 상태</td>
              <td>접수</td>
            </tr>
            <tr>
              <td class="detail-bold left">유형</td>
              <td class="left-content">댓글</td>
              <td class="detail-bold right">누적 신고 횟수</td>
              <td>10</td>
            </tr>
            <tr>
              <td class="detail-bold left">신고 일자</td>
              <td class="left-content">2022-12-19 15:06:55</td>
            </tr>
            <tr>
              <td class="detail-bold left">신고 대상(아이디/게시글)</td>
              <td colspan="4">[팜팜자체상품]오늘만이가격최대특가...</td>
            </tr>
            <tr></tr>
            <tr>
              <td class="detail-bold left">신고 사유</td>
              <td>댓글 도배</td>
            </tr>
            <tr>
              <td class="detail-bold left">내용</td>
            </tr>
            <tr>
              <td colspan="4" rowspan="8">
                팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈. 팜팜보다 폼폼이 더 쌈.    ......
              </td>
            </tr> -->
          </tbody>
        </table>

        <div class="button-div">
          <!-- 회원, 판매자 -->
          <button id="accountLeaveBtn">반려</button>
          <button id="accountBannedBtn">계정 정지</button>
          <button id="accountKickOutBtn">강제 탈퇴</button>

           <!-- 게시글, 판매글, 댓글 -->
          <button id="contentLeaveBtn">반려</button>
          <button id="contentDeleteBtn">삭제</button>
        </div>
      </div>
    </div>  

    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/> 

    <script>
      // var typeFilter = 0;
      var sortFilter = 'default';
      var cp = 1;
    </script>

    <%-- jquery --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/admin/adminReport.js"></script> 
    <script src="/resources/js/admin/adminModal.js"></script> 
    <script src="/resources/js/common/common.js"></script> 

</body>
</html>