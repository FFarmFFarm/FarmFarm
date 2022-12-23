package edu.kh.farmfarm.productDetail.model.service;

import java.util.Map;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.Review;

public interface ProductDetailService {


	/** 팜팜 상품 조회
	 * @param param
	 * @return
	 */
	Map<String, Object> selectProduct(Product param);

	/** 상품 찜하기
	 * @param map
	 * @return
	 */
	int addWish(Product product);

	/** 상품 찜 취소
	 * @param map
	 * @return
	 */
	int removeWish(Product product);

	/** 리뷰 상세 조회
	 * @param map
	 * @return
	 */
	Review selectReview(Map<String, Object> map);

}
