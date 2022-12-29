package edu.kh.farmfarm.productAdmin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.ProductImg;

/**
 * @author hyunjae
 *
 */
@Repository
public class ProductAdminDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 팜팜상품 등록
	 * @param product
	 * @return productNo
	 */
	public int enrollProduct(Product product) {
		int result = sqlSession.insert("productAdmin.enrollProduct", product);
		
		if(result>0) {
			
			result = sqlSession.insert("productAdmin.insertStock", product);
			if(result>0) {
				result = product.getProductNo();				
			}
		}
		return result;
	}

	/** 이미지 삽입
	 * @param imgList
	 * @return
	 */
	public int insertProductImgList(List<ProductImg> imgList) {
		return sqlSession.insert("productAdmin.insertProductImgList", imgList);
	}

	/** 팜팜글 수 조회
	 * @return listCount
	 */
	public int getListCount() {
		return sqlSession.selectOne("productAdmin.getListCount");
	}

	/** 팜팜글 리스트 조회
	 * @param pagination
	 * @return map
	 */
	public List<Product> selectProductList(Pagination pagination) {
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		
		return sqlSession.selectList("productAdmin.selectProductList", 0, rowBounds);
	}

	/** 판매자 재고 증가
	 * @param productAmount
	 * @return result
	 */
	public int stockUp(Map<String, Object> map) {
		return sqlSession.insert("productAdmin.stockUp", map);
	}

	/** 판매자 재고 감소
	 * @param productAmount
	 * @return result
	 */
	public int stockDown(Map<String, Object> map) {
		return sqlSession.insert("productAdmin.stockDown", map);
	}
	
	/** 판매 상품 삭제
	 * @param productNo
	 * @return result
	 */
	public int deleteProduct(int productNo) {
		return sqlSession.update("productAdmin.deleteProduct", productNo);
	}

	/** 상품 수정페이지로 이동
	 * @param productNo
	 * @return product
	 */
	public Product selectProductDetail(int productNo) {
		return sqlSession.selectOne("productAdmin.selectProductDetail", productNo);
	}

	/** 상품 수정
	 * @param product
	 * @return result
	 */
	public int updateProduct(Product product) {
		return sqlSession.update("productAdmin.updateProduct", product);
	}

	/** 상품 이미지 삭제
	 * @param condition
	 * @return result
	 */
	public int productImgDelete(String condition) {
		return sqlSession.delete("productAdmin.productImgDelete", condition);
	}

	/** 상품 이미지 업데이트
	 * @param img
	 * @return result
	 */
	public int productImgUpdate(ProductImg img) {
		return sqlSession.update("productAdmin.productImgUpdate", img);
	}

	/** 상품 이미지 삽입
	 * @param img
	 * @return result
	 */ 
	public int productImgInsert(ProductImg img) {
		return sqlSession.insert("productAdmin.productImgInsert", img);
	}

	/** 상품 상태 변경
	 * @param map
	 * @return result
	 */
	public int soldoutProduct(Map<String, Object> map) {
		return sqlSession.update("productAdmin.soldoutProduct", map);
	}
	
}
