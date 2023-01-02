package edu.kh.farmfarm.order.controller;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.service.OrderService;
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
	
	@PostMapping("/order")
	public String order(Order order, ProductList pList, @RequestHeader("referer")String referer,
			@SessionAttribute("loginMember")Member loginMember,
			RedirectAttributes ra) {
		
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
	
	
	

//	
//	
//	/** 카카오페이 연결
//	 * @return
//	 * @throws IOException
//	 */
//	@GetMapping("/order/cancel")
//	@ResponseBody
//	public String payCancel(
//				@RequestParam(name = "cancelAmount")int cancelAmount, 
//				@RequestParam(name = "cancelPrice")String cancelPrice, 
//				@SessionAttribute("loginMember") Member loginMember,
//				Order order, Model model
//				) throws IOException {
//		
//		
////		요청을 보낼 주소
//		URL url = new URL("https://kapi.kakao.com/v1/payment/cancel");
//		
////		서버와 서버를 연결해주는 변수 선언
//		HttpURLConnection huc = (HttpURLConnection)url.openConnection();
//		
////		요청 방식
//		huc.setRequestMethod("POST");
//		
////		요청시 설정해 주어야하는 요소
//		huc.setRequestProperty("Authorization", "KakaoAK 0bbb7293d9eb723d98daa4bc6b680b2c");
//		huc.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//		
////		전달할 인자가 있을 경우 = true
//		huc.setDoOutput(true);
//		
////		요청시 전달할 파라미터
//		String parameters = "cid=TC0ONETIME"
//				+ "&tid=T3b008e54a466e29faf2"
//				+ "&cancel_amount=" + String.valueOf(cancelAmount)
//				+ "&cancel_tax_free_amount=0"
//				+ "&cancel_vat_amount=200"
//				+ "&cancel_available_amount=4000"
//				+ "&totalAmount=4000";
//
//		
////		파라미터를 전달해주는 요소
//		OutputStream os = huc.getOutputStream();
//		
////		데이터를 주는 요소
//		DataOutputStream dos = new DataOutputStream(os);
//		
////		DataOutputStream은 data를 byte형식으로 전달해야 함.
//		
////		data를 byte형식으로 형변환
//		dos.writeBytes(parameters);
//		
////		dos.flush(); = 가지고있는 data를 전송하고 비움
//		
////		close 시 flush() 자동 실행 후 닫힘(전송됨)
//		dos.close();
//		
////		연결 성공 시결과 코드 반환
//		int resultCode = huc.getResponseCode();
//		
////		연결된 서버에서 반환되는 데이터를 받아오는 클래스 선언
//		InputStream is;
//		
////		Http 코드에서 정상 통신을 뜻하는 숫자 == 200 그 외 숫자는 모두 오류
//		if(resultCode == 200) {
//			is = huc.getInputStream();
//		} else {
//			is = huc.getErrorStream();
//		}
//		
////		전달받은 data를 읽어주는 요소
//		InputStreamReader isr = new InputStreamReader(is);
//		
////		byte로 된 data를 읽어주는 요소
//		BufferedReader br = new BufferedReader(isr);
//		
//		String result =  br.readLine();
//		
//		
//		return result;
//	}

}
