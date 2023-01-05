package edu.kh.farmfarm.member.controller;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;
import edu.kh.farmfarm.member.model.service.MemberService;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@SessionAttributes({ "loginMember", "message", "previousPage"})
@Controller
public class MemberController {
	@Autowired
	private MemberService service;

	// 로그인 화면
	@GetMapping("/login")
	public String loginPage(@RequestHeader("referer")String referer,
			Model model) {
		
		model.addAttribute("previousPage", referer);
		
		
		return "member/login";
	}

	// 회원가입 화면
	@GetMapping("/signUpStart")
	public String signUpStart() {
		return "member/signUpStart";
	}

	// 회원가입 화면 (구매자)
	@GetMapping("/signUp0")
	public String signUp0() {
		return "member/signUp0";
	}

	// 회원가입 화면 (판매자)
	@GetMapping("/signUp1")
	public String signUp1() {
		return "member/signUp1";
	}

	// 회원가입 화면 (동의)
	@GetMapping("/signUpAgree")
	public String signUpAgreePage() {
		return "member/signUpAgree";
	}

	// 로그인 하기
	@PostMapping("/login")
	public String login(Member inputMember, Model model, RedirectAttributes ra,
			@RequestHeader(value = "referer") String referer,
			@RequestParam(value = "saveId", required = false) String saveId, HttpServletResponse resp,
			@SessionAttribute("previousPage") String previousPage) {
		Member loginMember = service.login(inputMember);
		
		String path = null;

		if (loginMember != null) {
			
			if(loginMember.getMemberDelFl().equals("Y")) {
				ra.addFlashAttribute("message", "탈퇴 된 회원입니다.");
				path = referer;
			} else {
				if (loginMember.getAuthority() == 2) { // 관리자
					path = "/admin";
					model.addAttribute("loginMember", loginMember);
				}

				if (loginMember.getAuthority() == 0 || loginMember.getAuthority() == 1) {
					// 신고 여부 조회 (계정 정지 후 7일 뒤 날짜 조회)
					String checkReport = null;
					checkReport = service.checkReport(loginMember.getMemberNo());

					if (checkReport == null) { // 신고 기록이 없으면
						path = previousPage;
						model.addAttribute("loginMember", loginMember);

						Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
						if (saveId != null) {
							cookie.setMaxAge(60*60*24*90); // 90일 유지
						} else {
							cookie.setMaxAge(0);
						}
						cookie.setPath("/");
						resp.addCookie(cookie);
					} else { // 신고 기록이 있으면
						path = referer;
						String notice = "계정 사용이 중지됨" + "(기간 : " + checkReport + "까지) 자세한 사항은 고객센터(help@farmfarm)으로 문의 바랍니다.";
						ra.addFlashAttribute("message", notice);
					}
					}
				if (loginMember.getAuthority() == 3) { // 인증 대기
					path = "/authenticating";
				}
				
				if (loginMember.getAuthority() == 4) { // 인증 보류
					path = "/authDeny";
					model.addAttribute("loginMember", loginMember);
				}
				
			}
		} else {
				path = referer;
				ra.addFlashAttribute("message", "아이디, 비번을 확인해주세요.");
		}

		return "redirect:" + path;
	}

	// 로그아웃 하기
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		status.setComplete();

		return "redirect:/";
	}

	// 회원가입 하기(구매자)
	@PostMapping("/signUp0")
	public String signUp0(Member inputMember, RedirectAttributes ra, String[] memberAddress,
			@RequestHeader("referer") String referer) {

		int result = service.signUp0(inputMember, memberAddress);

		String path = null;
		String message = null;

		if (result > 0) { // 회원가입 성공 시
			path = "/signUpSuccess";
		} else { // 실패 시
			path = referer;
			message = "회원가입 실패";

			// 이전 페이지로 돌아갔을 때 입력했던 값을 같이 전달
			inputMember.setMemberPw(null); // 비밀번호 삭제
			ra.addFlashAttribute("tempMember", inputMember);
		}

		ra.addFlashAttribute("message", message);

		return "redirect:" + path;
	}

	// 회원가입 하기(판매자)
	@PostMapping("/signUp1")
	public String signUp1(Member inputMember, RedirectAttributes ra, String[] memberAddress,
			@RequestHeader("referer") String referer,
			@RequestParam(value = "farmfarm", required = false) MultipartFile farmImg, HttpSession session)
			throws Exception {

		String webPath = "/resources/images/seller/";

		String folderPath = session.getServletContext().getRealPath(webPath);
		// -> /resources/images/seller/ 까지의 실제 컴퓨터 저장 경로 반환

		int result = service.signUp1(inputMember, memberAddress, webPath, folderPath, farmImg);

		String path = null;
		String message = null;

		if (result > 0) { // 회원가입 성공 시
			path = "/signUpSuccess";
		} else { // 실패 시
			path = referer;
			message = "회원가입 실패";

			// 이전 페이지로 돌아갔을 때 입력했던 값을 같이 전달
			inputMember.setMemberPw(null); // 비밀번호 삭제
			ra.addFlashAttribute("tempMember", inputMember);
		}

		ra.addFlashAttribute("message", message);

		return "redirect:" + path;
	}
	
	// 문자 인증
	@GetMapping("/check/sendSMS")
	public @ResponseBody
	String sendSMS(@RequestParam(value="to") String to) throws CoolsmsException {
		return service.phoneNumberCheck(to);
	}
 	

	// 회원가입 후 페이지 이동
	@GetMapping("/signUpSuccess")
	public String signUpSuccessPage() {
		return "/member/signUpSuccess";
	}
	
}
