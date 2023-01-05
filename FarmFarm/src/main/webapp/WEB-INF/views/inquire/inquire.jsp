<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link rel="stylesheet" href="/resources/css/inquire/inquire-style.css">


<div class="inquire-container hide-room" id="inquireContainer">
  <div class="inquire-header">
    <span>1:1 상담</span>
    <span id="inquireClose"><i class="fa-solid fa-caret-down"></i></span>
  </div>
  <div class="inquire-content" id="inquireContent">
    <div class="message-date">2023.01.04</div>
    <div class="receive">
      <span>네 고객님</span>
    </div>
    <div class="send">
      <span>저기 혹시요</span>
    </div>
    <div class="send">
      <span>궁금한게 있는데 물어봐도 되나요? 있잖아요 혹시 그게..</span>
    </div>
    <div class="receive">
      <span>무엇이든 궁금하신 점은 편하게 물어봐주세요. 부담갖지 않으셔도 된답니다.</span>
    </div>
    <div class="send">
      <div class="message-time">오후 02:07</div>
      <span>궁금한게 있는데 물어봐도 되나요? 있잖아요 혹시 그게..</span>
    </div>
    <div class="send">
      <div class="img-container">
        <img src="/resources/images/inquire/20221226235906_21028.jpg"></img>
      </div>
    </div>
    <div class="receive">
      <div class="img-container">
        <img src="/resources/images/inquire/20221226235906_21028.jpg"></img>
      </div>
    </div>
  </div>
  <div class="input-area">
    <div class="input-border">
      <label class="file-label">
        <div class="image-upload"><i class="fa-regular fa-image"></i></div>
        <form id="inquireImgForm">
          <input type="file" accept="image/*"  style="display: none;" name="messageImg" id="inquireImage"/>
        </form>
      </label>
      <textarea name="inquireInput" id="inquireInput" cols="30" rows="10" spellcheck="false"></textarea>
    </div>
    <button class="send-btn"id="send"><i class="fa-solid fa-paper-plane"></i></button>
  </div>


</div> 

    <script>

      var memberInquireNo;
    </script>

    <!-- https://github.com/sockjs/sockjs-client -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>


    <script src="/resources/js/inquire/inquire.js"></script>
