package edu.kh.farmfarm.mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.service.MyPageService;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("/myPage")
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	
	/** 마이페이지 이동(주문목록)
	 * @return
	 */
	@GetMapping("")
	public String myPage(
			@SessionAttribute("loginMember")Member loginMember,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectOrderList(loginMember, cp);
		
		model.addAttribute("map", map);
		
		return "myPage/myPageOrder";
	}
	
	
	

	/** 마이페이지 작성 후기
	 * @return
	 */
	@GetMapping("/review")
	public String myPageReview(
			@SessionAttribute("loginMember")Member loginMember,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		
		Map<String, Object> map = service.selectReviewList(loginMember, cp);
		
		model.addAttribute("map", map);
		
		return "myPage/myPageReview";
	}
	
	
	
	
	/** 마이패이지 작성 게시글
	 * @return
	 */
	@GetMapping("/board")
	public String myPageBoard(
		@SessionAttribute("loginMember")Member loginMember, 
		Model model,
		@RequestParam(value="cp", required=false, defaultValue = "1") int cp,
		@RequestParam(name ="sortFl", required = false, defaultValue="N") String sortFl) {
	
		
	Map<String, Object> paramMap = new HashMap<String, Object>();
	paramMap.put("memberNo", loginMember.getMemberNo());
	paramMap.put("sortFl", sortFl);
	          
	Map<String, Object> map = service.selectBoardList(paramMap, cp);
	
	

	model.addAttribute("map", map);

	
	return "myPage/myPageBoard";
	}
	
	
	
	/** 마이페이지 작성 댓글
	 * @param model
	 * @param cp
	 * @return
	 */
	@GetMapping("/comment")
	public String myPageComment(
			@SessionAttribute("loginMember")Member loginMember, 
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp) {
		

		int memberNo = loginMember.getMemberNo();
		          
		Map<String, Object> map = service.selectCommentList(memberNo, cp);
		
		
		

		model.addAttribute("map", map);

		
		return "myPage/myPageComment";
	}
	
	
	
	/** 마이페이지 찜목록
	 * @return
	 */
	@GetMapping("/wishList")
	public String myPageWishList(
			@SessionAttribute("loginMember")Member loginMember, 
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp) {
		

		int memberNo = loginMember.getMemberNo();
		          
		Map<String, Object> map = service.selectWishList(memberNo, cp);
		
		
		

		model.addAttribute("map", map);

		
		return "myPage/myPageWish";
	}
	
	
	/** 마이페이지 프로필 
	 * @return
	 */
	@GetMapping("/profile")
	public String myPageProfile(
			@SessionAttribute("loginMember")Member loginMember,
			Model model) {
		
		return "myPage/myPageProfile";
	}
	
	/** 마이페이지 비밀번호 변경 이동  
	 * @return
	 */
	@GetMapping("/updatePw")
	public String myPageUpdatePw(
			@SessionAttribute("loginMember")Member loginMember,
			Model model) {
		
		return "myPage/myPageUpdatePw";
	}
	
	/** 마이페이지 비밀번호 변경  
	 * @return
	 */
	@PostMapping("/updatePw")
	public String updatePw(
			@RequestParam Map<String, Object> map,
			RedirectAttributes ra,
			@SessionAttribute("loginMember") Member loginMember
			){
		map.put("memberNo", loginMember.getMemberNo());
		
		int result = service.updatePw(map);
		
		
		String message = null;
		
		if(result>0) { // 비밀번호 변경 성공
			message = "비밀번호 변경 성공";
		}else {
			message = "현재 비밀번호가 일치하지 않습니다.";
		}
		
		ra.addFlashAttribute("message", message);

		return "redirect:updatePw";
	}
	
	
	
	/** 마이페이지 프로필수정_이미지  
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/myPageImage")
	public String updateImage(
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value = "farmfarm") MultipartFile farmfarm,
			RedirectAttributes ra,
			HttpServletRequest req
			) throws Exception{
		
		String webPath = "/resources/images/myPage/profile/";

		String folderPath = req.getSession().getServletContext().getRealPath(webPath);
		
		int result = service.updateImage(webPath, folderPath, loginMember, farmfarm);
		
		String message = null;
		
		if(result>0) {

			message = "프로필 이미지가 변경되었습니다.";
		}
		else {		message = "프로필 이미지 변경이 실패했습니다.";}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:profile";
	}
	
	/** 마이페이지 프로필수정_정보 
	 * @return
	 */
	@PostMapping("/myPageProfile")
	public String updateProfile(
			@SessionAttribute("loginMember") Member loginMember,
			Member inputMember,
			RedirectAttributes ra, String[] memberAddress
			) {
		inputMember.setMemberNo(loginMember.getMemberNo());
		int result = service.updateProfile(inputMember, memberAddress);
		
		String message = null;
		
		if(result > 0) {
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			message = "프로필 수정 완료";
		} else {
			message="프로필 수정 실패";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:profile";
	}
	
	
	/** 마이페이지 회원 탈퇴 
	 * @return
	 */
	@PostMapping("/secession")
	public String secession(
			String memberPw,
			SessionStatus status,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra,
			@RequestHeader("referer") String referer) {
		
		int result = service.secession(memberPw, loginMember.getMemberNo());
		
		String message = null;
		String path = null;
		
		if(result > 0) { // 탈퇴 성공
			message = "탈퇴 성공";
			path = "/";
			status.setComplete();
		}else {
			message = "비밀번호가 일치하지 않습니다.";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	

}
