package edu.kh.farmfarm.api.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.farmfarm.api.service.APIService;
import edu.kh.farmfarm.api.vo.APIVO;

@Controller
public class APIController {
	
	@Autowired
	private APIService service;
	
	@GetMapping("/recipe")
	public String recepie(
			Model model, 
			@RequestParam(name="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> pm
			) throws Exception{
		
		List<APIVO> apiList = service.foodList(cp);
		
		model.addAttribute("apiList", apiList);
		
		return "/recipe/recipe";
	}
	
}
