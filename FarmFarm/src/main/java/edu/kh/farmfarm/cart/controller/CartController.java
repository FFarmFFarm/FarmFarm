package edu.kh.farmfarm.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.cart.model.service.CartService;

@Controller
public class CartController {

	@Autowired
	private CartService service;
	
	@GetMapping("/cart")
	public String cartPage() {
		
		return "order/cart";
	}
	
	
	
}
