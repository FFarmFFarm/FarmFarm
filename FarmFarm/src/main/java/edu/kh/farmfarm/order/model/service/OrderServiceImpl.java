package edu.kh.farmfarm.order.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	
}
