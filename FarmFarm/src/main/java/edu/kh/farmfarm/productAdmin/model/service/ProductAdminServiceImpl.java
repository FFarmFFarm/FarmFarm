package edu.kh.farmfarm.productAdmin.model.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.productAdmin.model.dao.ProductAdminDAO;
import edu.kh.farmfarm.productDetail.model.vo.Product;
import edu.kh.farmfarm.productDetail.model.vo.ProductImg;

@Service
public class ProductAdminServiceImpl implements ProductAdminService{

	@Autowired
	private ProductAdminDAO dao;

	// 팜팜상품 등록
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int enrollProduct(Product product, List<MultipartFile> productImgList, String webPath, String folderPath) throws Exception {

		// XSS 처리
		product.setProductName(Util.XSSHandling(product.getProductName()));
		product.setProductMessage(Util.XSSHandling(product.getProductMessage()));
		// 개행처리
		product.setProductMessage(Util.newLineHandling(product.getProductMessage()));
				
				
		int productNo = dao.enrollProduct(product);
				
		if(productNo>0) {
			List<ProductImg> imgList = new ArrayList<ProductImg>();
			List<String> renameList = new ArrayList<String>();
					
			for(int i=0; i<productImgList.size(); i++) {
				if(productImgList.get(i).getSize()>0) {
					ProductImg img = new ProductImg();
							
					String rename = Util.fileRename(productImgList.get(i).getOriginalFilename());
					renameList.add(rename);
							
					img.setProductImgAddress(webPath+rename);
					img.setProductImgOrder(i);
					img.setProductNo(productNo);
					img.setProductImgOriginal(productImgList.get(i).getOriginalFilename());
							
					imgList.add(img);
				}
						
			}
					
			if(!imgList.isEmpty()) {
				int result = dao.insertProductImgList(imgList);
						
				if(result==imgList.size()) {
					for(int i=0; i<imgList.size(); i++) {
						int index = imgList.get(i).getProductImgOrder();
						productImgList.get(index).transferTo(new File(folderPath+renameList.get(i)));
					}
				}
			}
		}
				
		return productNo;
	}
	
	// 팜팜 상품 전체조회
	@Override
	public Map<String, Object> selectProductList(int cp) {
		
		int listCount = dao.getListCount();
		
		Pagination pagination = new Pagination(listCount, cp, 10, 10);
		
		List<Product> productList = dao.selectProductList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("productList", productList);
		map.put("listCount", listCount);
		
		return map;
	}
	
	// 검색 결과 리스트 조회
	@Override
	public Map<String, Object> selectProductList(Map<String, Object> pm, int cp) {
		
		int listCount = dao.getListCount(pm);
		
		Pagination pagination = new Pagination(listCount, cp, 10, 10);
		
		List<Product> productList = dao.selectProductList(pagination, pm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("productList", productList);
		map.put("listCount", listCount);
		
		return map;
	}

	// 판매자 재고 증가
	@Override
	public int stockUp(Map<String, Object> map) {
		return dao.stockUp(map);
	}

	
	// 판매자 재고 감소
	@Override
	public int stockDown(Map<String, Object> map) {
		return dao.stockDown(map);
	}

	// 상품 삭제
	@Override
	public int deleteProduct(int productNo) {
		return dao.deleteProduct(productNo);
	}

	// 상품 수정페이지로 이동
	@Override
	public Product selectProductDetail(int productNo) {
		return dao.selectProductDetail(productNo);
	}

	// 상품 수정
	@Override
	public int updateProduct(Product product, List<MultipartFile> productImgList, String webPath, String folderPath,
			String deleteList) throws Exception {
		
		product.setProductName(Util.XSSHandling(product.getProductName()));
		product.setProductMessage(Util.XSSHandling(product.getProductMessage()));
		
		int result = dao.updateProduct(product);
		
		if(result>0) {
			if(!deleteList.equals("")) {
				
				String condition = "WHERE PRODUCT_NO = " + product.getProductNo()
								+ "AND PRODUCT_IMG_ORDER IN(" + deleteList + ")";
				
				result = dao.productImgDelete(condition);
			}
			
			List<ProductImg> imgList = new ArrayList<ProductImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<productImgList.size(); i++) {
				if(productImgList.get(i).getSize()>0) {
					ProductImg img = new ProductImg();
					
					String rename = Util.fileRename(productImgList.get(i).getOriginalFilename());
					renameList.add(rename);
					
					img.setProductImgAddress(webPath+rename);
					img.setProductImgOrder(i);
					img.setProductNo(product.getProductNo());
					img.setProductImgOriginal(productImgList.get(i).getOriginalFilename());
					
					imgList.add(img);
					result = dao.productImgUpdate(img);
					
					if(result==0) {
						result = dao.productImgInsert(img);
					}
				}
			}
			if(!imgList.isEmpty()) {
				for(int i=0; i<imgList.size(); i++) {
					int index = imgList.get(i).getProductImgOrder();
					productImgList.get(index).transferTo(new File(folderPath+renameList.get(i)));
				}
			}
		}
		
		return result;
	}

	
	// 상품 상태 변경
	@Override
	public int soldoutProduct(Map<String, Object> map) {
		return dao.soldoutProduct(map);
	}

	// 주문 목록 조회
	@Override
	public Map<String, Object> selectOrderList(int cp) {
		
		int orderListCount = dao.getOrderListCount();
		
		Pagination pagination = new Pagination(orderListCount, cp, 10, 10);
		
		List<Order> orderList = dao.selectOrderList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("orderList", orderList);
		map.put("orderListCount", orderListCount);
		
		return map;
	}

	
	// 검색 목록 조회
	@Override
	public Map<String, Object> selectOrderList(Map<String, Object> pm, int cp) {
		
		int orderListCount = dao.getOrderListCount(pm);
		
		Pagination pagination = new Pagination(orderListCount, cp, 10, 10);
		
		List<Order> orderList = dao.selectOrderList(pagination, pm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("orderList", orderList);
		map.put("orderListCount", orderListCount);
		
		return map;
	}

	// 주문목록 상세조회
	@Override
	public Order selectOrderDetail(int orderNo) {
		
		return dao.selectOrderDetail(orderNo);
	}

	// 주문상태 변경
	@Override
	public int orderStatus(Map<String, Object> map) {
		return dao.orderStatus(map);
	}

	
	
}
