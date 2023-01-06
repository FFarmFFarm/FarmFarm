package edu.kh.farmfarm.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.farmfarm.main.service.MainService;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Controller
public class MainController {
	
	@Autowired
	private MainService service;
	
	@GetMapping("/")
	public String mainPage(Model model){
		
		List<Post> postMap = service.getPostListAll();
		List<Product> productMap = service.getProductListAll();
		
		model.addAttribute("postMap", postMap);
		model.addAttribute("productMap", productMap);
		
		return "common/main";
	}
	
	@GetMapping("/error")
	public String errorPage(){
		return "common/error";
	}
	

}