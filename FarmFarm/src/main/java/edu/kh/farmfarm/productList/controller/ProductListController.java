package edu.kh.farmfarm.productList.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productList.model.service.ProductListService;

@Controller
@SessionAttributes("categoryList")
public class ProductListController {
	
	
	@Autowired
	private ProductListService service;
	
	// 팜팜마켓 페이지로 이동하기
	@GetMapping("/product/list")
	public String goProductListPage(Model model) {
		
		// 1. 모든 product 카테고리 리스트를 조회
		List<Category> categoryList = service.getCategoryList();
		
		// 2. 가져온 카테고리 리스트를 세션에 올린다.
		model.addAttribute("categoryList", categoryList);
		
		// 3. 페이지로 이동한다.
		return "productList/productList";
	}

	// 상품 목록 가져오기
	@GetMapping("/product/list/all")
	@ResponseBody
	public String getproductList() {
		
		// 모든 상품 목록 가져오기
		List<Product> productList = service.getProductListAll();
		
		// 반환하기
		return new Gson().toJson(productList);
		
	}
	
}
