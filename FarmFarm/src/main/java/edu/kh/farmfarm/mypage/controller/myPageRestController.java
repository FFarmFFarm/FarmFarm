package edu.kh.farmfarm.mypage.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	/** 주문 내역 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	@GetMapping("/order/list")
	public String selectOrderList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectOrderList(loginMember, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	/** 작성 후기 목록 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	@GetMapping("/review/list")
	public String selectReviewList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectReviewList(loginMember, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	/** 작성 게시글 목록 조회
	 * @param loginMember
	 * @param cp
	 * @param sortFl
	 * @return
	 */
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
	
	/** 작성 댓글 목록 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	@GetMapping("/comment/list")
	public String selectCommentList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		
		Map<String, Object> map = service.selectCommentList(memberNo, cp);
		
		
		return new Gson().toJson(map);
	}
	
	/** 찜 목록 조회
	 * @param loginMember
	 * @param cp
	 * @return
	 */
	@GetMapping("/wish/list")
	public String selectWishList(
			@SessionAttribute("loginMember")Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		int memberNo = loginMember.getMemberNo();
		
		
		Map<String, Object> map = service.selectWishList(memberNo, cp);
		
		
		return new Gson().toJson(map);
	}
	
	
	/** 프로필 배경 이미지 변경
	 * @param mypageImg
	 * @param loginMember
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/myPage/bgImg")
	public int updateBgImg(@RequestParam(value="mypageImg") MultipartFile mypageImg, 
			@SessionAttribute("loginMember") Member loginMember,
			HttpServletRequest req) throws Exception {
		
		
		String webPath = "/resources/images/myPage/background/";
		
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
		
		
		return service.updateBgImg(webPath, filePath, mypageImg, loginMember);
	}
	
	/** 기본 배경이미지로 변경
	 * @param loginMember
	 * @return
	 */
	@PutMapping("/myPage/bgImg")
	public int defaultBgImg(@SessionAttribute("loginMember") Member loginMember) {
		
		loginMember.setMypageImg("/resources/images/default/bgImg.png");
		
		return service.defaultBgImg(loginMember);
	}

	
	/** 구매 확정
	 * @param orderNo
	 * @return
	 */
	@GetMapping("/order/{orderNo}/confirm")
	public int orderConfirm(@PathVariable("orderNo") int orderNo) {
		
		return service.orderConfirm(orderNo);
	}
	
	/** 후기 등록
	 * @param review
	 * @param reviewContent
	 * @param loginMember
	 * @param req
	 * @param imageList
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/review")
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
	
	
	/** 찜 목록 삭제
	 * @param loginMember
	 * @param productNo
	 * @return
	 */
	@DeleteMapping("/wish/{productNo}")
	public int deleteWish(@SessionAttribute("loginMember") Member loginMember,
			@PathVariable("productNo") int productNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("productNo", productNo);
		map.put("memberNo", loginMember.getMemberNo());
		
		return service.deleteWish(map);
	}
	

}
