package edu.kh.farmfarm.common;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

// 예외 처리용 컨트롤러
@ControllerAdvice
public class ExceptionController {

		// Page not found
		@ExceptionHandler(NoHandlerFoundException.class)
		public String noHandlerExceptionHandler(NoHandlerFoundException e, Model model) {
			
			e.printStackTrace();
			
			model.addAttribute("errorKind", "404 Not Found");
			model.addAttribute("errorTitle", "페이지를 찾을 수 없습니다.");
			model.addAttribute("errorDetail", "주소가 잘못되었거나, 바뀌었을 수 있습니다."
												+ "<br>"
												+ "주소 확인 후 다시 시도해주세요.");
			model.addAttribute("e", e);
			
			return "common/error";
		}
		
		// @ExceptionHandler(예외 종류) -> 해당 종류의 예외만 별도로 처리
		
		/* 예시 )
		 * @ExceptionHandler(SQLException.class) public String
		 * exceptionHandler(Exception e, Model model) {
		 * 
		 * // 매개변수 Exception e : 발생한 예외 전달 받는 매개 변수
		 * 
		 * e.printStackTrace();
		 * 
		 * model.addAttribute("errorMessage", "서비스 이용 중 문제가 발생했습니다.");
		 * 
		 * model.addAttribute("e", e);
		 * 
		 * return "common/error"; }
		 */
		
		// All
		@ExceptionHandler(Exception.class)
		public String exceptionHandler(Exception e, Model model) {
			
			e.printStackTrace();
			
			model.addAttribute("errorKind", "알 수 없는 오류가 발생했습니다");
			model.addAttribute("errorTitle", "잠시 후 다시 시도해주세요");
			model.addAttribute("errorDetail", "문제가 지속될 경우 고객행복센터로 문의해 주세요");
			model.addAttribute("e", e);
			
			return "common/error";
		}
	
}
