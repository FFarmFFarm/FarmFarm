package edu.kh.farmfarm.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String mainPage(){
		return "common/main";
	}
	
	@GetMapping("/error")
	public String errorPage(){
		return "common/error";
	}


}