package edu.kh.farmfarm.productAdmin.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.productAdmin.model.service.ProductAdminService;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Controller
public class ProductAdminController {

	@Autowired
	private ProductAdminService service;
	
	// 팜팜 상품 등록페이지로 이동
	@GetMapping("/admin/enroll")
	public String enrollProduct() {

		return "productAdmin/enrollProduct";
	}
	
	// 팜팜 상품 등록
	@PostMapping("/admin/enroll")
	public String enrollProduct(Product product,
			@RequestParam(value="productImg", required=false) List<MultipartFile> productImgList,
			RedirectAttributes ra, HttpSession session,
			@RequestHeader("referer") String referer) throws Exception {
		
		String webPath = "/resources/images/product/detail/";
		
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		int productNo = service.enrollProduct(product, productImgList, webPath, folderPath);
		
		String message = null;
		String path = null;
		
		if(productNo>0) {
			message = "팜팜상품이 등록되었습니다.";
			path = "/product/" + productNo;
		}else {
			message = "팜팜상품 등록 실패";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
}
