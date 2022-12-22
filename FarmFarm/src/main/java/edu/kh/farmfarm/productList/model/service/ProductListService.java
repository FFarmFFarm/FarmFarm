package edu.kh.farmfarm.productList.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface ProductListService {

	/** 카테고리 목록 가져오기
	 * @return
	 */
	Map<String, Object> getCategoryList();

	/** 모든 상품 목록 불러오기
	 * @return
	 */
	List<Product> getProductListAll();

	
	/** 선택된 상품 목록 불러오기
	 * @param category 
	 * @return
	 */
	List<Product> getProductListChecked(int category);
	
	
}
