package edu.kh.farmfarm.postList.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.postList.model.service.PostListService;

@Controller
@SessionAttributes("loginMember")
public class PostListController {
		
		@Autowired
		private PostListService service;
	
		// 사고팔고 페이지로 이동하기
		@GetMapping("/post/list")
		public String goPostListPage(
				Model model,
				@RequestParam(value = "keyword", required = false) String keyword, // 검색어
				@RequestParam(value = "category", required = false, defaultValue = "0") int category,
				@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, // 현재 페이지
				@RequestParam(value = "sort", required = false, defaultValue = "views") String sort, // 정렬 옵션
				@RequestParam(value = "exceptFl", required = false, defaultValue = "1") int soldOutFl // 품절상품 제외하기 옵션
				) {
			
			// 1. 입력받은 모든 파라미터에서 특수문자를 제거함
			keyword = Util.replaceSpecialSymbol(keyword);
			
			sort = Util.replaceSpecialSymbol(sort);
			
			// 2. 모든 post 카테고리 리스트를 조회
			Map<String, Object> categoryList = service.getCategoryList();
			
			// 3. 가져온 카테고리 리스트를 세션에 올린다.
			model.addAttribute("categoryList", categoryList);
			
			// 4. 모든 post 리스트를 조회
			Map<String, Object> postMap;
			
			// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
			if(category == 0) {
				postMap = service.getPostListAll(cp, keyword, sort, soldOutFl);
			} else {
				postMap = service.getPostListChecked(cp, keyword, category, sort, soldOutFl);
			}
			
			// 5. 상품 리스트도 세션에 올린다.
			model.addAttribute("postMap", postMap);
			
			// 6. 페이지로 이동한다.
			return "postList/postList";
		}

		
		// 선택된 카테고리의 목록만 가져오기
		@GetMapping("/post/list/items")
		@ResponseBody
		public String getPostListChecked(
						@RequestParam(value = "keyword", required = false) String keyword, // 검색어
						@RequestParam(value = "category", required = false, defaultValue = "0") int category,
						@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, // 현재 페이지
						@RequestParam(value = "sort", required = false, defaultValue = "rates") String sort, // 정렬 옵션
						@RequestParam(value = "exceptFl", required = false, defaultValue = "1") int soldOutFl // 품절상품 제외하기 옵션
				) {
			
			// 1. 입력받은 모든 파라미터에서 특수문자를 제거함
			keyword = Util.replaceSpecialSymbol(keyword);
			sort = Util.replaceSpecialSymbol(sort);
			
			// 2. 상품 목록을 담을 배열 생성
			Map<String, Object> postMap;
			
			// 입력받은 카테고리가 있으면 해당 카테고리만 가져오고, 없으면 전부 다 불러오기
			if(category == 0) {
				postMap = service.getPostListAll(cp, keyword, sort, soldOutFl);
			} else {
				postMap = service.getPostListChecked(cp, keyword, category, sort, soldOutFl);
			}
			
			// 3. 반환하기
			return new Gson().toJson(postMap);
			
		}
	
}
