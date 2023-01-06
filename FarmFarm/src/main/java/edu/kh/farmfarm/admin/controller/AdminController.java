package edu.kh.farmfarm.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.admin.model.vo.Graph;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import lombok.ToString;

@Controller
@ToString
public class AdminController {
	
	@Autowired
	private AdminService service;

	
	// 나중에 MemberController로 옮기기
	// 판매자 인증중 페이지 (판매자 인증중인 회원이 로그인할 경우)
	@GetMapping("/authenticating")
	public String authenticating() {
		return "member/authNotice";
	}
	
	
	// 판매자 인증 거절 페이지 (판매자 인증 거절된 회원이 로그인할 경우)
	@GetMapping("/authDeny")
	public String authDeny() {
		return "member/authNoticeDeny";
	}
	
	
	

	// 관리자페이지 --------------------------------------------------------
	
	// 대시보드 -----------------------------------------------------------
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
	
	
	
	
	// 날짜별 회원가입자 수 + 주문 수 (최근 30일간)
	@GetMapping("/dashboard/signUpGraph")
	@ResponseBody
	public String signUpGraph(@SessionAttribute(value="loginMember") Member loginMember) {
		// 관리자인지 확인
		int result = service.checkAdmin();

		Map<String, Object> graphMap = new HashMap<String, Object>();
		
		// 관리자일 때만 && 로그인했을 때
		if(result == 1 && loginMember != null) {

			// 회원가입자 수, 주문 수 조회
			graphMap = service.selectGraph();
			
		}

		
		return new Gson().toJson(graphMap);
	}

	
	
	
	
	
	
	
	
	
	// 회원 관리 --------------------------------------------------------------------------------
	// 전체 회원 조회 페이지로 이동
	// JSP 
	@GetMapping("/admin/member")
	public String adminMemberPage(@SessionAttribute(value="loginMember") Member loginMember, 
									Model model,
									@RequestParam(value="cp", required=false, defaultValue="1") int cp,
									@RequestParam(value="authFilter", required=false, defaultValue="0") String authFilter,
									@RequestParam(value="statFilter", required=false, defaultValue="0") String statFilter
									) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("authFilter", authFilter);
		paramMap.put("statFilter", statFilter);
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMember(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		model.addAttribute("map", map);
		
		return "admin/adminMember";
	}
	
	
	
	// 전체 회원 조회 (정렬, 페이지네이션, 검색)
	@GetMapping("/admin/selectMemberList")
	@ResponseBody
	public String selectMember(@SessionAttribute(value="loginMember") Member loginMember, 
								@RequestParam(value="cp", required=false, defaultValue="1") int cp,
								@RequestParam(value="authFilter", required=false, defaultValue="0") String authFilter,
								@RequestParam(value="statFilter", required=false, defaultValue="0") String statFilter,
								@RequestParam(value="keyword", required=false) String keyword) {
		
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("authFilter", authFilter);
		paramMap.put("statFilter", statFilter);
		
		if(keyword != null) {
			paramMap.put("keyword", keyword);
		}
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMember(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		
		return new Gson().toJson(map);
	}
	
	
	
	// 회원 상세 조회
	@GetMapping("/admin/selectMemberDetail")
	@ResponseBody
	public String selectMemberDetail(@SessionAttribute(value="loginMember") Member loginMember,
										int hiddenNo) {
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		
		if(result == 1 && loginMember != null) {

			// 전체 회원 정보 조회 + 페이지네이션 + 정렬
			map = service.selectMemberDetail(hiddenNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		
		return new Gson().toJson(map);
		
	}
	
	

	
	
	
	// 판매자 인증 ------------------------------------------------------------------------------------
	// nav 판매자 인증 관리 페이지로 이동
//	@GetMapping("/admin/seller")
//	public String adminSellerAuthPage() {
//		return "admin/adminSellerAuth";
//	}
	
	
	//-- jsp (첫페이지)
	// 판매자 정보 조회
	@GetMapping("/admin/seller")
	public String adminSellerAuthPage(@SessionAttribute(value="loginMember") Member loginMember,
										@RequestParam(value="cp", required=false, defaultValue="1") int cp,
										@RequestParam(value="preSellerFilter", required=false, defaultValue="0") int sellerFilter,
										Model model) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sellerFilter", sellerFilter);
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 판매자 인증 조회 + 페이지네이션 + 정렬
			map = service.selectSeller(paramMap, cp);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}

		
		model.addAttribute("map", map);
		
		return "admin/adminSellerAuth";
	}
	
	
	// ajax(2페이지부터)
	// 판매자 정보 조회
	@GetMapping("/admin/selectSellerList")
	@ResponseBody
	public String adminSellerAuthPage(@SessionAttribute(value="loginMember") Member loginMember,
										@RequestParam(value="cp", required=false, defaultValue="1") int cp,
										@RequestParam(value="sellerFilter", required=false, defaultValue="0") int sellerFilter,
										@RequestParam(value="keyword", required=false) String keyword) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sellerFilter", sellerFilter);
		
		if(keyword != null) {
			paramMap.put("keyword", keyword);
		}
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 판매자 인증 조회 + 페이지네이션 + 정렬
			map = service.selectSeller(paramMap, cp);
			
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}

		return new Gson().toJson(map);
	}
	
	
	
	// 판매자인증 신청서 조회
	@PostMapping("/admin/selectAuthPaper")
	@ResponseBody
	public Admin selectAuthPaper(@SessionAttribute(value = "loginMember") Member loginMember,
									int hiddenNo) {
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Admin authPaper = new Admin();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
		
		if(result == 1 && loginMember != null) {

			// 해당 회원번호의 인증신청서 조회
			authPaper = service.selectAuthPaper(hiddenNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return authPaper;
	}
	
	
	
	// 판매자 승인
	@PostMapping("/admin/sellerApprove")
	@ResponseBody
	public int sellerApprove(@SessionAttribute(value = "loginMember") Member loginMember, int hiddenNo) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		
		if(result == 1 && loginMember != null) {

			// 해당 회원번호의 인증 승인
			result = service.sellerApprove(hiddenNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return result;

	}
	
	
	
	
	// 판매자 거절 (인증 보류)
	@PostMapping("/admin/sellerDeny")
	@ResponseBody
	public int sellerDeny(@SessionAttribute(value = "loginMember") Member loginMember, int hiddenNo) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		
		if(result == 1 && loginMember != null) {

			// 해당 회원번호의 인증 보류
			result = service.sellerDeny(hiddenNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return result;

	}
	
	
	
	
	
	
	
	
	
	
	
	
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
		int result = service.checkAdmin();
		
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
		int result = service.checkAdmin();
		
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
		int result = service.checkAdmin();
		
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
										 @RequestParam(value="reportType", required=false ) String reportType
										) {
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = service.checkAdmin();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		if(result == 1 && loginMember != null) {

			// 신고 누적 기록 조회
			map = service.selectReportAccumulate(reportType, memberNo, contentNo);
	
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return new Gson().toJson(map);
	}
	
	
	
	
	// 접수된 신고 처리는 ReportController에서 해결  -- REPORT테이블

	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
}
