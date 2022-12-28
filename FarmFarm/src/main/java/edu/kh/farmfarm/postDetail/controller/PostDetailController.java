package edu.kh.farmfarm.postDetail.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.service.PostDetailService;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@RequestMapping("/post")
@Controller
public class PostDetailController {
	
	@Autowired
	private PostDetailService service;
	
	@GetMapping("/{postNo}")
	public String post(
		@SessionAttribute(name = "loginMember", required = false) Member loginMember,
		@PathVariable("postNo") int postNo,
		Model model) {
	
		
	//	파라미터 담을 객체 생성
		Post post = service.selectPost(postNo);
		

		
	//	모델에 저장
		model.addAttribute("post", post);
		
		return "postDetail/postDetail";
	}

}
