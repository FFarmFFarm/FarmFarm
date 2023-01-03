package edu.kh.farmfarm.order.model.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.annotation.Annotation;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.RequestEntity.BodyBuilder;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;

import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.dao.OrderDAO;
import edu.kh.farmfarm.order.model.vo.BuyerInfo;
import edu.kh.farmfarm.order.model.vo.ImpToken;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderDAO dao;
	
	private HttpHeaders headers = new HttpHeaders();
	
	
	private RestTemplate restTemplate = new RestTemplate();

	@Override
	@Transactional
	public int insertReturn(Return returnInfo, List<Product> productList) {
		
		
		int returnNo = dao.insertReturn(returnInfo);
		
		
		List<Product> pList = new ArrayList<Product>(productList);
		
		
	
		for(int i=0; i<pList.size(); i++) {
			productList.get(i).setReturnNo(returnNo);
			
			if(pList.get(i).getProductNo() == 0) {
				productList.remove(i);
			}
			
		}
		

		if(returnNo > 0) {
			returnNo = dao.insertReturnProduct(productList);
			
		}
		
		
		return returnNo;
	}
	
	
	/** 주문하기
	 *
	 */
	@Override
	public int orderProduct(Order order, List<Product> pList) {
		
		int orderNo = dao.insertOrder(order);
		
		if(orderNo > 0) {
			
			for(Product p : pList) {
				p.setOrderNo(orderNo);
			}
			
			orderNo = dao.insertProduct(pList);
		}
		
		return orderNo;
	}
	
	
	/** 주문 취소하기
	 *
	 */
	@Override
	public int orderCancel(int orderNo) {
		return dao.orderCancel(orderNo);
	}
	
	
	/** 결제 토큰 얻어오기
	 *
	 */
	@SuppressWarnings("unchecked")
	@Override
	public String getToken() throws IOException {


		headers.setContentType(MediaType.APPLICATION_JSON);
		
		JSONObject body = new JSONObject();
		body.put("imp_key", "6512320408078822");
		body.put("imp_secret", "GCLUvY1ctKJUvFio3IOUoY42wMDMwrbSE1nfpJVkVvbvsYZWoTTnLLBAyQxcqsyWzWAXphVDEgbNy1Na");
		
		String token = null;
		
		try {
			HttpEntity<JSONObject> entity = new HttpEntity<>(body , headers);
			ImpToken impToken = restTemplate.postForObject("https://api.iamport.kr/users/getToken", entity, ImpToken.class);

			
			token = impToken.getResponse().get("access_token").toString();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("getTokenError");
		} finally {
			headers.clear();
			body.clear();
		}
		
		return token;
	}
	
	
	/** 결제 정보 불러오기
	 *
	 */
	@Override
	public JSONObject getBuyerInfo(String token, String impId) throws IOException {
		
		URL url = new URL("https://api.iamport.kr/payments/");
		
		headers.add("Authorization", token);
		HttpEntity<JSONObject>entity= new HttpEntity<JSONObject>(headers);
		
		try {
			BuyerInfo buyerInfo = restTemplate.postForObject(url+impId, entity, BuyerInfo.class);
			return buyerInfo.getResponse();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("getBuyerInfo Error");
			
			throw new RuntimeException("결제 정보 불러오기 실패");
		}
	}
	
	/** 결제 id 얻어오기
	 *
	 */
	@Override
	public Order selectImpUid(int orderNo) {
		return dao.selectImpUid(orderNo);
	}
	
	/** 아임포트에 환불 요청
	 * @throws IOException 
	 *
	 */
	@SuppressWarnings("unchecked")
	@Override
	public int paymentCancel(String token, Order order) throws IOException {
		
		
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Authorization", token);
		
		JSONObject body = new JSONObject();
		body.put("reason", "주문 취소");
		body.put("imp_uid", order.getImpUid());
		body.put("amount", order.getOrderPrice());
		body.put("checksum", order.getOrderPrice());
		
		try {
			HttpEntity<JSONObject> entity = new HttpEntity<>(body , headers);
			ImpToken impToken = restTemplate.postForObject("https://api.iamport.kr/payments/cancel", entity, ImpToken.class);
			
			System.out.println(impToken.toString());
			return 1;
			
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("getBuyerInfo Error");
			
			throw new RuntimeException("환불 실패");
		}
		
		
	}
	
	/** 자정마다 주문한지 일주일 된 주문 구매 확정
	 *
	 */
	@Override
	public int orderConfirm() {
		return dao.orderConfirm();
	}
	
}
