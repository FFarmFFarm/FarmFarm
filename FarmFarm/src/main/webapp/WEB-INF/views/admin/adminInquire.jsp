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
        <title>회원 관리</title>
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
                <div class="container" role="main">

                    <!-- 좌측 사이드바 채팅방 목록 -->
                    <section class="chat-sidebar">
                        <div class="chat-sidebar-header">
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
                        <div class="chat-preview-area">
                        <!-- 채팅방 미리보기 영역 -->
                        </div>

                    </section>

                    <!-- 우측 채팅 내역 -->
                    <section class="chat-room">
                    <div id="roomBodyBlinder">
                        <div id="emptyChat">
                        <div id="emptyChatIcon">
                            <i class="fa-solid fa-message"></i>
                            <!-- <i class="fa-solid fa-cart-shopping"></i> -->
                        </div>
                        <div id="emptyDetail">
                            상담 내역이 없습니다.
                        </div>
                        </div>
                    </div>
                    <div id="roomLabel">
                        <div id="postImg">
                        <!-- <img src="/resources/images/chat/potato.jpg"> -->
                        </div>
                        <div id="postTitle">
                        <!-- 아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
                        아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
                        아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
                        아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 -->
                        </div>
                        <button id="purchaseBtn">
                        구매하기
                        </button>

                        <button id="roomEditBtn">
                        <i class="fa-sharp fa-solid fa-gear"></i>
                        </button>

                        <div id="roomEditDropdown">
                        <ul>
                            <li class="roomEditDropdownMenu">신고하기</li>
                            <li class="roomEditDropdownMenu">나가기</li>
                        </ul>
                        </div>

                        <button id="spreadBtn">
                        <i class="fa-solid fa-caret-down"></i>
                        </button>
                    </div>

                    <!-- end roomLabel -->

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
                        
                        <input id="imageInput" type="file" accept="image/*" hidden>
                        <button id="addImageBtn">
                            <i class="fa-solid fa-image"></i>
                        </button>
                        <input id="inputBox" type="text" placeholder="메세지를 입력하세요">
                        <div id="inputImgPreviewBox">
                            <div id="inputImgPreviewBoxHeader">
                            <span>사진 보내기</span>
                            <i id="inputImgPreviewDelBtn" class="fa-solid fa-xmark"></i>
                            </div>
                            <img id="inputImgPreview"> <!-- 사진 미리보기 들어갑니다! -->
                            <div id="sendImgBtn">사진 전송</div>
                        </div>
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

        </script>

        <!-- https://github.com/sockjs/sockjs-client -->
        <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>


        <!-- jquery -->
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        
   
        <script src="/resources/js/common/common.js"></script>
        <script src="/resources/js/admin/adminInquire.js"></script> 

    </body>
</html>