package edu.kh.farmfarm.productDetail.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.Review;
import edu.kh.farmfarm.productDetail.model.vo.ReviewImg;
import edu.kh.farmfarm.productDetail.model.vo.ReviewPagination;

@Repository
public class ProductDetailDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	
	/** 상품 조회
	 * @param param
	 * @return product
	 */
	public Product selectProduct(Product param) {
				
		return sqlSession.selectOne("productDetailMapper.selectProduct", param);
	}

	
	
	/** 리뷰 개수 조회
	 * @param param
	 * @return
	 */
	public int reviewCount(Product param) {
		
		return sqlSession.selectOne("productDetailMapper.reviewCount", param);
	}

	
	
	/** 리뷰 목록 조회
	 * @param param
	 * @param pagination
	 * @return reviewList
	 */
	public List<Review> selectReviewList(Product param, ReviewPagination pagination) {
		
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		
		return sqlSession.selectList("productDetailMapper.selectReviewList", param, rowBounds);
		
	}


}
