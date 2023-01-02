package edu.kh.farmfarm.cart.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.cart.model.vo.Cart;

@Repository
public class CartDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 장바구니 확인
	 * @param cart
	 * @return result
	 */
	public int checkCart(Cart cart) {
		return sqlSession.selectOne("cartMapper.checkCart", cart);
	}

	/** 장바구니 추가
	 * @param cart
	 * @return result
	 */
	public int addCart(Cart cart) {
		return sqlSession.insert("cartMapper.addCart", cart);
	}

	/** 장바구니 수량 확인
	 * @param cart
	 * @return cartAmount
	 */
	public int addCartAmount(Cart cart) {
		return sqlSession.selectOne("cartMapper.addCartAmount", cart);
	}
	
	/** 장바구니 수량 업데이트
	 * @param cart
	 * @return result
	 */
	public int addCartUp(Cart cart) {
		return sqlSession.update("cartMapper.addCartUp", cart);
	}
	
}
