package edu.kh.farmfarm.inquire.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

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
	public String selectInquire(int inquireNo, @SessionAttribute("loginMember") Member loginMember) {
		Map<String , Object> paramMap = new HashMap<String, Object>();
		
		paramMap.put("inquireNo", inquireNo);
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		List<Message> messageList = service.selectInquire(inquireNo);
		
		if(messageList != null) {
			int result = service.updateMessageRead(paramMap);
		}
		
		return new Gson().toJson(messageList);
	}
	
	
	@GetMapping("/inquire/unreadCheck")
	@ResponseBody
	public int unreadCheck(@SessionAttribute("loginMember")Member loginMember) {
		
		int unreadCount = service.unreadCheck(loginMember.getMemberNo());
		
		return unreadCount;
	}
	
	
	/** 전송된 사진을 서버에 저장
	 * @param message
	 * @param messageImg
	 * @return
	 */
	@PostMapping("/inquire/imgUpload")
	@ResponseBody
	public String inquireImgUpload(@RequestParam(value="messageImg") MultipartFile messageImg,
			HttpServletRequest req) throws Exception {
		
		String webPath = "/resources/images/inquire/";
		
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
		
		String path = service.inquireImgUpload(webPath, filePath, messageImg);
		
		String data = "<img src='" + path + "'></img>";
		
		return data;
	}
	
	
	
	

}
