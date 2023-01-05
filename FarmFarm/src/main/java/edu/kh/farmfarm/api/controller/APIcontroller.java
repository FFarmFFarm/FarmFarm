package edu.kh.farmfarm.api.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.api.service.APIService;

@Controller
public class APIController {
	
	@Autowired
	private APIService service;
	
	@GetMapping("/recipe")
	public String recepie() throws Exception{
		String token = service.foodList();
		
		return "/recipe/recipe";
	}
	
}
