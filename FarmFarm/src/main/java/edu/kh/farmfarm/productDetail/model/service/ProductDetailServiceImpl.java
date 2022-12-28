package edu.kh.farmfarm.productDetail.model.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Util;
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
	
	/** 리뷰 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectReviewList(Map<String, Object> paramMap) {
//		결과 담을 map 객체 생성
		Map<String, Object> map = new HashMap<String, Object>();
		
//		리뷰 수 조회하기
		int reviewCount = dao.reviewCount(paramMap);
		
		ReviewPagination pagination = new ReviewPagination(reviewCount, (int) paramMap.get("cp"));
		
//		리뷰 목록, 리뷰 이미지 목록 조회
		List<Review> reviewList = dao.selectReviewList(paramMap, pagination);
		

		
		map.put("reviewList", reviewList);
		map.put("pagination", pagination);
		
		
		return map;
	}
	
	/** 리뷰 수정
	 *
	 */
	@Override
	public int updateReview(String webPath, String folderPath, Review review, List<MultipartFile> imageList,
			String deleteList) throws Exception {
		
		review.setReviewContent(Util.XSSHandling(review.getReviewContent()));
		review.setReviewContent(Util.newLineHandling(review.getReviewContent()));
		
		int result = dao.updateReview(review);
		
		if(result > 0) {
			
			if(!deleteList.equals("")) {
				
				String condition = "WHERE REVIEW_NO = " + review.getReviewNo()
					+ "AND REVIEW_IMG_ORDER IN("+ deleteList +")";
				
				result = dao.deleteReviewImg(condition);
				
				if(result == 0) {
					throw new Exception("후기 이미지 삭제 실패");
				}
				
			}
			
			List<ReviewImg> reviewImgList = new ArrayList<ReviewImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<imageList.size(); i++) {
				
				
				if(imageList.get(i).getSize() > 0) {
					
					ReviewImg img = new ReviewImg();
					
					String rename = Util.fileRename(imageList.get(i).getOriginalFilename());
					
					renameList.add(rename);
					
					img.setReviewImgPath(webPath + rename);
					
					img.setReviewImgOrder(i);
					
					img.setReviewNo(review.getReviewNo());
					
					reviewImgList.add(img);
					
					result = dao.updateReviewImg(img);
					
					if(result == 0) {
						result = dao.insertReviewImg(img);
						
						if(result == 0) {
							throw new Exception("후기 이미지 수정/삽입 예외");
						}
					}
					
				}
				
			}
			
			if(!reviewImgList.isEmpty()) {
				
				for(int i=0; i<reviewImgList.size(); i++) {
					
					int index = reviewImgList.get(i).getReviewImgOrder();
					
					imageList.get(index).transferTo(new File(folderPath + renameList.get(i)));
					
				}
				
			}
			
			
		}
		
		
		return result;
	}
	
	
	
	/** 리뷰 삭제
	 *
	 */
	@Override
	public int deleteReview(int reviewNo) {
		return dao.deleteReview(reviewNo);
	}
	
}
