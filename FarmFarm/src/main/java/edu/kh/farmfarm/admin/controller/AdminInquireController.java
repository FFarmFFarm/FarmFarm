package edu.kh.farmfarm.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.admin.model.service.AdminInquireService;
import edu.kh.farmfarm.inquire.model.service.InquireService;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class AdminInquireController {
	
	@Autowired 
	private AdminInquireService service;
	
	@Autowired
	private InquireService inquireService;
	
//	상담 관리 페이지로 이동
	@GetMapping("/admin/inquiries")
	public String inquirePage(Model model) {
		
		
		List<InquireRoom> inquireList = service.selectInquireList();
		
		model.addAttribute("inquireList", inquireList);
		
		return "admin/adminInquire";
	}
	
//	상담방 메세지 목록 조회
	@GetMapping("/admin/inquiries/{inquireNo}")
	@ResponseBody
	public String selectMessageList(@PathVariable("inquireNo") int inquireNo, 
			@SessionAttribute("loginMember")Member loginMember) {
		
		
		List<Message> messageList = service.selectMessageList(inquireNo);
		
		if(messageList != null) {
			
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("inquireNo", inquireNo);
			paramMap.put("memberNo", loginMember.getMemberNo());
			
			inquireService.updateMessageRead(paramMap);
		}
		
		
		return new Gson().toJson(messageList);
	}
	
//	상담방 목록 조회
	@GetMapping("/inquiries/list")
	@ResponseBody
	public String selectInquireList() {
		
		
		List<InquireRoom> inquireList = service.selectInquireList();
		
		
		return new Gson().toJson(inquireList);
	}
	
	/** 상담 메시지 읽음처리
	 * @param inquireNo
	 * @param loginMember
	 * @return
	 */
	@PutMapping("/inquiries/{inquireNo}/read")
	@ResponseBody
	public int updateMessageRead(@PathVariable("inquireNo") int inquireNo,
			@SessionAttribute("loginMember")Member loginMember) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("inquireNo", inquireNo);
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		int result = inquireService.updateMessageRead(paramMap);
		return result;
	}
	

}
