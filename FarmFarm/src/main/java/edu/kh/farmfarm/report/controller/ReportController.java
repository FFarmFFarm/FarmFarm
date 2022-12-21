package edu.kh.farmfarm.report.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.report.model.service.ReportService;
import edu.kh.farmfarm.report.model.vo.Report;

@Controller
public class ReportController {
	
	@Autowired
	private ReportService service;
	
	
	// 신고하기
	@GetMapping("")
	public int insertReport(Report report, @SessionAttribute("loginMember") Member loginMember) {

		int result = 0;
		
		if(loginMember != null) {

			result = service.insertReport(report);

		}
		
		
		return result;
	}
	

}
