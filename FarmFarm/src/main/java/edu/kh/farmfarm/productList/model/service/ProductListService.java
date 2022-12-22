package edu.kh.farmfarm.productList.model.service;

import java.util.Map;

public interface ProductListService {

	/** 카테고리 목록 가져오기
	 * @return
	 */
	Map<String, Object> getCategoryList();

	/** 모든 상품 목록 불러오기
	 * @return
	 */
	Map<String, Object> getProductListAll(int cp, String keyword);

	
	/** 선택된 상품 목록 불러오기
	 * @param category 
	 * @return
	 */
	Map<String, Object> getProductListChecked(int cp, String keyword, int category);
	
	
}
