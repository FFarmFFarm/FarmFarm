package edu.kh.farmfarm.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	
	
	// 신고 계정 - 정지
	
	
	
	
	
	
	
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
	
	
	
	
	
	
	
	// 신고 게시글 - 삭제
	
	
	
	
	
	
	
	// 신고 게시글 - 반려
	
	
	
	

	
	

}
