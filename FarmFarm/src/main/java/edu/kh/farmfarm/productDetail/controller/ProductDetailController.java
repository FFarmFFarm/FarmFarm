package edu.kh.farmfarm.productDetail.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.service.ProductDetailService;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.Review;

@Controller
public class ProductDetailController {
	
	@Autowired
	private ProductDetailService service;
	
	/** 상품 판매페이지로 이동
	 * @param loginMember
	 * @param productNo
	 * @param model
	 * @param sortFl
	 * @return
	 */
	@GetMapping("/product/{productNo}")
	public String myPageReview(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@PathVariable("productNo") int productNo,
			Model model,
			@RequestParam(name = "sortFl", required = false, defaultValue = "R") String sortFl) {
		
//		파라미터 담을 객체 생성
		Product param = new Product();
		
		param.setProductNo(productNo);
		param.setSortFl(sortFl);
		
		if(loginMember == null) {
			param.setMemberNo(0);
		} else {
			param.setMemberNo(loginMember.getMemberNo());
		}
		
//		상품, 상품 상세 이미지, 리뷰 목록, 리뷰 이미지 조회
		Map<String, Object> map = service.selectProduct(param);
		
//		모델에 저장
		model.addAttribute("map", map);
		
		return "productDetail/productDetail";
	}
	
	
	/** 찜하기
	 * @param productNo
	 * @param memberNo
	 * @return
	 */
	@GetMapping("/wish/add")
	@ResponseBody
	public int addWish(int productNo, int memberNo) {
		
		Product product = new Product();
		product.setProductNo(productNo);
		product.setMemberNo(memberNo);
		
		return service.addWish(product);
	}
	
	/** 찜 취소하기
	 * @param productNo
	 * @param memberNo
	 * @return
	 */
	@GetMapping("/wish/remove")
	@ResponseBody
	public int removeWish(int productNo, int memberNo) {
		
		Product product = new Product();
		product.setProductNo(productNo);
		product.setMemberNo(memberNo);
		
		return service.removeWish(product);
	}
	
	/** 재고 확인
	 * @param productNo
	 * @return
	 */
	@GetMapping("/product/stock")
	@ResponseBody
	public int productStock(int productNo) {
		
		int stock = service.productStock(productNo);
		
		return stock;
	}


}
