package edu.kh.farmfarm.seller.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.seller.model.service.SellerService;

@Controller
public class SellerController {

	@Autowired
	private SellerService service;
	
	@GetMapping("/seller")
	public String sellerPage(Model model) {
		
		int memberNo = 18;
		
		Member memberInfo = service.selectMemberInfo(memberNo);
		
		model.addAttribute("memberInfo", memberInfo);
		
		return "seller/sellerPage";
	}
	
	
}
