<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

        <%-- 문자열 관련 메서드를 제공하는 JSTL (EL형식) --%>
            <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>FarmFarm | 아이디 찾기 </title>

                    <link rel="stylesheet" href="/resources/css/member/find-style.css">

                </head>

                <body>
                    <div class="find-page">
                        <div class="find-page-img">
                            <a href="/"><img src="/resources/images/mainLogo.png"></a>
                        </div>
                        <main>
                            <div class="form-wrap">
                                <div class="find-title">아이디 찾기</div>
                                <form action="/findId" method="post" id="findFrm">
                                    <section class="find">
                                        <input type="text" name="memberName" id="memberName" placeholder="이름"
                                            autocomplete="off" maxlegnth="50" value="${tempMember.memberName}">
                                    </section>
                                    <section class="find tel phoneCertifyDiv">
                                        <div class="title">전화번호 인증</div>
                                        <input type="text" name="to" id="to" placeholder="전화번호" maxlength="11" autocomplete="off">
                                        <button type="button" id="send" class="number-btn tel-btn1">인증번호 전송</button>
                                        <div id="telMessage" class="coner">-를 제외하고 입력해주세요.</div>
                                    </section>
                                    <section class="find tel" id="phoneCertifyDiv">
                                        <input type="text" name="userNum" id="userNum" placeholder="인증번호 4자리" maxlength="4" autocomplete="off">
                                        <button type="button" id="enterBtn" class="number-btn tel-btn2">인증하기</button>
                                        <div id="telConfirm" class="coner"></div>
                                    </section>
                                    <button class="find-btn">아이디 찾기</button>
                                </form>
                            </div>
                        </main>
                    </div>

                    <script src="/resources/js/member/find.js"></script>
                    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
                    <script>
                        //휴대폰번호 인증번호 보내기 버튼 클릭 이벤트
                        checkObj.userNum = false;
                        $('#send').click(function() {
                            const to = $('#to').val();
                            $.ajax ({
                                url: '/check/sendSMS',
                                type: 'GET',
                                data: {
                                    "to" : to
                                },
                                success: function(data) {
                                    const checkNum = data;
                                    alert('인증번호가 전송되었습니다.');
                                    
                                    $('#enterBtn').click(function() {	
                                        const userNum = $('#userNum').val();
                                        
                                        if(checkNum == userNum) {
                                            alert('인증 성공하였습니다.');
                                            checkObj.userNum = true;
                                        }
                                        else {
                                            alert('인증 실패하였습니다. 다시 입력해주세요.');
                                            userNum.focus();
                                            checkObj.userNum = false;
                                        }
                                    });
                                }
                            });
                        });
                    </script>
                </body>
                </html>