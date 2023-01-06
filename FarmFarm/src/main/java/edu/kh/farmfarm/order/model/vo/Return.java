package edu.kh.farmfarm.order.model.vo;

import java.util.List;

import edu.kh.farmfarm.productDetail.model.vo.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Return {
	
	private int returnNo;
	private int orderNo;
	private String accountNo;
	private String accountName;
	private String returnReason;
	private String returnStatus;
	
	private int returnAmount;
	private int memberNo;
	private String memberId;
	private String returnSum;
	private int productNo;
	private String productName;
	private int productAmount;
	private String productPrice;
	
	private List<Product> productList;

}
