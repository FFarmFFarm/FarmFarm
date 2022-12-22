<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- 문자열 관련 메서드를 제공하는 JSTL (EL형식) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FarmFarm | 회원가입 </title>

    <link rel="stylesheet" href="/resources/css/member/signUp-style.css">

</head>
<body>
    <div class="signup-page">
        <div class="signup-page-img">
            <a href="/"><img src="/resources/images/mainLogo.png"></a>
        </div>
        <main>
            <div class="form-wrap">
                <div class="signup-title">회원가입</div>
                <!-- <div class="signup-subtitle">-구매자-</div> -->
                <div class="signup-subtitle">-판매자-</div>
                <form action="#" method="post" id="signUpFrm">
                    <section class="signup">
                        <input type="text" name="memberId" id="memberId" placeholder="아이디"
                        autocomplete="off" maxlegnth="50" value="1234">
                        <div id="IdConfirm" class="coner"></div>
                    </section>
                    <section class="signup">
                        <input type="password" name="memberPw" id="memberPw" placeholder="비밀번호" maxlegnth="20" value="1234">
                        <input type="password" name="memberPwConfirm" id="memberPwConfirm" placeholder="비밀번호 확인" maxlegnth="20" value="1234">
                        <div id="pwConfirm" class="coner">영어, 숫자, 특수문자(!,@,#,-,_) 8~20글자 사이로 입력해주세요.</div>
                    </section>
                    <section class="signup">
                        <input type="text" name="memberName" id="memberName" placeholder="이름" maxlegnth="10" value="1234">
                        <div id="nameConfirm" class="coner">한글, 영어, 숫자 2~10자리 입력해주세요.</div>
                    </section>
                    <section class="signup">
                        <input type="text" name="memberNickname" id="memberNickname" placeholder="닉네임" maxlegnth="10" value="1234">
                        <div id="nicknameConfirm" class="coner">한글, 영어, 숫자 2~10자리 입력해주세요.</div>
                    </section>
                    <section class="signup">
                        <div class="title">생년월일</div>
                        <input type="date" name="memberBirth" id="memberBirth" value="1234-01-01">
                        <div id="birthConfirm" class="coner"></div>
                    </section>

                    <%-- a,,b,,c --%>
                    <%-- 주소 문자열 -> 배열로 쪼개기 --%>
                    <c:set var="addr" value="${fn:split(tempMember.memberAddress,',,')}"/> <%-- 변수 선언 --%>

                    <section class="signup">
                        <div class="title">주소</div>
                        <div>
                            <input type="text" name="memberAddress" id="sample6_postcode" placeholder="우편번호" maxlength="6" value="${addr[0]}">
                            <button type="button" class="find-btn address-btn" onclick="sample6_execDaumPostcode()">주소찾기</button>
                        </div>
                        <div>
                            <input type="text" name="memberAddress" id="sample6_address" placeholder="도로명/지번 주소" value="${addr[1]}">
                        </div>
                        <div>
                            <input type="text" name="memberAddress" id="sample6_detailAddress" placeholder="상세 주소" value="${addr[2]}">
                        </div>
                    </section>
                    <section class="signup tel">
                        <div class="title">전화번호 인증</div>
                        <input type="text" name="memberTel" id="memberTel" placeholder="전화번호(-제외)" maxlength="11"
                        autocomplete="off" value="01012341234">
                        <button class="find-btn tel-btn1">본인인증</button>
                        <div id="telConfirm" class="coner"></div>
                    </section>
                    <section class="signup tel">
                        <input type="text" name="memberTelConfirm" id="memberTelConfirm" placeholder="인증번호 4자리" maxlength="4"
                        autocomplete="off" value="1234">
                        <button class="find-btn tel-btn2">인증하기</button>
                        <div id="telConfirm" class="coner"></div>
                    </section>
                    <section class="signup">
                        <div class="title">농장 인증</div>
                        <div class="farm-img">
                            <div class="farm-img-upload">
                                <label for="farmerImg">사진올리기</label>
                                <input type="file" name="farmerImg" id="farmerImg" accept=".jpg,.jpeg,.png">
                            </div>
                            <div class="farm-img-upload">
                                <label for="farmerImg">사진올리기</label>
                                <input type="file" name="farmerImg" id="farmerImg" accept=".jpg,.jpeg,.png">
                            </div>
                        </div>
                        <div id="telConfirm" class="coner"></div>
                    </section>
                    <section class="agree-wrap agree-wrapper">
                        <i class="fa-solid fa-check check-icon">
                            <input type="checkbox" name="agree"> 
                        </i>
                        <div class="agree-text">농장인증 절차로 인해 가입승인이 1-2일 소요됩니다.(필수)</div>
                    </section>
                    <section class="agree-wrap">
                        <i class="fa-solid fa-check check-icon">
                            <input type="checkbox" name="agree"> 
                        </i>
                        <div class="agree-text">이용약관 동의(필수)</div>
                    </section>
                    <section class="agree-wrap">
                        <i class="fa-solid fa-check check-icon">
                            <input type="checkbox" name="agree"> 
                        </i>
                        <div class="agree-text">개인 정보 수집 및 이용동의(필수)</div>
                    </section>
                    <button class="signup-btn">회원가입</button>
                </form>
            </div>
        </main>
        </div>

        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
    function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("sample6_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample6_detailAddress").focus();
            }
        }).open();
    }
</script>
</body>
</html>