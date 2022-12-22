package edu.kh.farmfarm.productList.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productList.model.service.ProductListService;

@Controller
@SessionAttributes({"categoryList", "productMap"})
public class ProductListController {

	@Autowired
	private ProductListService service;
	
	// 팜팜마켓 페이지로 이동하기
//	@GetMapping("/product/list")
//	public String goProductListPage(
//			Model model
//			) {
//		// 1. 모든 product 카테고리 리스트를 조회
//		Map<String, Object> categoryList = service.getCategoryList();
//		
//		// 2. 가져온 카테고리 리스트를 세션에 올린다.
//		model.addAttribute("categoryList", categoryList);
//		
//		// 3. 모든 product 리스트를 조회
//		List<Product> productMap = service.getProductListAll();
//		
//		// 4. 상품 리스트도 세션에 올린다.
//		model.addAttribute("productMap", productMap);
//		
//		// 3. 페이지로 이동한다.
//		return "productList/productList";
//	}
	
	// 팜팜마켓 페이지로 이동하기
	@GetMapping("/product/list")
	public String goProductListPage(
			Model model,
			@RequestParam(value = "category", required = false, defaultValue = "0") int category
			) {
		// 1. 모든 product 카테고리 리스트를 조회
		Map<String, Object> categoryList = service.getCategoryList();
		
		// 2. 가져온 카테고리 리스트를 세션에 올린다.
		model.addAttribute("categoryList", categoryList);
		
		// 3. 모든 product 리스트를 조회
		List<Product> productMap;
		
		// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
		if(category == 0) {
			productMap = service.getProductListAll();
		} else {
			productMap = service.getProductListChecked(category);
		}
		
		// 4. 상품 리스트도 세션에 올린다.
		model.addAttribute("productMap", productMap);
		
		// 3. 페이지로 이동한다.
		return "productList/productList";
	}

	// 상품 목록 가져오기
//	@GetMapping("/product/list/all")
//	@ResponseBody
//	public String getproductList() {
//		
//		// 모든 상품 목록 가져오기
//		List<Product> productMap = service.getProductListAll();
//		
//		// 반환하기
//		return new Gson().toJson(productMap);
//		
//	}
	
	// 선택된 카테고리의 목록만 가져오기
	@GetMapping("/product/list/items")
	@ResponseBody
	public String getProductListChecked(
					@RequestParam(value = "checkedCategory", required = false, defaultValue = "0") int category
			) {
		
		// 상품 목록을 담을 배열 생성
		List<Product> productMap;
		
		// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
		if(category == 0) {
			productMap = service.getProductListAll();
		} else {
			productMap = service.getProductListChecked(category);
		}
		
		// 해당 상품 목록 가져오기
		// List<Product> productMap = service.getProductListChecked(category);
		
		// 반환하기
		return new Gson().toJson(productMap);
		
	}
}
