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
	private String memberId;
	private String orderDate;
	private int orderStatus;
	private String invoiceNo;
	private String orderPrice;
	private String impUid;
	private int productCount;
	private String productSum;
	
	private List<Product> productList;
	
}
