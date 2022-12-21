package edu.kh.farmfarm.productDetail.model.service;

import java.util.Map;

import edu.kh.farmfarm.productDetail.model.vo.Product;

public interface ProductDetailService {


	Map<String, Object> selectProduct(Product param);

}
