package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class AdminController {
	
	@Autowired
	private AdminService service;
	
	
	// 관리자페이지

//	// nav 회원관리 페이지로 이동
//	@GetMapping("/admin/member")
//	public String adminMemberPage() {
//		return "admin/adminMember";
//	}

	// nav 판매자 인증 관리 페이지로 이동
	@GetMapping("/admin/seller")
	public String adminSellerAuthPage() {
		return "admin/adminSellerAuth";
	}
	
	
	// nav 전체 신고 관리 페이지로 이동
	@GetMapping("/admin/report")
	public String adminReportPage() {
		return "admin/adminReportTotal";
	}
	
	
	
	// 대시보드
	// 통계 조회
	@GetMapping("/admin")
	public String dashboard(@SessionAttribute(value="loginMember") Member loginMember, Model model,
							@RequestHeader(value="referer") String referer) {
		
		// 관리자인지 확인
		int result = service.checkAdmin();

		Map<String, Object> statMap = new HashMap<String, Object>();
		
		// 관리자일 때만 && 로그인했을 때
		if(result == 1 && loginMember != null) {

			// 대시보드 통계 조회
			statMap = service.selectStats(); //statMap
		}
		
		model.addAttribute("statMap", statMap);
		
		return "admin/dashboard";
		
	}
	
	
	// 전체 회원 조회
	@GetMapping("/admin/member")
	public String selectMemberAll(Member member, @SessionAttribute(value="loginMember") Member loginMember, int memberNo) {
		
		List<Member> memberAllList = service.selectMemberAll(memberNo);
		
		
	}
	
	
	
	
	
	

}
