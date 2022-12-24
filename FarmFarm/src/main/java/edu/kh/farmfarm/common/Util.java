package edu.kh.farmfarm.common;

import java.text.SimpleDateFormat;

public class Util {
	
	   // 파일명 변경 메소드
	   public static String fileRename(String originFileName) {
	      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	      String date = sdf.format(new java.util.Date(System.currentTimeMillis()));

	      int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

	      String str = "_" + String.format("%05d", ranNum);

	      String ext = originFileName.substring(originFileName.lastIndexOf("."));

	      return date + str + ext;
	   }
	
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
	   
	   // 특수문자 제거 : 주소창에 특수문자를 입력한 경우 특수문자를 공백으로 제거함
	   public static String replaceSpecialSymbol(String text) {
		   
		   if(text != null) {
			   text = text.replaceAll("\\=", "");
			   text = text.replaceAll("\\&", "");
			   text = text.replaceAll("\\?", "");
			   text = text.replaceAll("\\@", "");
			   text = text.replaceAll("\\#", "");
			   text = text.replaceAll("\\$", "");
			   text = text.replaceAll("\\%", "");
			   text = text.replaceAll("\\;", "");
			   text = text.replaceAll("\\|", "");
			   text = text.replaceAll("\\\\", "");
		   }           
		   
		   return text;
		   
	   }
	   

}
