package edu.kh.farmfarm.productDetail.model.service;

import java.util.List;
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

	/** 사진 리뷰 목록 조회
	 * @param productNo
	 * @return
	 */
	List<Review> selectImgReview(int productNo);

	/** 리뷰 도움돼요 추가
	 * @param map
	 * @return
	 */
	int addHelp(Map<String, Object> map);

	/** 리뷰 도움돼요 취소
	 * @param map
	 * @return
	 */
	int removeHelp(Map<String, Object> map);

}
