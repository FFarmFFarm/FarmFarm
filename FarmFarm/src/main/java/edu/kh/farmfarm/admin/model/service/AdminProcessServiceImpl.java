package edu.kh.farmfarm.admin.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminProcessDAO;

@Service
public class AdminProcessServiceImpl implements AdminProcessService{
	
	@Autowired
	private AdminProcessDAO dao;
	
	
	// 관리자인지 확인
	@Override
	public int checkAdmin() {
		return dao.checkAdmin();
	}
	
	
	// 회원 강제 탈퇴 (회원관리, 신고내역x)
	@Override
	public int memberKickout(int hiddenNo) {
		return dao.memberKickout(hiddenNo);
	}

	
	// 신고된 회원 강제 탈퇴 (신고내역 O)
	@Override
	public int reportMemberKickout(int hiddenNo) {
		
		int result = 0;
		
		// 강제 탈퇴 시키고
		result = dao.memberKickout(hiddenNo);
		
		// 강제 탈퇴가 성공한다면
		if(result > 0) {
			// 신고 상태 변경, 신고 처리일자 추가
			result = dao.changeReportStatus(hiddenNo);
		}
		
		return result;
	}
	
	
	
	// 신고 계정 - 반려
	@Override
	public int reportMemberLeave(int hiddenNo) {
		return dao.reportMemberLeave(hiddenNo);
	}	
}
