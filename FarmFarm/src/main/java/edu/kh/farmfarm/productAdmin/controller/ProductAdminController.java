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

import com.google.gson.Gson;

import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.vo.Return;
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
		@RequestParam(value="cp", required=false, defaultValue="1")int cp,
		@RequestParam Map<String, Object> pm) {
		
		if(pm.get("key") == null) { // 검색 아닌 경우
			
			Map<String, Object> map = service.selectProductList(cp);
			
			model.addAttribute("map", map);
			
		} else { // 검색인 경우
			
			Map<String, Object> map = service.selectProductList(pm, cp);

			model.addAttribute("map", map);
		}
		
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
	
	// 상품 수정
	@PostMapping("/admin/update/{productNo}")
	public String updateProduct(Product product,
			@PathVariable("productNo") int productNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="deleteList", required=false) String deleteList,
			@RequestParam(value="productImage", required=false) List<MultipartFile> productImgList,
			@RequestHeader("referer") String referer,
			RedirectAttributes ra,
			HttpSession session) throws Exception {
		
		product.setProductNo(productNo);
			
		String webPath = "/resources/images/product/detail/";
		
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		int result = service.updateProduct(product, productImgList, webPath, folderPath, deleteList);
		
		String path = null;
		String message = null;
		
		if(result>0) {
			message = "팜팜상품이 수정되었습니다.";
			path = "/admin/stock/?cp=" +cp;
		}else {
			message = "팜팜상품 수정 실패";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	
	// 판매완료
	@ResponseBody
	@GetMapping("/admin/soldout")
	public int soldoutProduct(
			@RequestParam("pStatus") String pStatus,
			@RequestParam("productNo") int productNo) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pStatus", pStatus);
			map.put("productNo", productNo);
		
		return service.soldoutProduct(map);
	}
	
	
	// 주문리스트 관리
	@GetMapping("/admin/orderList")
	public String orderList(Model model,
		@RequestParam(value="cp", required=false, defaultValue="1")int cp) {
		
			
		Map<String, Object> map = service.selectOrderList(cp);
		
		model.addAttribute("map", map);
			
				
		return "productAdmin/productOrderList";
	}
	
	
	// 기간 조회 + 기간 내 검색 주문리스트
	@ResponseBody
	@GetMapping("/admin/orderList/period")
	public String searchPeriod(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam Map<String, Object> pm
			) {
		
		Map<String, Object> orderMap = service.selectOrderList(pm, cp);
		
		
		return new Gson().toJson(orderMap);
	}
	
	
	
	// 주문 상세조회
	@ResponseBody
	@GetMapping("/admin/orderDetail")
	public String orderDetail(int orderNo) {
		
		Order order = service.selectOrderDetail(orderNo);
		
		return new Gson().toJson(order);
	}
	
	// 판매완료
	@ResponseBody
	@GetMapping("/admin/orderStatus")
	public int orderStatus(
		@RequestParam("oStatus") String oStatus,
		@RequestParam("orderNo") int orderNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("oStatus", oStatus);
		map.put("orderNo", orderNo);
		
		return service.orderStatus(map);
	}
	
	
	// 송장 등록
	@ResponseBody
	@GetMapping("/admin/enrollInvoice")
	public int enrollInvoice(int orderNo, String invoiceNo) {
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("orderNo", orderNo);
		map.put("invoiceNo", invoiceNo);
		
		
		return service.enrollInvocie(map);
	}
	
	
	// 반품리스트 조회
	@GetMapping("/admin/return")
	public String selectReturnList(Model model,
		@RequestParam(value="cp", required=false, defaultValue="1")int cp) {
		
		Map<String, Object> map = service.selectReturnList(cp);
		
		model.addAttribute("map", map);
		
		return "productAdmin/returnList";
	}
	
	// 반품 상세조회
	@ResponseBody
	@GetMapping("/admin/returnDetail")
	public String selectReturnDetail(int returnNo) {
		
		List<Return> returnDetail = service.selectReturnDetail(returnNo);
		
		return new Gson().toJson(returnDetail);
	}
	
	
	// 반품상태 변경
	@ResponseBody
	@GetMapping("/admin/returnStatus")
	public int returnStatus(
		@RequestParam("rStatus") String rStatus,
		@RequestParam("returnNo") int returnNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("rStatus", rStatus);
		map.put("returnNo", returnNo);
		
		return service.returnStatus(map);
	}
	
	
	
}
