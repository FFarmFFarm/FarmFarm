package edu.kh.farmfarm.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.admin.model.service.AdminService;

@Controller
public class AdminController {
	
	@Autowired
	private AdminService service;
	
	
	// 관리자페이지
	// nav 대시보드
	@GetMapping("/admin")
	public String adminPage() {
		return "admin/dashboard";
	}
	
	// nav 회원관리 페이지로 이동
	@GetMapping("/admin/member")
	public String adminMemberPage() {
		return "admin/adminMember";
	}

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
	

}
