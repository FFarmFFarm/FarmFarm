package edu.kh.farmfarm.productAdmin.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.ProductImg;

@Repository
public class ProductAdminDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 팜팜상품 등록
	 * @param product
	 * @return productNo
	 */
	public int enrollProduct(Product product) {
		return sqlSession.insert("productAdmin.enrollProduct", product);
	}

	public int insertProductImgList(List<ProductImg> imgList) {
		return sqlSession.insert("prodcutAdmin.insertProductImgList", imgList);
	}
	
}
