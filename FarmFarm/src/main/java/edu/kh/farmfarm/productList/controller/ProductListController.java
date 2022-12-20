package edu.kh.farmfarm.productList.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductListController {
	
	// 상품 목록 페이지로 이동하기
	@GetMapping("/product/list")
	public String goProductListPage() {
		return "product/list";
	}
}
