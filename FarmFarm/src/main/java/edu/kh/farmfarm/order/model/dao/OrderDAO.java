package edu.kh.farmfarm.order.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Repository
public class OrderDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 반품 등록
	 * @param returnInfo
	 * @return
	 */
	public int insertReturn(Return returnInfo) {
		
		int result = sqlSession.insert("orderMapper.insertReturn", returnInfo);
		
		if(result > 0) {
			result = returnInfo.getReturnNo();
		}
		
		return result;
	}

	/** 반품 상품 등록
	 * @param productList
	 * @return
	 */
	public int insertReturnProduct(List<Product> productList) {
		
		int result = 1;
		
			
		for(Product product : productList) {
			
			sqlSession.insert("orderMapper.insertReturnProduct", product);
			sqlSession.update("orderMapper.updateProductStatus", product);
			
		}
	
		return result;
	}


	

}
