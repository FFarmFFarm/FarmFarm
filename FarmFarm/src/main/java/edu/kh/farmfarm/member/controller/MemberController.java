package edu.kh.farmfarm.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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

}
