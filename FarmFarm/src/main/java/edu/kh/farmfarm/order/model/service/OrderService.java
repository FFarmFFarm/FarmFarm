package edu.kh.farmfarm.order.model.service;

import java.io.IOException;
import java.net.ProtocolException;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;

import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.vo.ImpToken;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface OrderService {

	/** 반품 등록
	 * @param returnInfo
	 * @return
	 */
	int insertReturn(Return returnInfo, List<Product> productList);

	/** 주문하기
	 * @param order
	 * @param pList
	 * @return
	 */
	int orderProduct(Order order, List<Product> pList);

	/** 주문 취소
	 * @param orderNo
	 * @return
	 */
	int orderCancel(int orderNo);

	/** 토큰 가져오기
	 * @return
	 */
	String getToken()  throws IOException;

	/** 주문 검증하기
	 * @param token
	 * @param impId
	 */
	JSONObject getBuyerInfo(String token, String impId)  throws IOException;

	/** 결제 id 얻어오기
	 * @param orderNo
	 * @return
	 */
	Order selectImpUid(int orderNo);

	/** 환불 요청
	 * @param token
	 * @param impUid
	 * @return
	 */
	ImpToken paymentCancel(String token, Order order) throws IOException;

	/** 자정마다 주문한지 7일 지난 주문 구매 확정
	 * 
	 */
	int orderConfirm();

	

}
