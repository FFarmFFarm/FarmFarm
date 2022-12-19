<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 작성 게시글</title>
    <link rel="stylesheet" href="/resources/css/header.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageBoard-style.css" />
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
          <span class="board-list-title">작성 게시글</span>
          <div class="board-list-header">
            <select name="SortBoard" id="SortBoard">
              <option value="최신순">최신순</option>
              <option value="조회수순">조회수순</option>
            </select>
          </div>
          <div class="list-category">
            <span class="board-no">번호</span>
            <div class="board-thumbnail"></div>
            <span class="board-title">제목</span>
            <span class="board-reg-date">작성일</span>
            <span class="board-read-count">조회수</span>
          </div>
          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail"></div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>

          <div class="board">
            <span class="board-no">12</span>
            <div class="board-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="board-thumbnail-img"
              />
            </div>
            <a href="" class="board-title">게시글 제목 샘플</a>
            <span class="board-reg-date">2022.12.15</span>
            <span class="board-read-count">5</span>
          </div>
          <div class="pagination-area">
            <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="/board/${boardCode}">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.prevPage}">&lt;</a>
              </li>

              <!-- <c:forEach
                var="i"
                begin="${pagination.startPage}"
                end="${pagination.endPage}"
                step="1"
              >
                <c:choose>
                  <c:when test="${i == pagination.currentPage}">
                   현재 보고있는 페이지
                    <li><a class="current">${i}</a></li>
                  </c:when>
  
                  <c:otherwise>
                    <li><a href="/board/${boardCode}?cp=${i}">${i}</a></li>
                  </c:otherwise>
                </c:choose>
              </c:forEach> -->

              <!-- 다음 목록 시작 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.nextPage}">&gt;</a>
              </li>

              <!-- 끝 페이지로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.maxPage}"
                  >&gt;&gt;</a
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
