package edu.kh.farmfarm.notify.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class NotifyOrder {

	private int orderNo;
	private int memberNo;
	private String productName;
	private int orderProductCount;
}
