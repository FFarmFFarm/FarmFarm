-- ROOM 번호와 회원 수
SELECT *
FROM (SELECT ROOM_NO, COUNT(MEMBER_NO) AS MEMBER_COUNT
			 FROM CHAT2_ENTER
			 GROUP BY ROOM_NO)
LEFT JOIN(
-- 내가 읽지 않은 채팅의 개수
SELECT ROOM_NO, (SELECT COUNT(CHAT_NO) 
				 FROM CHAT2 C2
				 WHERE C1.ROOM_NO = C2.ROOM_NO
				 AND CHAT_NO > (SELECT LAST_READ_CHAT_NO
				 				FROM CHAT2_ENTER C3
				 				WHERE MEMBER_NO = 5
				 				AND C1.ROOM_NO = C3.ROOM_NO
				 				AND ENTER_STATUS = 'Y')) AS UNREAD_CHAT_COUNT
FROM CHAT2 C1
GROUP BY ROOM_NO) USING(ROOM_NO)
------------------
LEFT JOIN (SELECT ROOM_NO, C.CHAT_NO, C.CHAT_CONTENT AS LAST_CHAT_CONTENT, 
      CASE WHEN TO_CHAR(C.CHAT_TIME, 'YYYY-MM-DD') = TO_CHAR(SYSDATE, 'YYYY-MM-DD') 
		   THEN TO_CHAR(C.CHAT_TIME, 'AM HH"시" MI"분"')
		   ELSE TO_CHAR(C.CHAT_TIME, 'YYYY-MM-DD')
   	  END LAST_CHAT_TIME, 
      C.CHAT_TYPE AS LAST_CHAT_TYPE
      FROM CHAT2 C
      JOIN (SELECT MAX(CHAT_NO) AS LAST_CHAT_NO
            FROM CHAT2
            GROUP BY ROOM_NO) C_SUB ON (C_SUB.LAST_CHAT_NO = C.CHAT_NO)
	  WHERE (C.CHAT_TYPE = 'T' OR C.CHAT_TYPE = 'I') ) USING(ROOM_NO)
------------------
LEFT JOIN (SELECT ROOM_NO, ROOM_NAME, CR.ROOM_TYPE,
   		     CASE WHEN ROOM_TYPE > 0 THEN (SELECT POST_TITLE 
   		 							       FROM POST P 
   		 							       WHERE CR.ROOM_TYPE=P.POST_NO)
   		     ELSE NULL END POST_TITLE,
   		     CASE WHEN ROOM_TYPE > 0 THEN (SELECT POST_IMG_ADDRESS 
   						    	 	       FROM POST_IMG PIMG
   						    	 	       WHERE POST_IMG_ORDER = 0 AND CR.ROOM_TYPE=PIMG.POST_NO)
   		    ELSE NULL END THUMBNAIL_IMG 
      FROM CHAT2_ROOM CR) USING(ROOM_NO)
------------------
LEFT JOIN (SELECT ROOM_NO, MEMBER_NO, ENTER_NO, ENTER_STATUS
  		   FROM CHAT2_ENTER
  		   WHERE ENTER_STATUS = 'Y' OR ENTER_STATUS = 'W') USING(ROOM_NO)
WHERE MEMBER_NO = 5
ORDER BY CHAT_NO DESC NULLS LAST;





		UPDATE CHAT2 SET READ_COUNT = READ_COUNT + 1
		WHERE ROOM_NO = 76
		AND CHAT_NO > (SELECT LAST_READ_CHAT_NO 
					   FROM CHAT2_ENTER
					   WHERE ROOM_NO = #{roomNo}
					   AND MEMBER_NO = #{memberNo}
					   AND ENTER_STATUS = 'Y' )








SELECT * FROM CHAT2_ROOM;




SELECT ROOM_NO, (SELECT COUNT(CHAT_NO) 
				 FROM CHAT2 C2
				 WHERE C1.ROOM_NO = C2.ROOM_NO
				 AND CHAT_NO > (SELECT LAST_READ_CHAT_NO
				 				FROM CHAT2_ENTER C3
				 				WHERE MEMBER_NO = 5
				 				AND C1.ROOM_NO = C3.ROOM_NO
				 				AND ENTER_STATUS = 'Y')) AS UNREAD_CHAT_COUNT
FROM CHAT2 C1
GROUP BY ROOM_NO;