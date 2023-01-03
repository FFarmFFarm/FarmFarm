package edu.kh.farmfarm.order.scheduling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.farmfarm.order.model.service.OrderService;

// 주문한 지 7일 지난 주문의 구매를 확정하는 스케줄러

@Component
public class OrderConfirmScheduling {
	
	@Autowired
	private OrderService service;
	
	
	private Logger logger = LoggerFactory.getLogger(OrderConfirmScheduling.class);
	
	@Scheduled(cron = "0 0 0 * * *") // 매일 자정마다
	public void confirmOrder() {
		
		int result = service.orderConfirm();
		System.out.println("구매 확정");
		logger.info("구매 확정 진행");
		
		if(result > 0) {
			logger.info("구매 확정" +result+ "건 완료");
		}
		
	}
	

}
