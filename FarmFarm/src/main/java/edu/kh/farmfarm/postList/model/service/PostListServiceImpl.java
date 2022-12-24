package edu.kh.farmfarm.postList.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.category.model.vo.CategorySub;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.postList.model.dao.PostListDAO;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.postDetail.model.vo.Post;

@Service
public class PostListServiceImpl implements PostListService {
	
	@Autowired
	private PostListDAO dao;
	
	/**
	 * 카테고리 목록 가져오기
	 */
	@Override
	public Map<String, Object> getCategoryList() {
		
		// 1. 카테고리 대분류
		List<Category> topCategoryList = dao.getTopCategoryList();
		
		// 2. 카테고리 과일
		List<CategorySub> fruitCategoryList = dao.getFruitCategoryList();

		// 3. 카테고리 채소
		List<CategorySub> vegetableCategoryList = dao.getVegetableCategoryList();
		
		// 3. 카테고리 채소
		List<CategorySub> ectCategoryList = dao.getEctCategoryList();
		
		// 3. category map 생성
		Map<String, Object> category = new HashMap<String, Object>();
		
		// 4. map에 값 집어넣기
		category.put("tops", topCategoryList);
		category.put("fruits", fruitCategoryList);
		category.put("vegetables", vegetableCategoryList);
		category.put("ects", ectCategoryList);
		
		// 5. map 반환
		return category;
	}
	

	/**
	 *  모든 상품 목록 가져오기
	 */
	@Override
	public Map<String, Object> getPostListAll(int cp, String keyword, String sort) {
		
		// 1. 전체 개수를 가져옴
		int listCount = dao.getCountAll();
		
		// 2. 가져온 개수와, 현재 페이지(cp)를 이용해서 페이지네이션 객체를 생성
		Pagination pagination = new Pagination(listCount, cp, 12);
		
		// 3. 페이지 네이션 객체를 생성해 목록 불러오기
		List<Post> postList = dao.getPostListAll(pagination, keyword, sort);
		
		// 4. 개행문자 처리(util - newLineClear)
		for(Post post : postList) {
			post.setPostContent(Util.newLineClear(post.getPostContent()));
		}
		
		// 5. 맵 만들기
		Map<String, Object> postMap = new HashMap<String, Object>();
		
		// 6. 맵에 값 담기
		postMap.put("postList", postList);
		postMap.put("pagination", pagination);
		
		return postMap;
	}


	/**
	 *  선택된 상품 목록 불러오기
	 */
	@Override
	public Map<String, Object> getPostListChecked(int cp, String keyword, int category, String sort) {
		
		// 1. 전체 개수를 가져옴
		int listCount = dao.getCountChecked(category);
		
		// 2. 가져온 개수와, 현재 페이지(cp)를 이용해서 페이지네이션 객체를 생성
		Pagination pagination = new Pagination(listCount, cp, 12);
		
		// 3. 페이지 네이션 객체를 생성해 목록 불러오기
		List<Post> postList = dao.getPostListChecked(pagination, keyword, category, sort);
		
		// 4. 개행문자 처리(util - newLineClear)
		for(Post post : postList) {
			post.setPostContent(Util.newLineClear(post.getPostContent()));
		}
		
		// 5. 맵 만들기
		Map<String, Object> postMap = new HashMap<String, Object>();
		
		// 6. 맵에 값 담기
		postMap.put("postList", postList);
		postMap.put("pagination", pagination);
		
		return postMap;
	}
}
