package edu.kh.farmfarm.admin.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import edu.kh.farmfarm.admin.model.service.AdminProcessService;
import edu.kh.farmfarm.admin.model.vo.Admin;

@Component
public class BannedAccountActivateScheduling {
	

	// * 주의사항 - @Scheduled 어노테이션은 매개변수가 없는 메소드에만 적용 가능.
	
	@Autowired
	private AdminProcessService service;
	
	int count = 0;
	
	// 신고되어 정지된 계정 7일 뒤에 풀기
	@Scheduled(cron = "0 * * * * *")  // 매 분 0초에 실행
//	@Scheduled(cron = "0 0 3 * * *")  // 매일 3시 0분 0초에 실행
	public void bannedAccountActivate() throws ParseException{
		
		System.out.println("[ADMIN] 정지 계정 해제 프로세스 진행합니다.");
		
		// 1. 정지된 계정 조회하기
		List<Admin> bannedAccountList = service.selectBannedAccountList();
		
		
		// 2. processDate의 일시 +7 이 현재시간을 지났는지 확인!
		for(Admin admin : bannedAccountList) {
			
			String processDate = admin.getProcessDate();
			
//			System.out.println(processDate); //2023-01-04 17:05:08

			
			// 1) 7일 뒤 날짜, 시간 구하기
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			// 날짜 연산을 위해 String을 Date 객체로 변경
			Date pDate = sdf.parse(processDate);
			
			// 날짜 연산을 위한 Calendar 객체 생성 후 date 대입
			Calendar cal = Calendar.getInstance();
			cal.setTime(pDate);
			
//			System.out.println(cal.getTime()); // Wed Jan 04 17:05:08 KST 2023
			
			// 7일 더하기
			cal.add(Calendar.DATE, 7);
			
			// 테스트용 (5분 뒤)
//			cal.add(Calendar.MINUTE, 1);
			
			// processDate에서 7일 더한 날짜 (sdf 포맷으로 변경)
			String afterDate = sdf.format(cal.getTime());
			
//			System.out.println("5분 뒤 : " + afterDate);
			
			
			
			// 2) 현재 날짜, 시간
			LocalDateTime now = LocalDateTime.now();
			
			// 포맷 변경
			String sysdate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			
			System.out.println("sysdate : " + sysdate);
			
			
			// 3. 7일 뒤 날짜가 현재 시간을 지났으면! 해당 reportTargetNo 조회
			int result = afterDate.compareTo(sysdate);  
			// compareTo() 
			// result = 0 동일 시간
			// result < 0 afterDate는 sysdate 이전 날짜
			// result > 0 afterDate는 sysdate 이후 날짜
			
			
			if(result < 0) {
			
				int targetNo = admin.getReportTargetNo();
				String targetType = admin.getReportType();
				
				System.out.println(targetNo);
				
				// 4. 해당 계정 활성화
				if(targetType.equals("M")) {
					result = service.activateAccount(targetNo);
				}
				
				if(result > 0) {
					System.out.println("회원번호 " + targetNo + "의 계정이 활성화되었습니다.");
					count = result;
					
					
				} else {
					System.out.println("계정 활성화 실패");
				}
			}
		}
		
	}
	

}
