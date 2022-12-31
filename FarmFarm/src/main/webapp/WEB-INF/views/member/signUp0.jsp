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
                    <title>FarmFarm | 회원가입 </title>

                    <link rel="stylesheet" href="/resources/css/member/signup-style.css">

                </head>

                <body>
                    <div class="signup-page">
                        <div class="signup-page-img">
                            <a href="/"><img src="/resources/images/mainLogo.png"></a>
                        </div>
                        <main>
                            <div class="form-wrap">
                                <div class="signup-title">회원가입</div>
                                <div class="signup-subtitle">-구매자-</div>
                                <form action="/signUp0" method="post" id="signUpFrm">
                                    <section class="signup">
                                        <input type="text" name="memberId" id="memberId" placeholder="아이디"
                                            autocomplete="off" maxlegnth="50" value="${tempMember.memberId}">
                                        <div id="IdConfirm" class="coner">영어, 숫자, 특수문자(-,_) 6~20글자 사이로 입력해주세요.</div>
                                    </section>
                                    <section class="signup">
                                        <input type="password" name="memberPw" id="memberPw" placeholder="비밀번호"
                                            maxlegnth="20">
                                        <input type="password" name="memberPwConfirm" id="memberPwConfirm"
                                            placeholder="비밀번호 확인" maxlegnth="20">
                                        <div id="pwConfirm" class="coner">영어, 숫자, 특수문자(!,@,#,-,_) 최소 6자 이상 입력해주세요.
                                        </div>
                                    </section>
                                    <section class="signup">
                                        <input type="text" name="memberName" id="memberName" placeholder="이름"
                                            maxlegnth="10">
                                        <div id="nameConfirm" class="coner">한글, 영어 2~10자리 입력해주세요.</div>
                                    </section>
                                    <section class="signup">
                                        <input type="text" name="memberNickname" id="memberNickname" placeholder="닉네임"
                                            maxlegnth="10" value="${tempMember.memberNickname}">
                                        <div id="nicknameConfirm" class="coner">한글, 영어, 숫자 2~10자리 입력해주세요.</div>
                                    </section>
                                    <section class="signup">
                                        <div class="title">생년월일</div>
                                        <input type="date" name="memberBirth" id="memberBirth">
                                        <div id="birthConfirm" class="coner"></div>
                                    </section>

                                    <%-- a,,b,,c --%>
                                        <%-- 주소 문자열 -> 배열로 쪼개기 --%>
                                            <c:set var="addr" value="${fn:split(tempMember.memberAddress,',,')}" />
                                            <%-- 변수 선언 --%>

                                                <section class="signup">
                                                    <div class="title">주소</div>
                                                    <div class="find-address">
                                                        <input type="text" name="memberAddress" id="sample6_postcode"
                                                            placeholder="우편번호" maxlength="6" value="${addr[0]}">
                                                        <button type="button" class="find-btn address-btn address-btn1"
                                                            onclick="sample6_execDaumPostcode()">주소찾기</button>
                                                    </div>
                                                    <div>
                                                        <input type="text" name="memberAddress" id="sample6_address"
                                                            placeholder="도로명/지번 주소" value="${addr[1]}">
                                                    </div>
                                                    <div>
                                                        <input type="text" name="memberAddress"
                                                            id="sample6_detailAddress" placeholder="상세 주소"
                                                            value="${addr[2]}">
                                                    </div>
                                                </section>
                                                <section class="signup tel phoneCertifyDiv">
                                                    <div class="title">전화번호 인증</div>
                                                    <input type="text" name="to" id="to" placeholder="전화번호" maxlength="11" autocomplete="off">
                                                    <button type="button" id="send" class="find-btn tel-btn1">인증번호 전송</button>
                                                    <div id="telMessage" class="coner">-를 제외하고 입력해주세요.</div>
                                                </section>
                                                <section class="signup tel" id="phoneCertifyDiv">
                                                    <input type="text" name="userNum" id="userNum" placeholder="인증번호 4자리" maxlength="4" autocomplete="off">
                                                    <button type="button" id="enterBtn" class="find-btn tel-btn2">인증하기</button>
                                                    <div id="telConfirm" class="coner"></div>
                                                </section>
                                                <section class="agree-wrap agree">
                                                    <i class="fa-solid fa-check check-icon">
                                                        <input type="checkbox" name="agree" id="agreeInput">
                                                    </i>
                                                    <div class="agree-text agree-text1">개인 정보 수집 및 이용동의(필수)</div>
                                                </section>
                                                <button class="signup-btn">회원가입</button>
                                </form>
                            </div>
                        </main>
                        <!-- 동의 약관 클릭 시 모달창 출력 -->
                        <div class="modal">
                            <div class="container" id="modal-text">
                                <div class="container-sub">
                                    <div class="modal-middle">
                                        <h2 class="h2">개인정보 수집 및 이용 동의</h2>
                                        팜팜주식회사(이하 ‘회사’라 함)는 회원의 개인정보를 ‘개인정보보호법’ 등 관계 법령에 의거하여 안전하게 관리 및 보호하고 있습니다.<br>

                                        회사의 팜팜 커머스 ID 서비스(이하 ‘서비스’라 함)에서는 개인정보의 수집 및 이용 등 처리에 있어서 아래의 사항을 정보주체에게
                                        안내하고 동의를 받습니다. 정보주체에게는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 아래 개인정보 수집 관련 사항은 서비스 제공을
                                        위한 최소한의 개인정보 수집으로서 본 동의를 거부하실 경우, 서비스 이용이 불가능합니다.<br><br>
                                        1. 수집하는 개인정보 항목<br>
                                        팜팜 커머스 ID 회원가입 시점에 회사가 이용자로부터 수집 및 이용하는 개인정보는 아래와 같으며, 서비스 제공을 위해 필요한 필수
                                        개인정보만 수집하고 있습니다.<br>
                                        * - 팜팜 아이디로 가입: 팜팜 아이디, 이름(실명여부), 비밀번호, 주소, 휴대전화 번호<br>
                                        또한 서비스 이용 과정에서 서비스 이용 기록, 접속 로그, 쿠키, IP 주소, 기기 정보 등이 생성되어 저장될 수 있습니다.<br><br>
                                        2. 개인정보의 수집 및 이용목적<br>
                                        가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산<br>
                                        * - 콘텐츠 제공, 특정 맞춤 서비스 제공, 물품 배송 또는 청구서 등 발송, 본인인증, 구매 및 요금 결제, 요금 추심<br>
                                        나. 회원관리 및 부정이용 방지<br>
                                        * - 회원제 서비스 제공, 개인식별, 가입 및 회원 탈퇴 의사의 확인, 만 14세 미만 아동 개인정보 수집 시 법정 대리인 동의 여부
                                        확인, 추후 법정 대리인 본인확인, 불만 처리 등 민원처리, 고지사항 전달<br>
                                        * - 팜팜 전자상거래/광고 등 비즈니스 플랫폼 서비스의 가입 및 가입 횟수 제한, 팜팜 이용약관 위반 회원에 대한 이용 제한 조치,
                                        서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재, 분쟁 조정을 위한 기록 보존<br>
                                        다. 신규 서비스 개발 및 마케팅·광고에의 활용<br>
                                        * - 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 정보 및
                                        참여 기회 제공, 광고성 정보 제공, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계<br><br>
                                        3. 개인정보의 보유 및 이용 기간<br>
                                        원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로
                                        명시한 기간 동안 보존합니다.<br>
                                        관련 법령에 의해 일정 기간 보관이 필요한 개인정보의 경우, 해당 법령의 규정에 따라 보관합니다.<br><br>
                                        <내부 정책에 의한 정보 보유 사유><br>
                                            보유 정보 : 아이디<br>
                                            - 보유 이유 : 재가입 신청 방지<br>
                                            - 보존 기간 : 탈퇴 후 30일간 보관<br>
                                            그 밖의 사항은 팜팜(주) Business Partner 개인정보 처리방침에 따릅니다.
                                    </div>

                                    <div class="close-wrap" id="modal-close">
                                        <button type="button" id="close-btn-wrap">
                                            <div class="close-btn">
                                                확인
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="/resources/js/member/signUp.js"></script>
                    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
                        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
                        crossorigin="anonymous"></script>

                    <script>
                    checkObj.farmImg = true;

                    checkObj.agreeInput1 = true;
                     $(document).ready(function () {
                            $("#close-btn-wrap").click(function () {
                                $(this).closest(".modal").css("display", "none");
                                $("#agreeInput").prop("checked", true);
                                checkObj.agreeInput = true;

                            });
                        });

                        //휴대폰번호 인증번호 보내기 버튼 클릭 이벤트
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
                                const memberTel = $('#to');
                                  alert('인증번호가 전송되었습니다.');
                                
                                  $('#enterBtn').click(function() {	
                                      const userNum = $('#userNum').val();
                                    
                                      if(checkNum === userNum) {
                                        alert('인증 성공하였습니다.');
                                        checkObj.userNum = true;
                                    }
                                    else {
                                        alert('인증 실패하였습니다. 다시 입력해주세요.');
                                        checkObj.userNum = false;
                                    }
                                });
                            
                                
                            }
                        });
                        
                    });
                    </script>
                </body>

                </html>