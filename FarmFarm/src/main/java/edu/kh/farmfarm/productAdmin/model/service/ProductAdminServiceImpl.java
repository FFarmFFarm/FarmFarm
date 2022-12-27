package edu.kh.farmfarm.productAdmin.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Util;
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
	
}
