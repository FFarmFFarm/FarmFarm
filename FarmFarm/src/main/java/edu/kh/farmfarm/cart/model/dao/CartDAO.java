package edu.kh.farmfarm.cart.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.cart.model.vo.Cart;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

@Repository
public class CartDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 장바구니 리스트 조회
	 * @param memberNo
	 * @return cartList
	 */
	public List<Cart> selectCartList(int memberNo) {
		return sqlSession.selectList("cartMapper.selectCartList", memberNo);
	}

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

	/** 장바구니에서 수량 추가
	 * @param map
	 * @return result
	 */
	public int plusCart(Map<String, Object> map) {
		return sqlSession.update("cartMapper.plusCart", map);
	}
 
	/** 장바구니에서 수량 감소
	 * @param map
	 * @return result
	 */
	public int minusCart(Map<String, Object> map) {
		return sqlSession.update("cartMapper.minusCart", map);
	}

	/** 장바구니 삭제
	 * @param map
	 * @return result
	 */
	public int deleteCart(Map<String, Object> map) {
		return sqlSession.delete("cartMapper.deleteCart", map);
	}

	/** selectAddressList
	 * @param memberNo
	 * @return addressList
	 */
	public List<MemberAddress> selectAddressList(int memberNo) {
		return sqlSession.selectList("cartMapper.selectAddressList", memberNo);
	}

	/** 기존 배송지 default 변경
	 * @param memberNo
	 * @return result
	 */
	public int updateDefault(int memberNo) {
		return sqlSession.update("cartMapper.updateDefault", memberNo);
	}

	/** 다른 배송지를 default로 변경
	 * @param add
	 * @return
	 */
	public int changeAddress(MemberAddress add) {
		return sqlSession.update("cartMapper.changeAddress", add);
	}

	/** 배송지 삭제
	 * @param addressNo
	 * @return result
	 */
	public int deleteAddress(int addressNo) {
		return sqlSession.delete("cartMapper.deleteAddress", addressNo);
	}

	/** 장바구니 리스트 삭제
	 * @param condition
	 * @return result
	 */
	public int deleteCartList(String condition) {
		return sqlSession.delete("cartMapper.deleteCartList", condition);
	}
	
	
	
	
	

	
}
