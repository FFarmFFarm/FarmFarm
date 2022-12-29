package edu.kh.farmfarm.postList.model.service;

import java.util.Map;

public interface PostListService {
	
	/** 카테고리 목록 가져오기
	 * @return
	 */
	Map<String, Object> getCategoryList();

	/** 모든 상품 목록 불러오기
	 * @return
	 */
	Map<String, Object> getPostListAll(int cp, String keyword, String sort, int soldOutFl);

	
	/** 선택된 상품 목록 불러오기
	 * @param category 
	 * @return
	 */
	Map<String, Object> getPostListChecked(int cp, String keyword, int category, String sort, int soldOutFl);

}
