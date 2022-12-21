package edu.kh.farmfarm.common;

import java.text.SimpleDateFormat;

public class Util {
	
	   // xss 방지 처리 : HTML에서 해석되는 문자를 단순 글자로 변경
	   public static String XSSHandling(String content) {
		   
		   if(content != null) {
			   content = content.replaceAll("&", "&amp;");
			   content = content.replaceAll("<", "&lt;");
			   content = content.replaceAll(">", "&gt;");
			   content = content.replaceAll("\"", "&quot;");
		   }
		   return content;
	   }

	   
	   // 개행 문자 처리 : \r\n, \n, \r, \n\r -> <br>로 변경
	   public static String newLineHandling(String content) {
		   return content.replaceAll("(\r\n|\n|\r|\n\r)", "<br>");
	   }
	   
	   
	   // 개행 문자 처리 해제
	   public static String newLineClear(String content) {
		   return content.replaceAll("<br>", "\n");
	   }

}
