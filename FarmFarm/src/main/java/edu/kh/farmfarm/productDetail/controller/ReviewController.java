package edu.kh.farmfarm.productDetail.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.productDetail.model.service.ProductDetailService;
import edu.kh.farmfarm.productDetail.model.vo.Review;

@RestController
public class ReviewController {
	
	@Autowired
	private ProductDetailService service;
	
	
	/** 리뷰 상세 조회
	 * @param memberNo
	 * @param reviewNo
	 * @return
	 */
	@GetMapping("/review/select/{reviewNo}")
	public String reviewDetail(int memberNo, 
			@PathVariable("reviewNo")int reviewNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("memberNo", memberNo);
		map.put("reviewNo", reviewNo);
		
		Review review = service.selectReview(map);
		
		return new Gson().toJson(review);
	}
	
	/** 사진 리뷰 목록 조회
	 * @param productNo
	 * @return
	 */
	@GetMapping("/review/imgList")
	public String selectImgReview(int productNo) {
		
		List<Review> reviewList = service.selectImgReview(productNo);
		
		return new Gson().toJson(reviewList);
	}
	
	
	/** 도움돼요 추가
	 * @param loginMember
	 * @param reviewNo
	 * @return
	 */
	@GetMapping("/help/add")
	public int addHelp(@SessionAttribute("loginMember") Member loginMember, int reviewNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("memberNo", loginMember.getMemberNo());
		map.put("reviewNo", reviewNo);
		
		return service.addHelp(map);
	}
	
	/** 도움돼요 취소
	 * @param loginMember
	 * @param reviewNo
	 * @return
	 */
	@GetMapping("/help/remove")
	public int removeHelp(@SessionAttribute("loginMember") Member loginMember, int reviewNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("memberNo", loginMember.getMemberNo());
		map.put("reviewNo", reviewNo);
		
		return service.removeHelp(map);
	}
	
	@GetMapping("/review/select")
	public String selectReviewList(int productNo,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@RequestParam(name = "sortFl", required = false, defaultValue = "R") String sortFl,
			@RequestParam(name = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("productNo", productNo);
		paramMap.put("cp", cp);
		paramMap.put("sortFl", sortFl);
		
		if(loginMember != null) {
			paramMap.put("memberNo", loginMember.getMemberNo());	
		} else {
			paramMap.put("memberNo", 0);		
		}
		
		Map<String, Object> map = service.selectReviewList(paramMap);
		
		return new Gson().toJson(map);
	}

}
