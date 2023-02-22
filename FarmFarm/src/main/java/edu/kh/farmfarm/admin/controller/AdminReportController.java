package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.admin.model.service.AdminReportService;
import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class AdminReportController {
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AdminReportService service;
	
	// 신고 관리 -----------------------------------------------------------------------------------------
	// nav 전체 신고 관리 페이지로 이동
//	@GetMapping("/admin/report")
//	public String adminReportPage() {
//		return "admin/adminReport";
//	}
	
	
	// jsp
	// 미처리 신고 조회
	@GetMapping("/admin/report")
	public String adminReportPage(@SessionAttribute(value = "loginMember") Member loginMember,
									@RequestParam(value="cp", required=false, defaultValue="1") int cp,	
									@RequestParam(value = "sortFilter", required=false, defaultValue = "default") String sortFilter,
									Model model) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 미처리 신고 조회 + 페이지네이션 + 정렬
			map = service.selectNewReport(sortFilter, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		model.addAttribute("map", map);
		
		return "admin/adminReport";
	}
	
	
	
	// ajax
	// 미처리 신고 내역 조회 
	@GetMapping("/admin/selectNewReportList")
	@ResponseBody
	public String adminReportPage(@SessionAttribute(value = "loginMember") Member loginMember,
									@RequestParam(value="cp", required=false, defaultValue="1") int cp,	
									@RequestParam(value = "sortFilter", required=false, defaultValue = "default") String sortFilter) 
									{
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 미처리 신고 조회 + 페이지네이션 + 정렬
			map = service.selectNewReport(sortFilter, cp);
			
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return new Gson().toJson(map);
	}


	
	// ajax
	// 미처리 신고 상세 조회(모달창 내부 내용)
	@PostMapping("/admin/selectNewReportDetail")
	@ResponseBody
	public Admin adminNeweportDetail(@SessionAttribute(value="loginMember") Member loginMember, int hiddenReportNo) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Admin newReportDetail = new Admin();
		
		if(result == 1 && loginMember != null) {

			// 미처리 신고 상세 조회
			newReportDetail = service.selectNewReportDetail(hiddenReportNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return newReportDetail;
	}
	

	
	// 신고 누적 기록 조회 (신고 누적 모달)
	@PostMapping("/admin/selectReportAccumulate")
	@ResponseBody
	public String selectReportAccumulate(@SessionAttribute(value="loginMember") Member loginMember, 
										 @RequestParam(value="memberNo", required=false, defaultValue="0") int memberNo,
										 @RequestParam(value="contentNo", required=false, defaultValue="0") int contentNo,
										 @RequestParam(value="reportType", required=false ) String reportType,
										 @RequestParam(value="allNew", required=false) String allNew
										) {
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 신고 누적 기록 조회
			map = service.selectReportAccumulate(reportType, memberNo, contentNo, allNew);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return new Gson().toJson(map);
	}
	
	
	
	
	// 접수된 신고 처리는 ReportController에서 해결  -- REPORT테이블

	
	
	// 신고 검색 메뉴 -------------------------------------------
	// 전체 신고 내역
	// -- jsp
	@GetMapping("/admin/reportList")
	public String adminReportListPage(@SessionAttribute(value="loginMember") Member loginMember,
										@RequestParam(value="cp", required=false, defaultValue="1") int cp,
										@RequestParam(value="typeFilter", required=false, defaultValue="0") int typeFilter,
										@RequestParam(value="sortFilter", required=false, defaultValue="default") String sortFilter,
										@RequestParam(value="processFilter", required=false, defaultValue="0") int processFilter,
										@RequestParam(value="keyword", required=false) String keyword,
										Model model) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("typeFilter", typeFilter);
		paramMap.put("sortFilter", sortFilter);
		paramMap.put("keyword", keyword);
		paramMap.put("processFilter", processFilter);
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 미처리 신고 조회 + 페이지네이션 + 정렬
			map = service.selectReportAllList(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		model.addAttribute("map", map);
		
		return "admin/adminReportList";
	}
	
	
	
	// -- ajax
	// 전체 신고 내역
	@GetMapping("/admin/selectReportList")
	@ResponseBody
	public String adminReportListPage(@SessionAttribute(value="loginMember") Member loginMember,
										@RequestParam(value="cp", required=false, defaultValue="1") int cp,
										@RequestParam(value="typeFilter", required=false, defaultValue="0") int typeFilter,
										@RequestParam(value="sortFilter", required=false, defaultValue="default") String sortFilter,
										@RequestParam(value="processFilter", required=false, defaultValue="0") int processFilter,
										@RequestParam(value="keyword", required=false) String keyword
										) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("typeFilter", typeFilter);
		paramMap.put("sortFilter", sortFilter);
		paramMap.put("keyword", keyword);
		paramMap.put("processFilter", processFilter);
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 미처리 신고 조회 + 페이지네이션 + 정렬
			map = service.selectReportAllList(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		
		return new Gson().toJson(map);
	}
	
	
	// ajax
	// 전체 신고 상세 조회(모달창 내부 내용)
	@PostMapping("/admin/selectReportDetail")
	@ResponseBody
	public Admin selectReportDetail(@SessionAttribute(value="loginMember") Member loginMember, int hiddenReportNo) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		Admin reportDetail = new Admin();
		
		if(result == 1 && loginMember != null) {

			// 전체 신고 상세 조회
			reportDetail = service.selectReportDetail(hiddenReportNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return reportDetail;
	}
	
	

}
