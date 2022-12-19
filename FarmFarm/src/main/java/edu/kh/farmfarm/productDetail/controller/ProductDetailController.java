package edu.kh.farmfarm.productDetail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.productDetail.model.service.ProductDetailService;

@Controller
public class ProductDetailController {
	
	@Autowired
	private ProductDetailService service;
	
	@GetMapping("/product/detail")
	public String myPageReview() {
		return "productDetail/productDetail";
	}
	

}
