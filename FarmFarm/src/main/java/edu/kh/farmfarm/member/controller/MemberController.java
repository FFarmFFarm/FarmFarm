package edu.kh.farmfarm.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.service.MemberService;

@SessionAttributes({"loginMember", "message"})
@Controller
public class MemberController {
	@Autowired
	private MemberService service;
	
	// 로그인 화면 
	@GetMapping("/login")
	public String loginPage() {
		return "member/login";
	}
	
	// 회원가입 화면 
	@GetMapping("/signUpStart")
	public String signUpStart() {
		return "member/signUpStart";
	}
	
	// 회원가입 화면 (구매자/판매자 구분)
	@GetMapping("/signUp")
	public String signUp() {
		return "member/signUp";
	}
	
	// 로그인 하기
	@PostMapping("/login")
	public String login(Member inputMember,
						Model model,
						RedirectAttributes ra,
						@RequestHeader(value="referer") String referer,
						@RequestParam(value="saveId", required = false) String saveId,
						HttpServletResponse resp) {
		Member loginMember = service.login(inputMember);
		
		String path = null;
<<<<<<< Updated upstream
		
		if(loginMember != null) {
			path="/common/main";
			model.addAttribute("loginMember", loginMember);
		} else {
			path=referer;
			ra.addAttribute("message", "아이디, 비밀번호를 확인해주세요.");
		}
		
		
		return "redirect:" + path;
	}
=======
//		model.addAttribute("loginMember", loginMember);
		
		if(loginMember != null) {
			if(loginMember.getAuthority() == 2) { // 관리자 
				path = "/admin";
				model.addAttribute("loginMember", loginMember);
			}
			
			if(loginMember.getAuthority() == 0 || loginMember.getAuthority() == 1) {
				// 신고 여부 조회 
//				String checkReport = service.checkReport(loginMember.getMemberNo());
				String checkReport = null;
				checkReport = service.checkReport(loginMember.getMemberNo());
				
				
				if(checkReport == null) { // 신고 기록이 없으면 
					path = "/";
					model.addAttribute("loginMember", loginMember);
					
					Cookie cookie = new Cookie("saveId", loginMember.getMemberId());
					if(saveId != null) {
						cookie.setMaxAge(60*60*24*90); // 90일 유지 
					} else {
						cookie.setMaxAge(0);
					}
					cookie.setPath("/");
					resp.addCookie(cookie);
				} else { // 신고 기록이 있으면 
					path = referer;
					String notice = "계정 사용이 중지됨"
							+ "(기간 : " + checkReport
							+ ") 자세한 사항은 고객센터(help@farmfarm)으로 문의 바랍니다.";
					ra.addFlashAttribute("message", notice);
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
>>>>>>> Stashed changes

}
