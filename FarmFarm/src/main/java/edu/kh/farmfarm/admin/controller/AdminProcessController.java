package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.admin.model.service.AdminProcessService;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class AdminProcessController {
	
	@Autowired
	private AdminProcessService service;
	
	// 회원 관리 - 강제 탈퇴 (신고 내역 없어도 가능)
	@PostMapping("/admin/kickout")
	@ResponseBody
	public int memberKickout(@SessionAttribute(value="loginMember") Member loginMember, int hiddenNo) {
		
		// 관리자인지 확인
		int result = service.checkAdmin();
		
		if(result == 1  && loginMember != null) {
			
			result = service.memberKickout(hiddenNo);
		}
		
		return result;
	}
	
	
	// 관리자페이지 - 신고 처리
	/*
	  계정 - 강제 탈퇴, 정지, 반려
	  게시글 - 삭제, 반려
	  admin-mapper 그대로 사용
	 */
	
	
	// 신고 계정 - 강제탈퇴  // 신고된 회원 강제 탈퇴 + REPORT 테이블 변경하기
	@PostMapping("/report/kickout")
	@ResponseBody
	public int reportMemberKickout(@SessionAttribute(value="loginMember") Member loginMember, int hiddenNo) {
		
		// 관리자인지 확인
		int result = service.checkAdmin();
		
		if(result == 1  && loginMember != null) {
			
			result = service.reportMemberKickout(hiddenNo);
		}
		return result;
	}
	
	
	// 신고 계정 - 정지   // 스케쥴러로 7일 뒤에 풀기
	@PostMapping("/report/bannedAccount")
	@ResponseBody
	public int reportMemberBanned(@SessionAttribute(value="loginMember") Member loginMember, int hiddenNo) {
		// 관리자인지 확인
		int result = service.checkAdmin();
		
		if(result == 1  && loginMember != null) {
			
			result = service.reportMemberBanned(hiddenNo);
		}
		return result;
	}
	
	
	
	
	
	
	
	// 신고 계정 - 반려
	@PostMapping("/report/leaveAccount")
	@ResponseBody
	public int reportMemberLeave(@SessionAttribute(value="loginMember") Member loginMember, int hiddenNo) {
		
		// 관리자인지 확인
		int result = service.checkAdmin();
		
		if(result == 1  && loginMember != null) {
			
			result = service.reportMemberLeave(hiddenNo);
		}
		return result;
		
	}
	
	
	
	
	// 신고 게시글(판매글, 커뮤니티 게시글) - 삭제
	@GetMapping("/report/deleteContent")
	@ResponseBody
	public int reportDeleteContent(@SessionAttribute(value="loginMember") Member loginMember,
									int hiddenContentNo, String reportType) {
		// 관리자인지 확인
		int result = service.checkAdmin();

		
		if(result == 1  && loginMember != null) {
			
			result = service.reportDeleteContent(hiddenContentNo, reportType);
		}
		return result;
	}
	

	
	// 신고 게시글 - 반려
	@GetMapping("/report/LeaveContent")
	@ResponseBody
	public int reportLeaveContent(@SessionAttribute(value="loginMember") Member loginMember,
									int hiddenContentNo, String reportType) {
		// 관리자인지 확인
		int result = service.checkAdmin();
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("hiddenContentNo", hiddenContentNo);
		paramMap.put("reportType", reportType);
		
		if(result == 1  && loginMember != null) {
			
			result = service.reportLeaveContent(paramMap);
		}
		return result;
	}
	
	
	

	
	

}
