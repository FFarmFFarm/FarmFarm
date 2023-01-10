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
import edu.kh.farmfarm.notify.model.vo.NotifyOrder;

@Controller
public class NotifyController {
	
	@Autowired
	private NotifyService service;
	
	
	// 알림 페이지 이동(초기 세팅)
//	@GetMapping("/notify/center")
	@GetMapping("/myPage/notify")
	public String forwardNotifyList(HttpSession session) {
		return "notify/notifyCenter";
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
	
	
	// 내 알림 목록 요청(axios)
	@PostMapping("/notify/center/select")
	@ResponseBody
	public String selectNotifyList(HttpSession session) {
		
		Map<String, Object> notifyMap = new HashMap<String, Object>();
		
		if(session.getAttribute("loginMember") != null) {
			Member loginMember = (Member)session.getAttribute("loginMember");
			
			List<Notify> notifyList = service.selectNotifyList(loginMember.getMemberNo());
			
			notifyMap.put("notifyList", notifyList);
			
		} else {
			
			notifyMap.put("message", "invalidate");
		}
		
		return new Gson().toJson(notifyMap);
	}
	
	// 알림 읽음 처리(update)
	@PostMapping("/notify/update")
	@ResponseBody
	public String updateNotify(int notifyNo) {
		return new Gson().toJson(service.updateNotify(notifyNo));
	}
	
	// 알림 전부 읽음 처리(update)
	@PostMapping("/notify/update/all")
	@ResponseBody
	public String updateNotifyAll(String memberNickname) {
		return new Gson().toJson(service.updateNotifyAll(memberNickname));
	}
	
	// 알림 삭제 처리(delete)
	@PostMapping("/notify/delete")
	@ResponseBody
	public String deleteNotify(int notifyNo) {
		return new Gson().toJson(service.deleteNotify(notifyNo));
	}
	
	// 상품 주문 알림 발생을 위한 정보 요청
	@PostMapping("/notify/select/transaction")
	@ResponseBody
	public String selectTransaction(int orderNo) {
		NotifyOrder notifyOrder = service.selectTransaction(orderNo);
		
		Map<String, Object> notifyMap = new HashMap<String, Object>();
		
		notifyMap.put("notifyOrder", notifyOrder);
		
		return new Gson().toJson(notifyMap);
	}
}
