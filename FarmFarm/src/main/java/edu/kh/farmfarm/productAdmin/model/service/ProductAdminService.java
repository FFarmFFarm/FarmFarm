package edu.kh.farmfarm.productAdmin.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

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

}
