package edu.kh.farmfarm.mypage.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import edu.kh.farmfarm.mypage.model.service.MyPageService;
import edu.kh.farmfarm.mypage.model.vo.Order;

@Controller
public class MyPageOrderController {
	
	@Autowired
	private MyPageService service;
	
	
	/** 반품 신청 페이지로 이동
	 * @param orderNo
	 * @param model
	 * @return
	 */
	@GetMapping("/returns/{orderNo}")
	public String returnOrder(
			@PathVariable("orderNo") int orderNo,
			Model model
			) {
		
		Order order = service.selectOrder(orderNo);
		
		if(order != null) {
			model.addAttribute("order", order);
		}
		
		
		return "order/return";
	}
	
	

}
