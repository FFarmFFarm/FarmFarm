package edu.kh.farmfarm.cart.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.cart.model.dao.CartDAO;
import edu.kh.farmfarm.cart.model.vo.Cart;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartDAO dao;

	
	// 장바구니 조회
	@Override
	public Object selectCartList(int memberNo) {
		
		List<Cart> cartList = dao.selectCartList(memberNo);
		
		return cartList;
	}

	// 장바구니 추가
	@Override
	public int addCart(Cart cart) {
		
		// 장바구니 있는지 확인
		int result = dao.checkCart(cart);
		
		if(result>0) {
			// 있으면 추가 x 
			result=2;
		}else {
			// 없으면 장바구니에 추가
			result = dao.addCart(cart);
		}
		
		return result;
	}

	// 기존 장바구니 수량 추가
	@Override
	public int addCartUp(Cart cart) {
		
		// 기존 장바구니 수량 확인
		int cartAmount = dao.addCartAmount(cart);
		int result = 0;
		
		if(cartAmount>0) {
			// 기존 장바구니 수량 + 새로 추가한 수량
			cart.setProductAmount(cartAmount+cart.getProductAmount());
			
			result = dao.addCartUp(cart);
		}
		
		return result;
	}

	// 장바구니에서 수량 추가
	@Override
	public int plusCart(Map<String, Object> map) {
		return dao.plusCart(map);
	}

	
	// 장바구니에서 수량 감소
	@Override
	public int minusCart(Map<String, Object> map) {
		return dao.minusCart(map);
	}

	// 장바구니 삭제
	@Override
	public int deleteCart(Map<String, Object> map) {
		return dao.deleteCart(map);
	}

	// 배송지 정보 가져오기
	@Override
	public Object selectAddressList(int memberNo) {
		
		List<MemberAddress> addressList = dao.selectAddressList(memberNo);
		
		return addressList;
	}

	// 배송지 정보 변경
	@Override
	public int changeAddress(MemberAddress add) {
		
		int result = dao.updateDefault(add.getMemberNo());
		
		return dao.changeAddress(add);
	}

	// 배송지 삭제
	@Override
	public int deleteAddress(int addressNo) {
		return dao.deleteAddress(addressNo);
	}

	
	// 장바구니 리스트 삭제
	@Override
	public int deleteCartList(int memberNo, String deleteList) {
		
		String condition = "WHERE PRODUCT_NO IN ("+deleteList+")"
							+ "AND MEMBER_NO= " + memberNo;
		
		return dao.deleteCartList(condition);
	}
	
}
