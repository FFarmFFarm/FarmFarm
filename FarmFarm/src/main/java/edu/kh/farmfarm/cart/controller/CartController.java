package edu.kh.farmfarm.cart.controller;

import java.util.HashMap;
import java.util.Map;

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

import edu.kh.farmfarm.cart.model.service.CartService;
import edu.kh.farmfarm.cart.model.vo.Cart;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

@SessionAttributes("{loginMember}")
@Controller
public class CartController {

	@Autowired
	private CartService service;
	
	// 장바구니로 이동
	@GetMapping("/cart")
	public String cartPage(Model model,
		@SessionAttribute("loginMember") Member loginMember) {
		
		model.addAttribute("cartList", service.selectCartList(loginMember.getMemberNo()));
		
		return "order/cart";
	}
	
	// 장바구니에 추가
	@ResponseBody
	@GetMapping("/addCart")
	public int addCart(
		@RequestParam("productNo") int productNo,
		@RequestParam("productAmount") int productAmount,
		@RequestParam("memberNo") int memberNo		
		) {

		Cart cart = new Cart();
		
		cart.setProductNo(productNo);
		cart.setProductAmount(productAmount);
		cart.setMemberNo(memberNo);
		
		
		return service.addCart(cart);
	}
	
	// 장바구니에 수량추가
	@ResponseBody
	@PostMapping("/addCart")
	public int addCartUp(
			@RequestParam("productNo") int productNo,
			@RequestParam("productAmount") int productAmount,
			@RequestParam("memberNo") int memberNo		
			) {
		
		Cart cart = new Cart();
		
		cart.setProductNo(productNo);
		cart.setProductAmount(productAmount);
		cart.setMemberNo(memberNo);
		
		
		return service.addCartUp(cart);
	}
	
	// 장바구니에서 수량 추가
	@ResponseBody
	@GetMapping("/plusCart")
	public int plusCart(
			@RequestParam("productNo") int productNo,
			@RequestParam("memberNo") int memberNo		) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("productNo", productNo);
		map.put("memberNo", memberNo);

		return service.plusCart(map);
	}
	
	// 장바구니에서 수량 감소
	@ResponseBody
	@GetMapping("/minusCart")
	public int minusCart(
			@RequestParam("productNo") int productNo,
			@RequestParam("memberNo") int memberNo		) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("productNo", productNo);
		map.put("memberNo", memberNo);

		return service.minusCart(map);
	}
	
	// 장바구니 삭제
	@ResponseBody
	@GetMapping("/deleteCart")
	public int deleteCart(
		@RequestParam("productNo") int productNo,
		@RequestParam("memberNo") int memberNo) {
			
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("productNo", productNo);
		map.put("memberNo", memberNo);

		return service.deleteCart(map);
		
		
	}
	
	// 배송지 정보 가져오기
	@GetMapping("/address")
	public String addressList(Model model,
		@SessionAttribute("loginMember") Member loginMember) {
		
		model.addAttribute("addressList", service.selectAddressList(loginMember.getMemberNo()));
		
		return "order/deliveryInfo";
	}
	
	// 배송정보 변경
	@ResponseBody
	@GetMapping("/address/change")
	public int changeAddress(
		@RequestParam("addressNo") int addressNo,
		@SessionAttribute("loginMember") Member loginMember) {
		
		MemberAddress add = new MemberAddress();
		add.setMemberNo(loginMember.getMemberNo());
		add.setAddressNo(addressNo);
		
		int result =  service.changeAddress(add);
		
		if(result>0) {
			String memberAddress2 =service.selectAddress(addressNo);
			
			loginMember.setMemberAddress2(memberAddress2);
		}
				
		return result;
	}
	
	// 배송지 삭제
	@ResponseBody
	@GetMapping("/address/delete")
	public int deleteAddress(
		@RequestParam("addressNo") int addressNo) {
		
		return service.deleteAddress(addressNo);
	}

	// 장바구니 리스트 삭
	@ResponseBody
	@GetMapping("/deleteCart/list")
	public int deleteCartList(
		@SessionAttribute("loginMember") Member loginMember,
		@RequestParam("deleteList") String deleteList) {
			
		return service.deleteCartList(loginMember.getMemberNo(), deleteList);
	}
	
	
//	// 배송지 추가해볼까요?
//	@ResponseBody
	@GetMapping("/address/insert")
	public String insertAdd(
			String[] memberAddress,
			RedirectAttributes ra,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestHeader("referer") String referer) {
		
		int result = service.insertAdd(memberAddress, loginMember.getMemberNo());
		String message = null;
		String addinsertOk = null;
		String path = null;
		
		if(result > 0) {
			message = "배송지를 추가했습니다.";
			addinsertOk = "ok";
			path = "/order/deliveryInfo";
		} else {
			message = "배송지 추가 실패";
			addinsertOk = "no";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		ra.addFlashAttribute("addinsertOk", addinsertOk);
		
		return "redirect:"+referer;
	}
	
	
	
}
