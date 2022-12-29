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
	
	private List<Product> productList;

}
