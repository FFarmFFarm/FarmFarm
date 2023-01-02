package edu.kh.farmfarm.notify.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.notify.model.service.NotifyService;
import edu.kh.farmfarm.notify.model.vo.Notify;

@Controller
public class NotifyController {
	
	@Autowired
	private NotifyService service;
	
	// 임시 알림창 확인용 페이지 이동 메서드
	@GetMapping("/temp/notify")
	public String tempNotify() {
		return "notify/notifyReceiver";
	}
	
	// 로그인 확인용
	@PostMapping("/check/login")
	@ResponseBody
	public String checkLogin(HttpSession session) {
		int result = -1;
		
		if(session.getAttribute("loginMember") != null) {
			result = 0;
		}
		
		return new Gson().toJson(result);
	}
	
	// 게시글 또는 댓글의 작성자 찾기
	@PostMapping("/notify/select/targetNo")
	@ResponseBody
	public String selectTargetNo(String type, int inputNo) {
		return new Gson().toJson(service.selectTargetNo(type, inputNo));
	}
	
	// 알림 목록 조회(for nav widget, 최신 6개까지만)
	@PostMapping("/notify/widget/list")
	@ResponseBody
	public String selectNotifyWidgetList(HttpSession session) {
		
		Map<String, Object> notifyMap = new HashMap<String, Object>();
		
		if(session.getAttribute("loginMember") != null) {
			Member loginMember = (Member)session.getAttribute("loginMember");
			
			List<Notify> notifyList = service.selectNotifyWidgetList(loginMember.getMemberNo());
			
			notifyMap.put("notifyList", notifyList);
			
		} else {
			
			notifyMap.put("message", "invalidate");
		}
		
		return new Gson().toJson(notifyMap);
	}
	
	// 알림 페이지 이동(초기 세팅)
	@GetMapping("/notify/center")
	public String selectNotifyList(HttpSession session) {
		return "notify/center";
	}
}
