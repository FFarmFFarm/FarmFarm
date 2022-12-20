package edu.kh.farmfarm.mypage.model.vo;

import java.util.List;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Order {

	private int orderNo;
	private int memberNo;
	private String orderDate;
	private int orderStatus;
	private int invoiceNo;
	
	private List<Product> productList;
	
}
