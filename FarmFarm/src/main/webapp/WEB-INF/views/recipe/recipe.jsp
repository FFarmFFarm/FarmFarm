<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 레시피</title>
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/resources/css/recipe/recipe-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
</head>
<body>
    
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

        <c:if test="${not empty param.query}">
            <c:set var="sURL" value="&query=${param.query}"/>
        </c:if>
        <c:if test="${not empty param.sort}">
            <c:set var="soURL" value="&sort=${param.sort}"/>
        </c:if>

    <main>
        ${api.food_Image_Address}
        <section class="board-top">
            <div class="board-top-title">팜팜 레시피</div>
        </section>
        <!-- <form action="/recipe" class="board-search">
            <section class="board-search-area">
                <input type="text" name="query" id="inputQuery" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </section>

        </form> -->
        <section class="board-list">
            <div class="board-list-top">
                <div class="board-List-title">
                    <span class="board-no">No.</span>
                    <span class="board-img">이미지</span>
                    <span class="board-title">요리 이름</span>
                    <span class="board-writer">레시피</span>
                </div>
                
                <ul class="board-list-area">
                    <c:forEach var="api" items="${apiList}">
                        <li>
                            <span class="board-no">${api.no}</span>
                            <c:if test="${!empty api.food_Image_Address}">
                                <span class="board-img"><img src="${api.food_Image_Address}" class="thumbImg"></span>
                            </c:if>
                            <c:if test="${empty api.food_Image_Address}">
                                <span class="board-img"><img src="/resources/images/logo-square.png" class="thumbImg"></span>
                            </c:if>
                            <span class="board-title">
                                ${api.fd_Nm}
                            </span>
                            <!-- <c:if test="${!empty api.ckry_Sumry_Info}">
                                <span class="board-writer">${api.ckry_Sumry_Info}</span>
                            </c:if>
                            <c:if test="${empty api.ckry_Sumry_Info}">
                                <span class="board-writer">"추후 업데이트 예정입니다."</span>
                            </c:if> -->
                            <span class="board-writer">${api.ckry_Sumry_Info}</span>
                        </li>
                    </c:forEach>
                </ul>

                <div class="board-write-bottom">
                    <ul class="board-pagination">
                    
                        <!-- 첫 페이지로 이동 -->    <!-- 검색 안하면 그냥 빈칸으로 나옴 -->
                        <li id="1" class="pageLi"><a href="/recipe/?cp=1${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li id="${pagination.prevPage}" class="pageLi"><a href="/recipe/?cp=${pagination.prevPage}${sURL}"></a>&lt;</a></li>
                                                    <!-- qusert string 형식으로 적어야된데 -->

                        <c:forEach var="i" begin="${pagination.startPage}" 
                            end="${pagination.endPage}" step="1">

                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 페이지인 경우 --%>
                                    <li id="${i}" class="pageLi"><a class="current">${i}</a></li>
                                </c:when>

                                <c:otherwise>
                                    <!-- 현재 페이지를 제외한 나머지 -->
                                    <li id="${i}" class="pageLi"><a href="/recipe/?cp=${i}${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>

                        </c:forEach>
                        
                        <!-- 특정 페이지로 이동 -->
                        
                        <!-- 다음 목록 시작 번호로 이동 -->
                        <li id="${pagination.nextPage}" class="pageLi"><a href="/recipe/?cp=${pagination.nextPage}${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li id="${pagination.maxPage}" class="pageLi"><a href="/recipe/?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>

                    </ul>
                </div>
            </div>
        </section>
    </main>
    <script src="/resources/js/board/boardList.js"> </script>
    <script src="/resources/js/common/common.js"> </script>

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
