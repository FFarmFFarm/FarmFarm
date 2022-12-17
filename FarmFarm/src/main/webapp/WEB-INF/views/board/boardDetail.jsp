<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>와글와글 게시글 보기</title>
    <link rel="stylesheet" href="/css/board/boardDetail.css">
    <link rel="stylesheet" href="/css/header.css">
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
</head>
<body>
    <%-- 헤더 jsp 만들어지면 include하기 --%>
    

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 물물교환</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <span>물물교환</span>
                <span>팁</span>
                <span>질문</span>
            </div>
        </section>
        <section class="board-title-content">
            <div class="board-title-area">
                <div class="writer-img">사진들어갈거</div>
                <div class="writer-ect">
                    <div class="writer-name">못생겼지만 맛있습니다</div>
                    <div class="writer-date-view">2022.12.15.  5분전  조회 2</div>
                </div>
                <div class="board-title">
                    못생겼지만 맛있는 호박고구마 교환원해요
                </div>
            </div>
            <div class="board-content-area">
                <div class="board-content">
                    <pre>
채소교환 하고 싶어요
저희 집 못난이 호박이랑 예쁜 자색 옷을 입고 있는 자색고구마랑 바꿔요
너무 못생겨서 먹기 싫어요
                    </pre>
                </div>
                <div class="board-img-area">

                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                </div>
            </div>
        </section>
        <section class="board-like-report">
            <div class="board-like"><i class="fa-solid fa-heart"></i> &nbsp; 좋아요</div>
            <div class="board-report">신고</div>
        </section>
        <!-- <section class="board-like-report">
            <span>수정하기</span>
            <span>삭제하기</span>
        </section> -->
        <section class="comment-area">
            <div class="comment-all">
                <div class="comment-writer">
                    <div class="writer-profile">사진</div>
                    <div class="writer-name-time">
                        <div class="writer-name">옆집판매자</div>
                        <div class="writer-time">5분전</div>
                    </div>
                    <div class="comment-like-report">
                        <span class="comment-like"><i class="fa-solid fa-heart"></i> &nbsp;좋아요</span>
                        <span class="comment-report">신고</span>
                    </div>
                </div>
                <div class="comment-content">진짜 호박 맛없게 보이네요
                    저런 호박은 도대체 어떻게 하면 키울 수 있는건가요
                    정말 못생겼다 그냥 버리세요
                </div>
            </div>
        </section>
    </main>
    
</body>
</html>