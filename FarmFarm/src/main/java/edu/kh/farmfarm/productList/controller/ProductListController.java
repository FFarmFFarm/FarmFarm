package edu.kh.farmfarm.productList.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.farmfarm.productList.model.service.ProductListService;

@Controller
public class ProductListController {
	
	
	@Autowired
	private ProductListService service;
	
	// 팜팜마켓 페이지로 이동하기
	@GetMapping("/product/list")
	public String goProductListPage() {
		return "productList/productList";
	}

	// 상품 목록 가져오기
	@GetMapping("/product/list")
	@ResponseBody
	public String getproductList() {
		
		// 모든 목록 가져오기
		
		
		// 세션에 올리기
		
		
		// 페이지 이동
		return "productList/productList";
	}
	
}
