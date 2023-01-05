package edu.kh.farmfarm.cart.model.service;

import java.util.Map;

import edu.kh.farmfarm.cart.model.vo.Cart;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

public interface CartService {

	/** 장바구니 리스트 조회
	 * @param memberNo
	 * @return cartList
	 */
	Object selectCartList(int memberNo);
	
	/** 장바구니 추가
	 * @param cart
	 * @return result
	 */
	int addCart(Cart cart);

	/** 기존 장바구니 수량 추가
	 * @param cart
	 * @return result
	 */
	int addCartUp(Cart cart);

	/** 장바구니에서 수량 추가
	 * @param map
	 * @return result
	 */
	int plusCart(Map<String, Object> map);

	/** 장바구니에서 수량 감소
	 * @param map
	 * @return result
	 */
	int minusCart(Map<String, Object> map);

	/** 장바구니 삭제
	 * @param map
	 * @return result
	 */
	int deleteCart(Map<String, Object> map);

	/** 배송지 정보 가져오기
	 * @param memberNo
	 * @return addressList
	 */
	Object selectAddressList(int memberNo);

	/** 배송지 정보 변경
	 * @param add
	 * @return result
	 */
	int changeAddress(MemberAddress add);

	/** 배송지 삭제
	 * @param addressNo
	 * @return result
	 */
	int deleteAddress(int addressNo);

	/** 장바구니 리스트 삭제
	 * @param memberNo
	 * @param deleteList
	 * @return result
	 */
	int deleteCartList(int memberNo, String deleteList);


}
