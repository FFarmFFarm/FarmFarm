package edu.kh.farmfarm.report.controller;

import java.util.HashMap;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.report.model.service.ReportService;
import edu.kh.farmfarm.report.model.vo.Report;

@Controller
public class ReportController {
	
	@Autowired
	private ReportService service;

	// 임시 신고하기 위한 테스트 페이지
	@GetMapping("/testPage/4")
	public String testPage() {
		return "report/testPage";
	}
	
	// 신고하기
	@PostMapping("/report")
	@ResponseBody
	public int insertReport(@SessionAttribute(value = "loginMember") Member loginMember,
							@RequestParam(value="reportType", required=false) String reportType,
							@RequestParam(value="reportTargetNo", required=false, defaultValue="0") int reportTargetNo,
							@RequestParam(value="reportReason", required=false) String reportReason,
							@RequestParam(value="reportContent", required=false)  String reportContent
							) {

		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("reportType", reportType);
		map.put("reportTargetNo", reportTargetNo);
		map.put("reportReason", reportReason);
		map.put("reportContent", reportContent);
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = 0;
		
		if(loginMember != null) {

			result = service.insertReport(map);
			
		}
		
		return result;
	}
	
	
	
	
	

}
