package edu.kh.farmfarm.productAdmin.controller;

import java.util.HashMap;
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
			@RequestParam(value="productImage", required=false) List<MultipartFile> productImgList,
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
	
	
	// 팜팜상품 재고관리
	@GetMapping("/admin/stock")
	public String productStock(Model model,
		@RequestParam(value="cp", required=false, defaultValue="1")int cp) {
		
		Map<String, Object> map = service.selectProductList(cp);
		
		model.addAttribute("map", map);
		
		return "productAdmin/productStock";
	}
	
	// 판매자 재고 증가
	@ResponseBody
	@GetMapping("/admin/stockUp")
	public int stockUp(
			@RequestParam("stockUp") int productAmount,
			@RequestParam("productNo") int productNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("productAmount", productAmount);
		map.put("productNo", productNo);
		
		return service.stockUp(map);
	}
	
	// 판매자 재고 감소
	@ResponseBody
	@GetMapping("/admin/stockDown")
	public int stockDown(
			@RequestParam("stockDown") int productAmount,
			@RequestParam("productNo") int productNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("productAmount", productAmount);
		map.put("productNo", productNo);
		
		return service.stockDown(map);
	}
	
	// 상품삭제
	@ResponseBody
	@GetMapping("/admin/delete")
	public int deleteProduct(
			@RequestParam("productNo") int productNo) {

		return service.deleteProduct(productNo);
	}
	
	// 상품 수정페이지로 이동
	@GetMapping("/admin/update/{productNo}")
	public String updateProduct(
			@PathVariable("productNo") int productNo, Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		
		Product product = service.selectProductDetail(productNo);
		
		model.addAttribute("product", product);
		model.addAttribute("cp", cp);
		
		return "productAdmin/updateProduct";
	}
	
	
}
