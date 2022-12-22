package edu.kh.farmfarm.seller.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.seller.model.service.SellerService;

@SessionAttributes({"loginMember"})
@Controller
public class SellerController {

	@Autowired
	private SellerService service;
	
	@GetMapping("/seller")
	public String sellerPage(Model model,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value="cp", required=false, defaultValue="1")int cp) {
		
		int memberNo = loginMember.getMemberNo();
		
		Member memberInfo = service.selectMemberInfo(memberNo);
		
		model.addAttribute("memberInfo", memberInfo);
		
		Map<String, Object> map = service.selectPostList(cp, memberNo);
		
		model.addAttribute("map", map);
		
		return "seller/sellerPage";
	}
	
	@GetMapping("/post/enroll")
	public String enrollPost() {
		return "seller/enrollPost";
	}
	
	@PostMapping("/post/enroll")
	public String enrollPost(
			@RequestParam(value="postImg", required=false) List<MultipartFile> postImgList,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra, HttpSession session,
			@RequestHeader("referer") String referer
			) {
		
		
		
		
		String path=null;
		
		return "redirect:" + path;
		
	}
	
}
