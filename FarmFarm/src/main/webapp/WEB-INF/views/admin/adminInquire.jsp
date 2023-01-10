<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="memberList" value="${map.memberList}" />
<c:set var="memberListCount" value="${map.memberListCount}" />

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>상담 관리</title>
        <link rel="stylesheet" href="/resources/css/common/header-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminInquire-style.css" />
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
                    <p>상담 관리</p>
                </div>
                <!-- 본문 영역 -->
                <div class="inquire-container" role="main">

                    <!-- 좌측 사이드바 채팅방 목록 -->
                    <section class="message-sidebar">
                        <div class="message-sidebar-header">
                        <div class="search-area">
                            <input id="searchBar" placeholder="채팅방 검색">
                            <button id="resetRoomSearch">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </button>
                            <button id="searchBtn">
                                검색
                            </button>
                        </div>
                        </div>
                        <div class="message-preview-area" id="roomList">
                        <!-- 채팅방 미리보기 영역 -->
                            <c:if test="${! empty inquireList}">
                            <c:forEach var="inquire" items="${inquireList}">
                            <c:if test="${inquire.messageCount > 1}">


                            <div class="message-preview-box" id="${inquire.inquireNo}">
                                <div class="profile-img">
                                <c:if test="${empty inquire.profileImg}">
                                    <img src="/resources/images/chatting/farmer.png">
                                </c:if>
                                <c:if test="${!empty inquire.profileImg}">
                                    <img src="${inquire.profileImg}">
                                </c:if>
                                </div>
                                <div class="message-box-label">
                                    <div class="message-info">
                                        <div class="member-nickname">
                                        ${inquire.memberNickname}
                                        </div>
                                        <div class="last-message-time">
                                        ${inquire.lastSendTime}
                                        </div>
                                        <c:if test="${inquire.unreadCount == 0}">
                                        <div class="unread-message-count hide" >
                                            ${inquire.unreadCount}
                                        </div>
                                        </c:if>
                                        <c:if test="${inquire.unreadCount > 0}">
                                        <div class="unread-message-count">
                                            ${inquire.unreadCount}
                                        </div>
                                        </c:if>
                                    </div>
                                    <c:if test="${inquire.lastSendImgFl == 'N'}">
                                    <div class="last-message-content">
                                        ${inquire.lastMessage}
                                    </div>
                                    </c:if>
                                    <c:if test="${inquire.lastSendImgFl == 'Y'}">
                                    <div class="last-message-content">
                                        사진
                                    </div>
                                    </c:if>
                                </div>
                            </div>


                            </c:if>
                            </c:forEach>
                            </c:if>


                        </div>

                    </section>

                    <!-- 우측 채팅 내역 -->
                    <section class="inquire-room">
                    <div id="roomBodyBlinder">
                        <div id="emptyChat">
                        <div id="emptyChatIcon">
                            <i class="fa-solid fa-message"></i>
                            <!-- <i class="fa-solid fa-cart-shopping"></i> -->
                        </div>
                        <div id="emptyDetail">
                        </div>
                        </div>
                    </div>
                    
                    <!-- 채팅창 메인 -->
                    <div id="roomBody">

                        <!-- 채팅방 메세지 예시 -->
                        <div id="readingArea">

                        <!-- 송신/수신한 메세지가 들어갈 영역입니다 -->
                        <!-- 받은 메세지 received-chat -->
                        <!-- chat-profile-img2, received-bubble. received-bubble-tail -->

                        <!-- 보낸 메세지 sent-chat -->
                        <!-- sent-bubble, sent-bubble-tail -->
                        
                        <!-- 메세지가 없는 경우 -->
            
                        </div>

                        
                        
                        
                        <!-- 메세지 입력 영역 -->
                        <div id="writingArea">
                        
                        <label id="addImageBtn">
                            <i class="fa-solid fa-image"></i>
                            <form id="inquireImgForm">
                            <input id="imageInput" type="file" accept="image/*" name="messageImg" hidden>
                            </form>
                        </label>
                        <input id="inputBox" type="text" placeholder="메세지를 입력하세요">
                        <button id="sendBtn">
                        <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    </div>
                    <!-- 하단 이동 -->
                    <div id="bottomBtn">
                    <i class="fa-solid fa-caret-down"></i>
                    </div>


                    </section>
                </div>
            </section>
        </main>


            
        <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/> 

        <script>
            var loginMemberNo = "${loginMember.memberNo}"
            var memberInquireNo;
        </script>

        <!-- https://github.com/sockjs/sockjs-client -->
        <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>


        <!-- jquery -->
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        

        <script src="/resources/js/common/common.js"></script>
        <script src="/resources/js/admin/adminInquire.js"></script> 

    </body>
</html>