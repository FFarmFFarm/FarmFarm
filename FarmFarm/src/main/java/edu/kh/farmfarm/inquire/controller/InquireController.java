package edu.kh.farmfarm.inquire.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.inquire.model.service.InquireService;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class InquireController {
	
	@Autowired
	private InquireService service;
	
	@GetMapping("/inquire/enter")
	@ResponseBody
	public int inquireEnter(int memberNo2, @SessionAttribute("loginMember")Member loginMember) {
		
        Map<String, Integer> map = new HashMap<String, Integer>();
        
        map.put("memberNo", loginMember.getMemberNo());
        map.put("memberNo2", memberNo2);
        
        int inquireNo = service.checkInquireRoom(map);
				
        if(inquireNo == 0) {
        	inquireNo = service.createInquireRoom(map);
        }
        
		return inquireNo;
	}
	
	@GetMapping("/inquire/select")
	@ResponseBody
	public String selectInquire(int inquireNo) {
		
		List<Message> messageList = service.selectInquire(inquireNo);
		
		return new Gson().toJson(messageList);
	}
	
	@GetMapping("/inquire/unreadCheck")
	@ResponseBody
	public int unreadCheck(@SessionAttribute("loginMember")Member loginMember) {
		
		int unreadCount = service.unreadCheck(loginMember.getMemberNo());
		
		return unreadCount;
	}
	
	

}
