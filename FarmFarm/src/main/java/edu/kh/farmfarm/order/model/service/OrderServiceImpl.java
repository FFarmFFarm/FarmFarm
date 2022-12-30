package edu.kh.farmfarm.order.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.dao.OrderDAO;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderDAO dao;

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
	
}
