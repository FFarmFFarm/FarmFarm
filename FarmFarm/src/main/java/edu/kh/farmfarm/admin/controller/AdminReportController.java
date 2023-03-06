package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	private AdminReportService service;
	
	// 신고 관리 -----------------------------------------------------------------------------------------
	
	// jsp
	// 미처리 신고 조회
	@GetMapping("/admin/report")
	public String adminReportPage(@SessionAttribute(value = "loginMember") Member loginMember,
									@RequestParam(value="cp", required=false, defaultValue="1") int cp,	
									@RequestParam(value = "sortFilter", required=false, defaultValue = "default") String sortFilter,
									Model model) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		// 미처리 신고 조회 + 페이지네이션 + 정렬
		map = service.selectNewReport(sortFilter, cp);
		model.addAttribute("map", map);
		return "admin/adminReport";
			
	}
	
	
	
	// ajax
	// 미처리 신고 내역 조회 
	@GetMapping("/admin/report/issues")
	@ResponseBody
	public String adminReportPage(@RequestParam(value="cp", required=false, defaultValue="1") int cp,	
								  @RequestParam(value = "sortFilter", required=false, defaultValue = "default") String sortFilter) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 미처리 신고 조회 + 페이지네이션 + 정렬
		map = service.selectNewReport(sortFilter, cp);
			
		return new Gson().toJson(map);
	}


	
	// ajax
	// 미처리 신고 상세 조회(모달창 내부 내용)
	@GetMapping("/admin/report/issues/{reportNo}")
	@ResponseBody
	public Admin adminNeweportDetail(@PathVariable("reportNo") int hiddenReportNo) {
		
		Admin newReportDetail = new Admin();
		
		// 미처리 신고 상세 조회
		newReportDetail = service.selectNewReportDetail(hiddenReportNo);
	
		return newReportDetail;
	}
	

	
	// 신고 누적 기록 조회 (신고 누적 모달)
	@GetMapping("/admin/report/{reportNo}/accumulation")
	@ResponseBody
	public String selectReportAccumulate(@PathVariable("reportNo") int reportNo,
										 @RequestParam(value="memberNo", required=false, defaultValue="0") int memberNo,
										 @RequestParam(value="contentNo", required=false, defaultValue="0") int contentNo,
										 @RequestParam(value="reportType", required=false ) String reportType,
										 @RequestParam(value="allNew", required=false) String allNew
										) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 신고 누적 기록 조회
		map = service.selectReportAccumulate(reportType, memberNo, contentNo, allNew);
	
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
		
		Map<String, Object> map = new HashMap<String, Object>();
		

		// 미처리 신고 조회 + 페이지네이션 + 정렬
		map = service.selectReportAllList(paramMap, cp);
	
		model.addAttribute("map", map);
		
		return "admin/adminReportList";
	}
	
	
	
	// -- ajax
	// 전체 신고 내역
	@GetMapping("/admin/report/list")
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
		
		Map<String, Object> map = new HashMap<String, Object>();

		// 미처리 신고 조회 + 페이지네이션 + 정렬
		map = service.selectReportAllList(paramMap, cp);
	
		return new Gson().toJson(map);
	}
	
	
	// ajax
	// 전체 신고 상세 조회(모달창 내부 내용)
	@GetMapping("/admin/report/list/{reportNo}")
	@ResponseBody
	public Admin selectReportDetail(@SessionAttribute(value="loginMember") Member loginMember, 
									@PathVariable("reportNo") int hiddenReportNo) {
		
		Admin reportDetail = new Admin();
		
		// 전체 신고 상세 조회
		reportDetail = service.selectReportDetail(hiddenReportNo);
	
		return reportDetail;
	}
	
	

}
