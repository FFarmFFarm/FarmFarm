package edu.kh.farmfarm.productList.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.productList.model.service.ProductListService;

@Controller
@SessionAttributes({"categoryList", "productMap"})
public class ProductListController {

	@Autowired
	private ProductListService service;
	
	// 팜팜마켓 페이지로 이동하기
	@GetMapping("/product/list")
	public String goProductListPage(
			Model model,
			@RequestParam(value = "keyword", required = false) String keyword, // 검색어
			@RequestParam(value = "category", required = false, defaultValue = "0") int category,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, // 현재 페이지
			@RequestParam(value = "sort", required = false, defaultValue = "rates") String sort // 정렬 옵션
			) {
		// 1. 모든 product 카테고리 리스트를 조회
		Map<String, Object> categoryList = service.getCategoryList();
		
		// 2. 가져온 카테고리 리스트를 세션에 올린다.
		model.addAttribute("categoryList", categoryList);
		
		// 3. 모든 product 리스트를 조회
		Map<String, Object> productMap;
		
		System.out.println("keyword : " + keyword);
		
		// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
		if(category == 0) {
			productMap = service.getProductListAll(cp, keyword, sort);
		} else {
			productMap = service.getProductListChecked(cp, keyword, category, sort);
		}
		
		// 4. 상품 리스트도 세션에 올린다.
		model.addAttribute("productMap", productMap);
		
		// 3. 페이지로 이동한다.
		return "productList/productList";
	}

	
	// 선택된 카테고리의 목록만 가져오기
	@GetMapping("/product/list/items")
	@ResponseBody
	public String getProductListChecked(
					@RequestParam(value = "keyword", required = false) String keyword, // 검색어
					@RequestParam(value = "category", required = false, defaultValue = "0") int category,
					@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, // 현재 페이지
					@RequestParam(value = "sort", required = false, defaultValue = "rates") String sort // 정렬 옵션
			) {
		
		System.out.println("cp : " + cp);
		
		// 상품 목록을 담을 배열 생성
		Map<String, Object> productMap;
			
		// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
		if(category == 0) {
			productMap = service.getProductListAll(cp, keyword, sort);
		} else {
			productMap = service.getProductListChecked(cp, keyword, category, sort);
		}
		
		// 반환하기
		return new Gson().toJson(productMap);
		
	}
}
