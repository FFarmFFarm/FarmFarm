package edu.kh.farmfarm.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import edu.kh.farmfarm.notify.model.service.NotifyService;

public class BoardInterceptor implements HandlerInterceptor {
	
	@Autowired
	private NotifyService notifyService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
//		System.out.println("인터셉터");
		
		// 다운캐스팅 진행
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
		// 주소에서 숫자 꺼내기
		String path = req.getRequestURI();
		
		// /boards/1/113?cp=3&key=&query=&sort=new
		
		int lastSlash = path.lastIndexOf("/");
		
		int boardNo = Integer.parseInt(path.substring(lastSlash + 1));
		
		int isBoardDelete = notifyService.isBoardDelete(boardNo);
		
		if(isBoardDelete > 0) {
			return true;
		} else {
			resp.sendRedirect("/notfound");
			return true;
		}

	}

}
