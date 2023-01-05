package edu.kh.farmfarm.productAdmin.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.order.model.vo.Return;
import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface ProductAdminService {

	
	/** 팜팜상품 등록
	 * @param product
	 * @param productImgList
	 * @param webPath
	 * @param folderPath
	 * @return productNo
	 * @throws Exception 
	 */
	int enrollProduct(Product product, List<MultipartFile> productImgList, String webPath, String folderPath) throws Exception;

	/** 팜팜 재고관리
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectProductList(int cp);
	

	/** 팜팜상품 검색결과
	 * @param pm
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectProductList(Map<String, Object> pm, int cp);

	/** 판매자 재고 증가
	 * @param map
	 * @return result
	 */
	int stockUp(Map<String, Object> map);

	/** 판매자 재고 감소
	 * @param productAmount
	 * @return result
	 */
	int stockDown(Map<String, Object> map);

	/** 상품 삭제
	 * @param productNo
	 * @return result
	 */
	int deleteProduct(int productNo);

	/** 상품 수정 페이지 이동
	 * @param productNo
	 * @return product
	 */
	Product selectProductDetail(int productNo);

	/** 상품 수정
	 * @param product
	 * @param productImgList
	 * @param webPath
	 * @param folderPath
	 * @param deleteList
	 * @return result
	 * @throws Exception 
	 */
	int updateProduct(Product product, List<MultipartFile> productImgList, String webPath, String folderPath,
			String deleteList) throws Exception;

	/** 상품 상태 변경
	 * @param map
	 * @return result
	 */
	int soldoutProduct(Map<String, Object> map);

	/** 주문 목록 조회
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectOrderList(int cp);

	/** 검색 목록 조회
	 * @param pm
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectOrderList(Map<String, Object> pm, int cp);


	/** 주문목록 상세조회
	 * @param orderNo
	 * @return order
	 */
	Order selectOrderDetail(int orderNo);

	/** 주문상태 변경
	 * @param map
	 * @return result
	 */
	int orderStatus(Map<String, Object> map);

	/** 송장등록
	 * @param map
	 * @return result
	 */
	int enrollInvocie(Map<String, Object> map);

	/** 반품리스트 조회
	 * @return map
	 */
	Map<String, Object> selectReturnList(int cp);

	/** 반품상세조회
	 * @param returnNo
	 * @return returnDetail
	 */
	Return selectReturnDetail(int returnNo);


}
