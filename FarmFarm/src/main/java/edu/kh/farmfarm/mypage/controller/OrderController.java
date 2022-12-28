package edu.kh.farmfarm.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import edu.kh.farmfarm.mypage.model.service.MyPageService;

@Controller
public class OrderController {
	
	@Autowired
	private MyPageService service;
	
	
	@GetMapping("/return/{orderNo}")
	public String returnOrder(
			@PathVariable("orderNo") int orderNo
			) {
		
		
		return "order/return";
	}
	
	

}
