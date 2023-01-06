package edu.kh.farmfarm.productAdmin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.vo.Return;
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
	 * @return productList
	 */
	public List<Product> selectProductList(Pagination pagination) {
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		
		return sqlSession.selectList("productAdmin.selectProductList", 0, rowBounds);
	}
	
	/** 조회 결과 수
	 * @param pm
	 * @return listCount
	 */
	public int getListCount(Map<String, Object> pm) {
		return sqlSession.selectOne("productAdmin.getListCount_search", pm);
	}

	/** 조회 결과 리스트 조회
	 * @param pagination
	 * @param pm
	 * @return productList
	 */
	public List<Product> selectProductList(Pagination pagination, Map<String, Object> pm) {
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productAdmin.selectProductList_search", pm, rowBounds);
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

	/** 주문 목록 수 조회
	 * @return
	 */
	public int getOrderListCount() {
		return sqlSession.selectOne("productAdmin.orderListCount");
	}

	/** 주문 리스트 조회
	 * @param pagination
	 * @return orderList
	 */
	public List<Order> selectOrderList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productAdmin.selectOrderList", 0, rowBounds);
	}
	
	
	/** 검색 목록 수 조회
	 * @param pm
	 * @return
	 */
	public int getOrderListCount(Map<String, Object> pm) {
		return sqlSession.selectOne("productAdmin.getOrderListCount_search", pm);
	}

	
	
	/** 주문 검색 조회
	 * @param pagination
	 * @param pm
	 * @return orderList
	 */
	public List<Order> selectOrderList(Pagination pagination, Map<String, Object> pm) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productAdmin.selectOrderList_search", pm, rowBounds);
	}

	/** 주문 상세조회
	 * @param orderNo
	 * @return
	 */
	public Order selectOrderDetail(int orderNo) {
		return sqlSession.selectOne("productAdmin.selectOrderDetail", orderNo);
	}

	/** 주문 상태 업데이트
	 * @param map
	 * @return
	 */
	public int orderStatus(Map<String, Object> map) {
		return sqlSession.update("productAdmin.updateOrderStatus", map);
	}

	/** 송장 등록
	 * @param orderNo
	 * @return result
	 */
	public int enrollInvocie(Map<String, Object> map) {
		return sqlSession.insert("productAdmin.enrollInvocie", map);
	}

	/** 주문상태 업데이트(배송)
	 * @param orderNo
	 * @return result
	 */
	public int updateDeliveryStatus(Map<String, Object> map) {
		return sqlSession.update("productAdmin.updateDeliveryStatus", map);
	}

	/** 반품 목록 수 조회
	 * @return
	 */
	public int getReturnListCount() {
		return sqlSession.selectOne("productAdmin.returnListCount");
	}

	/** 반품 목록 조회
	 * @param pagination
	 * @return map
	 */
	public List<Return> selectReturnList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productAdmin.selectReturnList", 0, rowBounds);
	
	}

	/** 반품 상세 조회
	 * @param returnNo
	 * @return returnDetail
	 */
	public Return selectReturnDetail(int returnNo) {
		return sqlSession.selectOne("productAdmin.selectReturnDetail", returnNo);
	}




	
}
