package edu.kh.farmfarm.productDetail.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductDetailController {
	
	@GetMapping("/product/detail")
	public String myPageReview() {
		return "productDetail/productDetail";
	}
	

}
