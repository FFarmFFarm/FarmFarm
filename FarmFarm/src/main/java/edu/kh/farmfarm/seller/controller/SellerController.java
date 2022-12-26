package edu.kh.farmfarm.seller.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.seller.model.service.SellerService;

@SessionAttributes({"loginMember"})
@Controller
public class SellerController {

	@Autowired
	private SellerService service;
	
	
	// 판매자 정보 페이지로 이동
	@GetMapping("/seller/{memberNo}")
	public String sellerPage(Model model,
			@PathVariable("memberNo") int memberNo,
			@RequestParam(value="cp", required=false, defaultValue="1")int cp) {
		
		Member memberInfo = service.selectMemberInfo(memberNo);
		
		memberInfo.setMemberNo(memberNo);
		
		model.addAttribute("memberInfo", memberInfo);
		
		Map<String, Object> map = service.selectPostList(cp, memberNo);
		
		model.addAttribute("map", map);
		
		return "seller/sellerPage";
	}
	
	
	// 상품 등록 페이지로 이동
	@GetMapping("/post/enroll")
	public String enrollPost() {
		return "seller/enrollPost";
	}
	
	
	// 상품 등록
	@PostMapping("/post/enroll")
	public String enrollPost(Post post,
			@RequestParam(value="postImg", required=false) List<MultipartFile> postImgList,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra, HttpSession session,
			@RequestHeader("referer") String referer
			) throws IOException {
		
		post.setMemberNo(loginMember.getMemberNo());
		
		String webPath = "/resources/images/post/postDetail/";
		
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		int postNo = service.enrollPost(post, postImgList, webPath, folderPath);
		
		String message = null;
		String path = null;
		
		if(postNo>0) {
			message = "판매상품이 등록되었습니다.";
			path = "/post/" + postNo;
		}else {
			message = "상품 등록 실패";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
		
	}
	
	// 상품판매완료처리
	@ResponseBody
	@GetMapping("/post/soldout")
	public int soldoutPost(
			@RequestParam("postNo") int postNo) {

		return service.soldoutPost(postNo);
	}
	
	
	// 상품삭제
	@ResponseBody
	@GetMapping("/post/delete")
	public int deletePost(
			@RequestParam("postNo") int postNo) {

		return service.deletePost(postNo);
	}
	
	
	// 판매글 수정페이지로 이동
	@GetMapping("/post/{postNo}/update")
	public String updatePost(
			@PathVariable("postNo") int postNo, Model model) {
		
		Post post = service.selectPostDetail(postNo);
		
		post.setPostContent(Util.newLineClear(post.getPostContent()));
		
		model.addAttribute("post", post);
		
		return "seller/updatePost";
	}
	
	
	
	// 판매글 수정
	@PostMapping("/post/{postNo}/update")
	public String updatePost(
			Post post,
			@PathVariable("postNo") int postNo,
			@RequestParam(value="deleteList", required=false) String deleteList,
			@RequestParam(value="postImg", required=false) List<MultipartFile> postImgList,
			@RequestHeader("referer") String referer,
			HttpSession session) throws Exception {
		
		post.setPostNo(postNo);
		
		String webPath = "/resources/images/post/postDetail/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		int result = service.postUpdate(post, postImgList, webPath, folderPath, deleteList);
		
		String path = null;
		
		if(result>0) {
			path= "/post/"+postNo;
		}else {
			path= referer;
		}
		
		return "redirect:" + path;
	}
	
	
	
}
