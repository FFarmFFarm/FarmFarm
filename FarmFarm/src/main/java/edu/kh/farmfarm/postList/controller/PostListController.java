package edu.kh.farmfarm.postList.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostListController {

	// 사고팔고 페이지로 이동하기
	@GetMapping("/post/list")
	public String goProductListPage() {
		return "postList/postList";
	}
	
}
