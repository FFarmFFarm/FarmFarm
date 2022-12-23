<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>회원 관리</title>
        <link rel="stylesheet" href="/resources/css/common/header-style.css">
        <link rel="stylesheet" href="/resources/css/common/footer-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminMember-style.css" />

        <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

    </head>
    <body>
      <jsp:include page="/WEB-INF/views/common/adminHeader.jsp"/>  

        <main>
          <!--nav-->
          <jsp:include page="/WEB-INF/views/admin/adminNav.jsp"/> 
            

            <!-- 오른쪽 -->
            <section class="admin-content-section">
              <div class="upper-board">
                <div class="title-div">
                    <span class="member-select-title">회원 조회</span>
                    <span class="member-search"> 
                        <input type="text" name="memberSearch" id="memberSearchInput" placeholder="검색">
                        <button type="button" id="memberSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </span>
                </div>

                <div class="member-select">
                    <table class="member-select-table">
                        <tr>
                            <th>NO</th>
                            <th>회원번호</th>
                            <th>아이디</th>
                            <th>사용자 이름</th>
                            <th>주소</th>
                            <th>가입일</th>
                            <th id="sellerAuth">판매자 등록
                              <i class="fa-solid fa-caret-down caret-icon" class="select-filter"></i>
                            </th>
                            <th id="memberStatus">상태
                              <i class="fa-solid fa-caret-down caret-icon" class="select-filter"></i>
                            </th>
                        </tr>

                        <!-- 한 행 반복 -->
                        <tr class="member-select-row">
                            <td>1</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>


                        <tr class="member-select-row">
                            <td>2</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>정지</td>
                        </tr>

                        <tr class="member-select-row">
                            <td>3</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>정지</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>4</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>5</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>6</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>7</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>정지</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>8</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>9</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>10</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>11</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>정지</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>12</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>13</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>14</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>정지</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>15</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>16</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>17</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>18</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>19</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>
                        <tr class="member-select-row">
                            <td>20</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>

                        <tr class="member-select-row">
                            <td>21</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>미등록</td>
                            <td>활동중</td>
                        </tr>

                        <tr class="member-select-row">
                            <td>22</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>서울 강동구</td>
                            <td>2022-12-14</td>
                            <td>2022-12-14</td>
                            <td>활동중</td>
                        </tr>
                        
                    </table>
                </div>

                <!-- todo: 페이지네이션 반복문 -->
                <div class="admin-pagination-area">
                    <ul class="admin-pagination">
                        <!-- <li><a href="">&lt;&lt;</a></li>
                        <li><a href="">&lt;</a></li> -->
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
                        <!-- <li><a href="">&gt;</a></li>
                        <li><a href="">&gt;&gt;</a></li> -->
                    </ul>
                </div>
            </div>

              <div class="middle-board">
                  <div class="middle-detail">
                      <span class="member-detail-title line">회원 상세 정보</span>
                      <span class="member-detail">
                          <!-- todo: el쓰는부분 ajax로 -->
                          <table class="member-detail-table">
                              <tr>
                                  <td rowspan="6" class="detail-profileImg">
                                    <img src="/resources/images/member/user.png" alt="">
                                  </td>
                                  <td class="detail-bold" width="90px">회원번호</td>
                                  <td width="120px">12345</td>
                                  <td class="detail-bold" width="90px">연락처</td>
                                  <td width="175px">010-1234-7894</td>
                              </tr>
                              <tr>
                                  <td class="detail-bold">아이디</td>
                                  <td>USER01</td>
                                  <td class="detail-bold">생년월일</td>
                                  <td>1900-01-01</td>
                              </tr>
                              <tr>
                                  <td class="detail-bold">성명</td>
                                  <td>이은지</td>
                                  <td class="detail-bold">판매자 인증</td>
                                  <td>2022-12-19</td>
                              </tr>
                              <tr>
                                  <td class="detail-bold">닉네임</td>
                                  <td>은지농장</td>
                                  <td class="detail-bold">상태</td>
                                  <td class="status-bold">활동중/계정정지/신고접수중?</td>
                              </tr>
                              <tr>
                                  <td class="detail-bold">가입일</td>
                                  <td>2022-12-14</td>
                                  <td class="detail-bold">사유</td>
                                  <td>있으면 나오고 없으면 안 나오고</td>
                              </tr>
                              <tr>
                                  <td class="detail-bold">주소</td>
                                  <td colspan="3">서울 중구 남대문로 120 무슨빌딩 2층 kh정보교육원</td>
                              </tr>
                          </table>
                      </span>

                      <span class="member-history-title line">계정 상태</span>
                      <span class="member-history">
                          <table class="member-history-table">
                              <tr class="member-history-row">
                                  <th width="100px">일자</th>
                                  <th width="100px">상태</th>
                                  <th width="150px">사유</th>
                              </tr>

                              <tr>
                                  <td>2022-12-14</td>
                                  <td>가입</td>
                                  <td></td>
                              </tr>
                              <tr>
                                  <td>2022-12-14</td>
                                  <td>계정 정지</td>
                                  <td>불법 사기 계좌 운용</td>
                              </tr>
                              <tr>
                                  <td>2022-12-14</td>
                                  <td>탈퇴</td>
                                  <td>음란물 배포, 댓글 도배</td>
                              </tr>

                          </table>
                      </span>
                    
                    <button id="secessionBtn">강제 탈퇴</button>

                </div>   
              </div>
            </section>
        </main>

      <!-- <jsp:include page="/WEB-INF/views/common/footer.jsp"/>  -->

    </body>
</html>