package edu.kh.farmfarm.seller.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.seller.model.service.SellerService;

@Controller
public class SellerController {

	@Autowired
	private SellerService service;
	
	@GetMapping("/seller")
	public String sellerPage() {
		
		int memberNo = 18;
		
		return "seller/sellerPage";
	}
	
	
}
