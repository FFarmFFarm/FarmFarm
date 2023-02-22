package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import edu.kh.farmfarm.admin.model.service.AdminSellerAuthService;
import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class AdminSellerAuthController {
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AdminSellerAuthService service;

	// 관리자페이지 - 판매자 관리 (판매자 인증)
	
	// 나중에 MemberController로 옮기기
	// 판매자 인증중 페이지 (판매자 인증중인 회원이 로그인할 경우)
	@GetMapping("/authenticating")
	public String authenticating() {
		return "member/authNotice";
	}
	
	
	// 판매자 인증 거절 페이지 (판매자 인증 거절된 회원이 로그인할 경우)
	@GetMapping("/authDeny")
	public String authDeny(@SessionAttribute(value="loginMember") Member loginMember, Model model) {
		
		int memberNo = loginMember.getMemberNo();
		
		String denyReason = service.selectDenyReason(memberNo);
		
		model.addAttribute("denyReason", denyReason);
		
		return "member/authNoticeDeny";
	}
	
	
	//--------
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
		int result = adminService.checkAdmin();
		
		
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
		int result = adminService.checkAdmin();
		
		
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
		int result = adminService.checkAdmin();
		
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
		int result = adminService.checkAdmin();
		
		
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
	public int sellerDeny(@SessionAttribute(value = "loginMember") Member loginMember, int hiddenNo,
							@RequestParam(value="denyReason", required=false) String denyReason
							) {
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		if(result == 1 && loginMember != null) {

			// 해당 회원번호의 인증 보류
			result = service.sellerDeny(hiddenNo, denyReason);
			
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return result;
	}
	
	
	
	// 판매자 인증 사진 업데이트 (form태그 jsp)
	@PostMapping("/admin/sellerAuth/updateImage")
	@ResponseBody
	public int updateSellerImage(@SessionAttribute(value="loginMember") Member loginMember, 
									@RequestParam(value="memberNo", required=false) int memberNo, 
									@RequestParam(value = "farmImg", required = false) MultipartFile farmImg, 
									HttpSession session) throws Exception{
		
		String webPath = "/resources/images/seller/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		
		// 관리자인지 확인 (관리자면 result==1)
		int result = adminService.checkAdmin();
		
		if(result == 1 && loginMember != null) {

			// 해당 회원번호의 인증사진 업데이트
			result = service.updateSellerImage(memberNo, webPath, folderPath, farmImg);
			
		} else {
			System.out.println("관리자만 접근 가능합니다.");
		}
		
		return result;

	}
	
	
	
	
	

}
