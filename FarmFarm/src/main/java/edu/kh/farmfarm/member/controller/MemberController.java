package edu.kh.farmfarm.member.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.service.MemberService;

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
		
		if(loginMember != null) {
			path="/common/main";
			model.addAttribute("loginMember", loginMember);
		} else {
			path=referer;
			ra.addAttribute("message", "아이디, 비밀번호를 확인해주세요.");
		}
		
		
		return "redirect:" + path;
	}

}
