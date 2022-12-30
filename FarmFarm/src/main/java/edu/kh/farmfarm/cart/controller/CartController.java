package edu.kh.farmfarm.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.farmfarm.cart.model.service.CartService;
import edu.kh.farmfarm.cart.model.vo.Cart;

@Controller
public class CartController {

	@Autowired
	private CartService service;
	
	// 장바구니로 이동
	@GetMapping("/cart")
	public String cartPage() {
		
		return "order/cart";
	}
	
	// 장바구니에 추가
	@ResponseBody
	@GetMapping("/addCart")
	public int addCart(
		@RequestParam("productNo") int productNo,
		@RequestParam("productAmount") int productAmount,
		@RequestParam("memberNo") int memberNo		
		) {

		Cart cart = new Cart();
		
		cart.setProductNo(productNo);
		cart.setProductAmount(productAmount);
		cart.setMemberNo(memberNo);
		
		
		return service.addCart(cart);
	}
	
	// 장바구니에 수량추가
	@ResponseBody
	@PostMapping("/addCart")
	public int addCartUp(
			@RequestParam("productNo") int productNo,
			@RequestParam("productAmount") int productAmount,
			@RequestParam("memberNo") int memberNo		
			) {
		
		Cart cart = new Cart();
		
		cart.setProductNo(productNo);
		cart.setProductAmount(productAmount);
		cart.setMemberNo(memberNo);
		
		
		return service.addCartUp(cart);
	}
	
	
	
}
