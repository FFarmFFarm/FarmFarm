<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 찜 목록</title>
    <link rel="stylesheet" href="/resources/css/header.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageWish-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>


      <!-- <div class="order-list-header"></div> -->
      <section class="list-container">
        <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>

        <form action="" method="post" class="wish-list">
          <span class="wish-list-title">찜 목록</span>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="wish">
            <div class="wish-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="wish-thumbnail-img"
              />
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">2022.12.17</span>
              <a href="" class="wish-title">판매글 제목 샘플</a>
              <a href="" class="wish-price"><span> 15,000</span>원</a>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
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
        </form>
      </section>
    </main>
  </body>
</html>
