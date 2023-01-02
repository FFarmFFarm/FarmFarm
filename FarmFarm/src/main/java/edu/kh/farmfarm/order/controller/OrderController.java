package edu.kh.farmfarm.order.controller;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.service.OrderService;
import edu.kh.farmfarm.order.model.vo.ImpToken;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.ProductList;


@Controller
@SessionAttributes({"tid", "order"})
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
	
	@PostMapping("/orderPage")
	public String orderPage(ProductList pList, Model model) {
		
		model.addAttribute("productList", pList.getPList());
		
		return "order/order";
	}
	
	
	
	/** 주문하기
	 * @param order
	 * @param pList
	 * @param referer
	 * @param loginMember
	 * @param ra
	 * @param impUid
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/order")
	public String order(Order order, ProductList pList, @RequestHeader("referer")String referer,
			@SessionAttribute("loginMember")Member loginMember,
			RedirectAttributes ra) throws IOException {
		

		
		order.setMemberNo(loginMember.getMemberNo());
		
		int result = service.orderProduct(order, pList.getPList());
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			path = "/myPage";
			message = "주문이 완료되었습니다";
		} else {
			path = referer;
			message = "주문이 실패했습니다";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	
	/** 주문 검증
	 * @return
	 * @throws IOException
	 */
	@GetMapping("/order/confirmBuy")
	@ResponseBody
	public String confirmBuy(int orderPrice, String impUid) throws IOException {
		
		String token = service.getToken();
		System.out.println(token);
		
		JSONObject buyerInfo = service.getBuyerInfo(token, impUid);
		
		System.out.println(buyerInfo.toString());
		
		int amount = (int)buyerInfo.get("amount");
		String status = (String)buyerInfo.get("status");
		
		System.out.println(amount + status);
		
		if(orderPrice == amount && status.equals("paid")) {
			return impUid;
		} else {
			System.out.println("결제 검증 실패");
			return "실패";
		}
	}
	
	
	

	
	@GetMapping("/order/cancel")
	@ResponseBody
	public int orderCancel(int orderNo) throws IOException {
		
		
//		주문 결제 IMP_UID 얻어오기
		Order order = service.selectImpUid(orderNo);
		
		
		String token = service.getToken();
		System.out.println(token);
		
		
//		imp_uid 이용해서 환불 요청하기
		int result = service.paymentCancel(token, order);
		
		if(result > 0) {
			
			result = service.orderCancel(orderNo);
		}
		
		
		return result;
	}
	


}
