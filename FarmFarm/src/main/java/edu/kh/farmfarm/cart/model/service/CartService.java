package edu.kh.farmfarm.cart.model.service;

import edu.kh.farmfarm.cart.model.vo.Cart;

public interface CartService {

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

}
