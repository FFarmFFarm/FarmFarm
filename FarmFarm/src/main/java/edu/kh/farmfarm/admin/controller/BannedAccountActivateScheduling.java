package edu.kh.farmfarm.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.kh.farmfarm.admin.model.service.AdminProcessService;
import edu.kh.farmfarm.admin.model.service.AdminService;
import edu.kh.farmfarm.admin.model.vo.Admin;

@Component
public class BannedAccountActivateScheduling {
	

	// * 주의사항 - @Scheduled 어노테이션은 매개변수가 없는 메소드에만 적용 가능.
	
	@Autowired
	private AdminProcessService service;
	
	// 신고되어 정지된 계정 7일 뒤에 풀기
	
	public void bannedAccountActivate() {
		
		// 계정의 reportType == 'M' 인지 확인
		// 계정의 reportPenlay == 'Y' && memberDelFl == 'N'인지 확인
		// 계정의 processDate 확인 
		// 위 세개를 조회해와서..
		
		// 1. 정지된 계정 조회하기
		List<Admin> bannedAccountList = service.selectBannedAccountList();
		
		
		// 2. processDate의 일시 +7 이 현재시간인지 확인
		
		
		
		// 3. 현재 시간이라면, 해당 reportTargetNo를 조회
		
		
		
		// 4.
		// processDate보다 7일 뒤면 정지된 계정 활성화 reportPenalty = 'N'
		
	}
	
	

	

}
