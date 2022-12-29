package edu.kh.farmfarm.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.order.model.service.OrderService;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.ProductList;


@Controller
public class OrderController {
	
	@Autowired
	private OrderService service;
	
	
	@PostMapping("/return/{orderNo}")
	public String returnOrder(Return returnInfo, ProductList pList, 
			@RequestHeader(value = "referer") String referer, RedirectAttributes ra) {
			
		
		int result = service.insertReturn(returnInfo, pList.getPList());
		
		
		String path = null;
		String notice = null;
		
		if(result > 0) {
			path = "/myPage";
			notice = "반품 등록이 완료되었습니다.";
		} else {
			path = referer;
			notice = "반품 등록에 실패했습니다. 다시 시도해주세요.";
			
		}
		
		ra.addFlashAttribute("notice", notice);
		
		return "redirect:" + path;
	}

}
