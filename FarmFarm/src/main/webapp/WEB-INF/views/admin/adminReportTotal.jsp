<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전체 신고 내역</title>

    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminReportTotal-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/adminReportDetail-modal-style.css" />

    <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/common/adminHeader.jsp"/> 

    <main>
      <!--nav-->
      <jsp:include page="/WEB-INF/views/admin/adminNav.jsp"/> 
        

        <!-- 오른쪽 -->
        <section class="admin-content-section">

            <div class="report-total-div">
                <div class="title-div">
                    <span class="report-title">전체 신고 관리</span>
                    <span class="report-search"> 
                        <input type="text" name="reportSearch" id="reportSearchInput" placeholder="검색">
                        <button type="button" id="reportSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </span>
                </div>

                <div class="report-select">
                    <table class="report-list-table">
                        <tr>
                            <th>신고번호</th>
                            <th class="report-list-type">
                              <span>유형</span>
                              <i class="fa-solid fa-caret-down caret-icon"></i>
                            </th>
                            <th>타이틀</th>
                            <th>신고 대상 아이디</th>
                            <th>신고 일자
                              <i class="fa-solid fa-sort"></i>
                            </th>
                            <th>처리 일자</th>
                            <th>누적 신고
                              <i class="fa-solid fa-sort"></i>
                            </th>
                            <th>누적 정지
                              <i class="fa-solid fa-sort"></i>
                            </th>
                            <th>처리 상태</th>
                        </tr>

                        <!-- 한 행 반복 -->
                        <tr class="report-list-row">
                            <td>1</td>
                            <td>회원</td>
                            <td>회원 신고</td>
                            <td>longideneti12</td>
                            <td>2022-12-10 12:01:05</td>
                            <td>2022-12-14 23:22:12</td>
                            <td>10</td>
                            <td>0</td>
                            <td>반려</td>
                        </tr>



                        <tr class="report-list-row">
                          <td>2</td>
                          <td>댓글</td>
                          <td>토마토는거꾸로토마토..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>3</td>
                          <td>후기</td>
                          <td>토마토는거꾸로토마토..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>1</td>
                          <td>0</td>
                          <td>정지</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>4</td>
                          <td>후기</td>
                          <td>바나나는반하나..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>5</td>
                          <td>1</td>
                          <td>탈퇴</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>5</td>
                          <td>댓글</td>
                          <td>양상추특가판매1+..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>6</td>
                          <td>게시판</td>
                          <td>[팜팜자체상품]오늘특가..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>7</td>
                          <td>후기</td>
                          <td>[팜팜자체상품]오늘특가..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>8</td>
                          <td>회원</td>
                          <td>회원 신고</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                          <td>9</td>
                          <td>후기</td>
                          <td>고구마는역시밤고구마..</td>
                          <td>longideneti12</td>
                          <td>2022-12-10 12:01:05</td>
                          <td>2022-12-14 23:22:12</td>
                          <td>10</td>
                          <td>0</td>
                          <td>접수</td>
                        </tr>
                        <tr class="report-list-row">
                        <td>10</td>
                        <td>게시판</td>
                        <td>고구마는역시밤고구마..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>11</td>
                        <td>댓글</td>
                        <td>고구마는역시밤고구마..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>12</td>
                        <td>댓글</td>
                        <td>토마토는거꾸로토마토..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>13</td>
                        <td>후기</td>
                        <td>토마토는거꾸로토마토..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>1</td>
                        <td>0</td>
                        <td>정지</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>14</td>
                        <td>후기</td>
                        <td>바나나는반하나..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>5</td>
                        <td>1</td>
                        <td>탈퇴</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>15</td>
                        <td>댓글</td>
                        <td>양상추특가판매1+..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>16</td>
                        <td>게시판</td>
                        <td>[팜팜자체상품]오늘특가..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>17</td>
                        <td>후기</td>
                        <td>[팜팜자체상품]오늘특가..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>18</td>
                        <td>게시판</td>
                        <td>양상추특가판매1+..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>19</td>
                        <td>후기</td>
                        <td>고구마는역시밤고구마..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>20</td>
                        <td>게시판</td>
                        <td>고구마는역시밤고구마..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
                      <tr class="report-list-row">
                        <td>21</td>
                        <td>댓글</td>
                        <td>고구마는역시밤고구마..</td>
                        <td>longideneti12</td>
                        <td>2022-12-10 12:01:05</td>
                        <td>2022-12-14 23:22:12</td>
                        <td>10</td>
                        <td>0</td>
                        <td>접수</td>
                      </tr>
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

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/> 

    <!-- 신고 상세페이지 모달 -->
    <div class="report-detail-container">
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

</body>
</html>