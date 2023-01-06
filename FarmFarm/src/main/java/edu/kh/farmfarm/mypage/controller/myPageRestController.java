package edu.kh.farmfarm.mypage.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.service.MyPageService;
import edu.kh.farmfarm.productDetail.model.vo.Review;

@RestController
public class myPageRestController {
	
	@Autowired
	private MyPageService service;
	
	@GetMapping("/order/list")
	public String selectOrderList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectOrderList(loginMember, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	@GetMapping("/review/list")
	public String selectReviewList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectReviewList(loginMember, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	@GetMapping("/board/list")
	public String selectBoardList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp,
			@RequestParam(name ="sortFl", required = false, defaultValue="N") String sortFl
			) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("memberNo", loginMember.getMemberNo());
		paramMap.put("sortFl", sortFl);
	
		
		
		Map<String, Object> map = service.selectBoardList(paramMap, cp);
		
		
		return new Gson().toJson(map);
	}
	
	@GetMapping("/comment/list")
	public String selectCommentList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		
		Map<String, Object> map = service.selectCommentList(memberNo, cp);
		
		
		return new Gson().toJson(map);
	}
	
	@GetMapping("/wish/list")
	public String selectWishList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		
		Map<String, Object> map = service.selectWishList(memberNo, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	@PostMapping("/myPage/update/bgImg")
	public int updateBgImg(@RequestParam(value="mypageImg") MultipartFile mypageImg, 
			@SessionAttribute("loginMember") Member loginMember,
			HttpServletRequest req) throws Exception {
		
		
		String webPath = "/resources/images/myPage/background/";
		
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
		
		
		return service.updateBgImg(webPath, filePath, mypageImg, loginMember);
	}
	
	@GetMapping("/myPage/default/bgImg")
	public int defaultBgImg(@SessionAttribute("loginMember") Member loginMember) {
		
		loginMember.setMypageImg("/resources/images/default/bgImg.png");
		
		return service.defaultBgImg(loginMember);
	}

	
	@GetMapping("/order/confirm")
	public int orderConfirm(int orderNo) {
		
		return service.orderConfirm(orderNo);
	}
	
	@PostMapping("/review/write")
	public int writeReview(Review review, String reviewContent,
			@SessionAttribute("loginMember") Member loginMember,
			HttpServletRequest req,
			@RequestParam(value="reviewImg", required = false) List<MultipartFile> imageList

			) throws IOException {
		
		review.setMemberNo(loginMember.getMemberNo());
		
		String webPath = "/resources/images/product/review/";
		
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
		
		int result = service.writeReview(webPath, filePath, review, imageList);
		
		
		return result;
	}
	
	
	@GetMapping("/wish/delete")
	public int deleteWish(@SessionAttribute("loginMember") Member loginMember,
			int productNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		
		return service.deleteWish(map);
	}
	

}
