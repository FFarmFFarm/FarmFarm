package edu.kh.farmfarm.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.farmfarm.member.model.service.DupService;

// 중복 검사용 컨트롤러 
@Controller
public class DupController {

	@Autowired
	private DupService service;
	
	// 아이디 중복 검사 
	@GetMapping("/idDupCheck")
	@ResponseBody
	public int idDupCheck(String memberId) {
		int result = service.idDupCheck(memberId);
		return result;
	}
	
//	// 이름 중복 검사 
//	@GetMapping("/nameDupCheck")
//	@ResponseBody
//	public int nameDupCheck(String memberName) {
//		int result = service.nameDupCheck(memberName);
//		return result;
//	}
	
	// 닉네임 중복 검사 
	@GetMapping("/nicknameDupCheck")
	@ResponseBody
	public int nicknameDupCheck(String memberNickname) {
		int result = service.nicknameDupCheck(memberNickname);
		return result;
	}
	
	// 전화번호 중복 검사 
	@GetMapping("/tellDupCheck")
	@ResponseBody
	public int tellDupCheck(String to) {
		int result = service.tellDupCheck(to);
		return result;
	}
}
