package edu.kh.farmfarm.productDetail.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.productDetail.model.dao.ProductDetailDAO;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.Review;
import edu.kh.farmfarm.productDetail.model.vo.ReviewImg;
import edu.kh.farmfarm.productDetail.model.vo.ReviewPagination;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{
	
	@Autowired
	private ProductDetailDAO dao;
	
	/** 상품 상세 조회
	 *
	 */
	@Override
	public Map<String, Object> selectProduct(Product param) {
		
//		결과 담을 map 객체 생성
		Map<String, Object> map = new HashMap<String, Object>();
		
//		상품, 상품 이미지 조회해오기
		Product product = dao.selectProduct(param);
		
		
//		리뷰 수 조회하기
		int reviewCount = dao.reviewCount(param);
		
		
		ReviewPagination pagination = new ReviewPagination(reviewCount, 1);
		
//		리뷰 목록, 리뷰 이미지 목록 조회
		List<Review> reviewList = dao.selectReviewList(param, pagination);
		

		
		map.put("product", product);
		map.put("reviewList", reviewList);
		map.put("pagination", pagination);
		map.put("reviewCount", reviewCount);
		
		
		return map;
	}
	
	
	/** 찜하기
	 *
	 */
	@Override
	public int addWish(Product product) {
		return dao.addWish(product);
	}
	
	/** 찜 취소
	 *
	 */
	@Override
	public int removeWish(Product product) {
		return dao.removeWish(product);
	}
	
	/** 리뷰 상세조회
	 *
	 */
	@Override
	public Review selectReview(Map<String, Object> map) {
		return dao.selectReview(map);
	}
	
	/** 사진 리뷰 목록 조회
	 *
	 */
	@Override
	public List<Review> selectImgReview(int productNo) {
		return dao.selectImgReview(productNo);
	}

	/** 리뷰 도움돼요 추가
	 *
	 */
	@Override
	public int addHelp(Map<String, Object> map) {
		return dao.addHelp(map);
	}
	
	
	/** 리뷰 도움돼요 취소
	 *
	 */
	@Override
	public int removeHelp(Map<String, Object> map) {
		return dao.removeHelp(map);
	}
}
