package edu.kh.farmfarm.productList.model.service;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.category.model.vo.CategorySub;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productList.model.dao.ProductListDAO;

@Service
public class ProductListServiceImpl implements ProductListService {
	
	@Autowired
	private ProductListDAO dao;

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
	public List<Product> getProductListAll() {
		return dao.getProductListAll();
	}
}
