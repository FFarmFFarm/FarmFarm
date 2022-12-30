CREATE TABLE "MEMBER" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"MEMBER_ID"	VARCHAR2(50)		NOT NULL,
	"MEMBER_PW"	VARCHAR2(100)		NOT NULL,
	"MEMBER_NAME"	VARCHAR2(30)		NOT NULL,
	"MEMBER_NICKNAME"	VARCHAR2(50)		NOT NULL,
	"MEMBER_TEL"	CHAR(11)		NOT NULL,
	"MEMBER_ADDRESS"	VARCHAR2(500)		NOT NULL,
	"MEMBER_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"SIGNUP_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"AUTHORITY"	NUMBER	DEFAULT 0	NOT NULL,
	"PROFILE_IMG"	VARCHAR2(300)		NULL,
	"MYPAGE_IMG"	VARCHAR2(300)		NULL
);

COMMENT ON COLUMN "MEMBER"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "MEMBER"."MEMBER_ID" IS '회원 아이디';

COMMENT ON COLUMN "MEMBER"."MEMBER_PW" IS '회원 비밀번호';

COMMENT ON COLUMN "MEMBER"."MEMBER_NAME" IS '회원 이름';

COMMENT ON COLUMN "MEMBER"."MEMBER_NICKNAME" IS '회원:닉네임/판매자:스토어명';

COMMENT ON COLUMN "MEMBER"."MEMBER_TEL" IS '회원 전화번호';

COMMENT ON COLUMN "MEMBER"."MEMBER_ADDRESS" IS '회원 주소';

COMMENT ON COLUMN "MEMBER"."MEMBER_DEL_FL" IS '회원 탈퇴 여부';

COMMENT ON COLUMN "MEMBER"."SIGNUP_DATE" IS '회원 가입 날짜';

COMMENT ON COLUMN "MEMBER"."AUTHORITY" IS '권한(0:회원/1:판매자/2:관리자';

COMMENT ON COLUMN "MEMBER"."PROFILE_IMG" IS '프로필 이미지';

COMMENT ON COLUMN "MEMBER"."MYPAGE_IMG" IS '마이페이지 이미지(배경)';

CREATE TABLE "POST" (
	"POST_NO"	NUMBER		NOT NULL,
	"POST_TITLE"	VARCHAR2(2000)		NOT NULL,
	"POST_CONTENT"	VARCHAR2(4000)		NOT NULL,
	"POST_VIEW"	NUMBER		NULL,
	"POST_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"UNIT_PRICE"	NUMBER		NOT NULL,
	"TRADE_METHOD"	NUMBER		NOT NULL,
	"POST_DEL_FL"	CHAR(2)	DEFAULT 'N'	NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"CATEGORY_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "POST"."POST_NO" IS '판매글 번호(SEQ_POST_NO)';

COMMENT ON COLUMN "POST"."POST_TITLE" IS '판매글 제목';

COMMENT ON COLUMN "POST"."POST_CONTENT" IS '판매글 내용';

COMMENT ON COLUMN "POST"."POST_VIEW" IS '조회수';

COMMENT ON COLUMN "POST"."POST_DATE" IS '작성일';

COMMENT ON COLUMN "POST"."UNIT_PRICE" IS '단위당 가격';

COMMENT ON COLUMN "POST"."TRADE_METHOD" IS '거래방식(0:직거래, 1:택배, 2:직거래+택배)';

COMMENT ON COLUMN "POST"."POST_DEL_FL" IS '판매글 삭제 여부';

COMMENT ON COLUMN "POST"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "POST"."CATEGORY_NO" IS '상품의 카테고리 번호';

CREATE TABLE "POST_IMG" (
	"POST_IMG_NO"	NUMBER		NOT NULL,
	"POST_IMG_ADDRESS"	VARCHAR2(500)		NOT NULL,
	"POST_NO"	NUMBER		NOT NULL,
	"POST_IMG_ORDER"	NUMBER	DEFAULT 0	NOT NULL
);

COMMENT ON COLUMN "POST_IMG"."POST_IMG_NO" IS '이미지 번호(SEQ_POST_IMG_NO)';

COMMENT ON COLUMN "POST_IMG"."POST_IMG_ADDRESS" IS '이미지 경로';

COMMENT ON COLUMN "POST_IMG"."POST_NO" IS '판매글 번호(SEQ_POST_NO)';

COMMENT ON COLUMN "POST_IMG"."POST_IMG_ORDER" IS '이미지 순서';

CREATE TABLE "REVIEW" (
	"REVIEW_NO"	NUMBER		NOT NULL,
	"REVIEW_CONTENT"	VARCHAR2(4000)		NOT NULL,
	"REVIEW_SCORE"	NUMBER	DEFAULT 1	NOT NULL,
	"REVIEW_DEL_FL"	CHAR(2)	DEFAULT 'N'	NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"POST_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REVIEW"."REVIEW_NO" IS '후기번호(SEQ_REVIEW_NO)';

COMMENT ON COLUMN "REVIEW"."REVIEW_CONTENT" IS '후기 내용';

COMMENT ON COLUMN "REVIEW"."REVIEW_SCORE" IS '별점';

COMMENT ON COLUMN "REVIEW"."REVIEW_DEL_FL" IS '후기 삭제 여부';

COMMENT ON COLUMN "REVIEW"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO))';

COMMENT ON COLUMN "REVIEW"."POST_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

CREATE TABLE "REVIEW_LIKE" (
	"REVIEW_NO"	NUMBER		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REVIEW_LIKE"."REVIEW_NO" IS '후기번호(SEQ_REVIEW_NO)';

COMMENT ON COLUMN "REVIEW_LIKE"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

CREATE TABLE "REVIEW_IMG" (
	"REVIEW_IMG_NO"	NUMBER		NOT NULL,
	"REVIEW_NO"	NUMBER		NOT NULL,
	"REVIEW_IMG_PATH"	VARCHAR2(500)		NOT NULL,
	"REVIEW_IMG_ORDER"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "REVIEW_IMG"."REVIEW_IMG_NO" IS '후기이미지번호(SEQ_REVIEW_IMG_NO)';

COMMENT ON COLUMN "REVIEW_IMG"."REVIEW_NO" IS '후기번호(SEQ_REVIEW_NO)';

COMMENT ON COLUMN "REVIEW_IMG"."REVIEW_IMG_PATH" IS '후기이미지 경로';

COMMENT ON COLUMN "REVIEW_IMG"."REVIEW_IMG_ORDER" IS '후기이미지 순서';

CREATE TABLE "ORDER" (
	"ORDER_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"ORDER_AMOUNT"	NUMBER		NOT NULL,
	"ORDER_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"ORDER_STATUS"	NUMBER		NOT NULL,
	"INVOICE_NO"	NUMBER		NULL
);

COMMENT ON COLUMN "ORDER"."ORDER_NO" IS '주문 번호(SEQ_ORDER_NO)';

COMMENT ON COLUMN "ORDER"."PRODUCT_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "ORDER"."ORDER_AMOUNT" IS '주문 수량';

COMMENT ON COLUMN "ORDER"."ORDER_DATE" IS '주문일';

COMMENT ON COLUMN "ORDER"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "ORDER"."ORDER_STATUS" IS '0: 결제완료, 1: 배송중, 2: 취소완료';

COMMENT ON COLUMN "ORDER"."INVOICE_NO" IS '송장번호';

CREATE TABLE "ORDER_CANCEL" (
	"ORDER_NO"	NUMBER		NOT NULL,
	"CANCEL_REASON"	NUMBER		NOT NULL,
	"CANCEL_STATUS"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "ORDER_CANCEL"."ORDER_NO" IS '주문 번호(SEQ_ORDER_NO)';

COMMENT ON COLUMN "ORDER_CANCEL"."CANCEL_REASON" IS '0: 단순변심, 1: 상품하자';

COMMENT ON COLUMN "ORDER_CANCEL"."CANCEL_STATUS" IS '0: 접수완료, 1: 처리완료, 2:거절';

CREATE TABLE "BOARD" (
	"BOARD_NO"	NUMBER		NOT NULL,
	"BOARD_TITLE"	VARCHAR2(2000)		NOT NULL,
	"BOARD_CONTENT"	VARCHAR2(4000)		NOT NULL,
	"BOARD_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"BOARD_UPDATE_DATE"	DATE	DEFAULT SYSDATE	NULL,
	"BOARD_VIEW"	NUMBER	DEFAULT 0	NULL,
	"BOARD_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"BOARD_TYPE_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "BOARD"."BOARD_NO" IS '게시글 번호(SEQ_BOARD_NO)';

COMMENT ON COLUMN "BOARD"."BOARD_TITLE" IS '게시글 제목';

COMMENT ON COLUMN "BOARD"."BOARD_CONTENT" IS '게시글 내용';

COMMENT ON COLUMN "BOARD"."BOARD_DATE" IS '게시글 작성일';

COMMENT ON COLUMN "BOARD"."BOARD_UPDATE_DATE" IS '게시글 수정일';

COMMENT ON COLUMN "BOARD"."BOARD_VIEW" IS '게시글 조회수';

COMMENT ON COLUMN "BOARD"."BOARD_DEL_FL" IS '게시글 삭제 여부';

COMMENT ON COLUMN "BOARD"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "BOARD"."BOARD_TYPE_NO" IS '게시판 번호(SEQ_BOARD_TYPE_NO)';

CREATE TABLE "REPORT" (
	"REPORT_NO"	NUMBER		NOT NULL,
	"REPORT_TYPE"	VARCHAR2(3)		NOT NULL,
	"REPORT_MEMBER_NO"	NUMBER		NOT NULL,
	"REPORT_TARGET_NO"	NUMBER		NOT NULL,
	"REPORT_REASON"	VARCHAR2(1000)		NULL,
	"REPORT_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"REPORT_PENALTY"	VARCHAR2(3)	DEFAULT 'N'	NOT NULL,
	"PROCESS_DATE"	VARCHAR2(100)		NULL
);

COMMENT ON COLUMN "REPORT"."REPORT_NO" IS '신고 번호(SEQ_REPORT_NO)';

COMMENT ON COLUMN "REPORT"."REPORT_TYPE" IS '신고 대상(회원:M, 게시글:B, 댓글:C, 후기:R)';

COMMENT ON COLUMN "REPORT"."REPORT_MEMBER_NO" IS '신고하는 사람 회원번호';

COMMENT ON COLUMN "REPORT"."REPORT_TARGET_NO" IS '신고 당하는 대상 번호';

COMMENT ON COLUMN "REPORT"."REPORT_REASON" IS '신고 사유';

COMMENT ON COLUMN "REPORT"."REPORT_DATE" IS '신고한 일자';

COMMENT ON COLUMN "REPORT"."REPORT_PENALTY" IS '계정 정지 여부(정지:Y, 활성화:N)';

COMMENT ON COLUMN "REPORT"."PROCESS_DATE" IS '신고 후 계정 처리 일자';

CREATE TABLE "BOARD_TYPE" (
	"BOARD_TYPE_NO"	NUMBER		NOT NULL,
	"BOARD_NAME"	VARCHAR2(30)		NULL
);

COMMENT ON COLUMN "BOARD_TYPE"."BOARD_TYPE_NO" IS '게시판 번호(SEQ_BOARD_TYPE_NO)';

COMMENT ON COLUMN "BOARD_TYPE"."BOARD_NAME" IS '게시판 이름';

CREATE TABLE "BOARD_IMG" (
	"BOARD_IMG_NO"	NUMBER		NOT NULL,
	"BOARD_NO"	NUMBER		NOT NULL,
	"BOARD_IMG_ADDRESS"	VARCHAR2(3000)		NOT NULL,
	"BOARD_IMG_ORDER"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "BOARD_IMG"."BOARD_IMG_NO" IS '이미지 번호(SEQ_BOARD_IMG_NO)';

COMMENT ON COLUMN "BOARD_IMG"."BOARD_NO" IS '게시글 번호(SEQ_BOARD_NO)';

COMMENT ON COLUMN "BOARD_IMG"."BOARD_IMG_ADDRESS" IS '이미지 주소';

COMMENT ON COLUMN "BOARD_IMG"."BOARD_IMG_ORDER" IS '이미지 순서';

CREATE TABLE "BOARD_LIKE" (
	"BOARD_NO2"	NUMBER		NOT NULL,
	"MEMBER_NO2"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "BOARD_LIKE"."BOARD_NO2" IS '게시글 번호(SEQ_BOARD_NO)';

COMMENT ON COLUMN "BOARD_LIKE"."MEMBER_NO2" IS '회원번호(SEQ_MEMBER_NO)';

CREATE TABLE "COMMENT" (
	"COMMENT_NO"	NUMBER		NOT NULL,
	"COMMENT_CONTENT"	VARCHAR2(4000)		NOT NULL,
	"COMMENT_DATE"	VARCHAR2(100)	DEFAULT SYSDATE	NULL,
	"COMMENT_PARENT"	NUMBER		NOT NULL,
	"COMMENT_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"BOARD_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "COMMENT"."COMMENT_NO" IS '댓글번호(SEQ_COMMENT_NO)';

COMMENT ON COLUMN "COMMENT"."COMMENT_CONTENT" IS '댓글 내용';

COMMENT ON COLUMN "COMMENT"."COMMENT_DATE" IS '댓글 작성일';

COMMENT ON COLUMN "COMMENT"."COMMENT_PARENT" IS '부모 댓글 번호';

COMMENT ON COLUMN "COMMENT"."COMMENT_DEL_FL" IS '댓글 삭제 여부';

COMMENT ON COLUMN "COMMENT"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "COMMENT"."BOARD_NO" IS '게시글 번호(SEQ_BOARD_NO)';

CREATE TABLE "ALARM" (
	"ALARM_NO"	NUMBER		NOT NULL,
	"ALARM_TYPE_NO"	NUMBER		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"ALARM_CONTENT"	VARCHAR2(2000)		NOT NULL,
	"ALARM_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "ALARM"."ALARM_NO" IS '알림 번호(SEQ_ALARM_NO)';

COMMENT ON COLUMN "ALARM"."ALARM_TYPE_NO" IS '알림 유형(PK)';

COMMENT ON COLUMN "ALARM"."MEMBER_NO" IS '알림을 받은 회원의 번호';

COMMENT ON COLUMN "ALARM"."ALARM_CONTENT" IS '알림 내용';

COMMENT ON COLUMN "ALARM"."ALARM_DATE" IS '알림 시간';

CREATE TABLE "CHATTING ROOM" (
	"ROOM_NO"	NUMBER		NOT NULL,
	"ROOM_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"MEMBER_NO2"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHATTING ROOM"."ROOM_NO" IS '채팅방 번호(SEQ_ROOM_NO)';

COMMENT ON COLUMN "CHATTING ROOM"."ROOM_DATE" IS '채팅방 개설일';

COMMENT ON COLUMN "CHATTING ROOM"."MEMBER_NO" IS '개설자 회원번호';

COMMENT ON COLUMN "CHATTING ROOM"."MEMBER_NO2" IS '참여자 회원번호';

CREATE TABLE "MESSAGE" (
	"MESSAGE_NO"	NUMBER		NOT NULL,
	"ROOM_NO"	NUMBER		NOT NULL,
	"MESSAGE_CONTENT"	VARCHAR2(1000)		NOT NULL,
	"SEND_MEMBER_NO"	NUMBER		NOT NULL,
	"Field"	VARCHAR(255)		NULL,
	"Field2"	VARCHAR(255)		NULL
);

COMMENT ON COLUMN "MESSAGE"."MESSAGE_NO" IS '메세지 번호(SEQ_MESSAGE_NO)';

COMMENT ON COLUMN "MESSAGE"."ROOM_NO" IS '채팅방 번호';

COMMENT ON COLUMN "MESSAGE"."MESSAGE_CONTENT" IS '메세지 내용';

COMMENT ON COLUMN "MESSAGE"."SEND_MEMBER_NO" IS '메세지를 발신한 회원의 번호';

CREATE TABLE "SELLER" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"FARM_IMG"	VARCHAR2(500)		NOT NULL
);

COMMENT ON COLUMN "SELLER"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "SELLER"."FARM_IMG" IS '농장 인증 사진';

CREATE TABLE "WISH" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"POST_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "WISH"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "WISH"."POST_NO" IS '판매글 번호(SEQ_POST_NO)';

CREATE TABLE "CATEGORY" (
	"CATEGORY_NO"	NUMBER		NOT NULL,
	"CATEGORY_NAME"	VARCHAR2(60)		NOT NULL
);

COMMENT ON COLUMN "CATEGORY"."CATEGORY_NO" IS '상품의 카테고리 번호';

COMMENT ON COLUMN "CATEGORY"."CATEGORY_NAME" IS '상품의 카테고리 대분류';

CREATE TABLE "ALARM_TYPE" (
	"ALARM_TYPE_NO"	NUMBER		NOT NULL,
	"ALARM_DETAIL"	VARCHAR2(30)		NOT NULL
);

COMMENT ON COLUMN "ALARM_TYPE"."ALARM_TYPE_NO" IS '알림 유형(PK)';

COMMENT ON COLUMN "ALARM_TYPE"."ALARM_DETAIL" IS '알림 유형 내용';

CREATE TABLE "STOCK" (
	"Key"	VARCHAR(255)		NOT NULL,
	"Field"	VARCHAR(255)		NULL,
	"POST_NO"	NUMBER		NOT NULL,
	"Field2"	VARCHAR(255)		NULL,
	"Field3"	VARCHAR(255)		NULL
);

COMMENT ON COLUMN "STOCK"."Field" IS '입출고내역(0: 입고, 1: 판매, 2: 폐기)';

COMMENT ON COLUMN "STOCK"."POST_NO" IS '판매글 번호(SEQ_POST_NO)';

CREATE TABLE "PRODUCT" (
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_NAME"	VARCHAR2(2000)		NOT NULL,
	"PRODUCT_CONTENT"	VARCHAR2(4000)		NOT NULL,
	"PRODUCT_VIEW"	NUMBER		NULL,
	"REG_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"PRODUCT_PRICE"	NUMBER		NOT NULL,
	"POST_DEL_FL"	CHAR(2)	DEFAULT 'N'	NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"CATEGORY_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "PRODUCT"."PRODUCT_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_NAME" IS '판매글 제목';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_CONTENT" IS '판매글 내용';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_VIEW" IS '조회수';

COMMENT ON COLUMN "PRODUCT"."REG_DATE" IS '상품등록일';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_PRICE" IS '상품 가격';

COMMENT ON COLUMN "PRODUCT"."POST_DEL_FL" IS '판매글 삭제 여부';

COMMENT ON COLUMN "PRODUCT"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "PRODUCT"."CATEGORY_NO" IS '상품의 카테고리 번호';

CREATE TABLE "PRODUCT_IMG" (
	"POST_IMG_NO"	NUMBER		NOT NULL,
	"POST_IMG_ADDRESS"	VARCHAR2(500)		NOT NULL,
	"POST_NO"	NUMBER		NOT NULL,
	"POST_IMG_ORDER"	NUMBER	DEFAULT 0	NOT NULL
);

COMMENT ON COLUMN "PRODUCT_IMG"."POST_IMG_NO" IS '이미지 번호(SEQ_POST_IMG_NO)';

COMMENT ON COLUMN "PRODUCT_IMG"."POST_IMG_ADDRESS" IS '이미지 경로';

COMMENT ON COLUMN "PRODUCT_IMG"."POST_NO" IS '판매글 번호(SEQ_POST_NO)';

COMMENT ON COLUMN "PRODUCT_IMG"."POST_IMG_ORDER" IS '이미지 순서';

CREATE TABLE "CATEGORY_SUB" (
	"CATEGORY_SUB_NO"	NUMBER		NOT NULL,
	"CATEGORY_NO"	NUMBER		NOT NULL,
	"CATEGORY_SUB_NAME"	VARCHAR2(60)		NOT NULL
);

COMMENT ON COLUMN "CATEGORY_SUB"."CATEGORY_SUB_NO" IS '상품의 하위 카테고리 번호';

COMMENT ON COLUMN "CATEGORY_SUB"."CATEGORY_NO" IS '상품의 카테고리 번호';

COMMENT ON COLUMN "CATEGORY_SUB"."CATEGORY_SUB_NAME" IS '상품의 하위 카테고리 이름';




--반품 테이블
CREATE TABLE "RETURN" (
	"RETURN_NO"	NUMBER		NOT NULL,
	"ORDER_NO"	NUMBER		NOT NULL,
	"RETURN_STATUS"	CHAR(1)	DEFAULT 0	NOT NULL,
	"RETURN_REASON"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "RETURN"."RETURN_NO" IS '반품 번호';

COMMENT ON COLUMN "RETURN"."ORDER_NO" IS '주문 번호(SEQ_ORDER_NO)';

COMMENT ON COLUMN "RETURN"."RETURN_STATUS" IS '0:반품진행중 1: 반품완료 2:반려';

COMMENT ON COLUMN "RETURN"."RETURN_REASON" IS '0:단순변심 1: 상품하자';

CREATE TABLE "RETURN_PRODUCT" (
	"RETURN_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_AMOUNT"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "RETURN_PRODUCT"."RETURN_NO" IS '반품 번호';

COMMENT ON COLUMN "RETURN_PRODUCT"."PRODUCT_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "RETURN_PRODUCT"."PRODUCT_AMOUNT" IS '반품 수량';

ALTER TABLE "RETURN" ADD CONSTRAINT "PK_RETURN" PRIMARY KEY (
	"RETURN_NO"
);

ALTER TABLE "RETURN" ADD CONSTRAINT "FK_ORDER_TO_RETURN_1" FOREIGN KEY (
	"ORDER_NO"
)
REFERENCES "ORDER" (
	"ORDER_NO"
);

ALTER TABLE "RETURN_PRODUCT" ADD CONSTRAINT "FK_RETURN_TO_RETURN_PRODUCT_1" FOREIGN KEY (
	"RETURN_NO"
)
REFERENCES "RETURN" (
	"RETURN_NO"
);

ALTER TABLE "RETURN_PRODUCT" ADD CONSTRAINT "FK_PRODUCT_TO_RETURN_PRODUCT_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);







ALTER TABLE "MEMBER" ADD CONSTRAINT "PK_MEMBER" PRIMARY KEY (
	"MEMBER_NO"
);

ALTER TABLE "POST" ADD CONSTRAINT "PK_POST" PRIMARY KEY (
	"POST_NO"
);

ALTER TABLE "POST_IMG" ADD CONSTRAINT "PK_POST_IMG" PRIMARY KEY (
	"POST_IMG_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "PK_REVIEW" PRIMARY KEY (
	"REVIEW_NO"
);

ALTER TABLE "REVIEW_LIKE" ADD CONSTRAINT "PK_REVIEW_LIKE" PRIMARY KEY (
	"REVIEW_NO",
	"MEMBER_NO"
);

ALTER TABLE "REVIEW_IMG" ADD CONSTRAINT "PK_REVIEW_IMG" PRIMARY KEY (
	"REVIEW_IMG_NO"
);

ALTER TABLE "ORDER" ADD CONSTRAINT "PK_ORDER" PRIMARY KEY (
	"ORDER_NO"
);

ALTER TABLE "ORDER_CANCEL" ADD CONSTRAINT "PK_ORDER_CANCEL" PRIMARY KEY (
	"ORDER_NO"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "PK_BOARD" PRIMARY KEY (
	"BOARD_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "PK_REPORT" PRIMARY KEY (
	"REPORT_NO"
);

ALTER TABLE "BOARD_TYPE" ADD CONSTRAINT "PK_BOARD_TYPE" PRIMARY KEY (
	"BOARD_TYPE_NO"
);

ALTER TABLE "BOARD_IMG" ADD CONSTRAINT "PK_BOARD_IMG" PRIMARY KEY (
	"BOARD_IMG_NO",
	"BOARD_NO"
);

ALTER TABLE "BOARD_LIKE" ADD CONSTRAINT "PK_BOARD_LIKE" PRIMARY KEY (
	"BOARD_NO2",
	"MEMBER_NO2"
);

ALTER TABLE "COMMENT" ADD CONSTRAINT "PK_COMMENT" PRIMARY KEY (
	"COMMENT_NO"
);

ALTER TABLE "ALARM" ADD CONSTRAINT "PK_ALARM" PRIMARY KEY (
	"ALARM_NO"
);

ALTER TABLE "CHATTING ROOM" ADD CONSTRAINT "PK_CHATTING ROOM" PRIMARY KEY (
	"ROOM_NO"
);

ALTER TABLE "MESSAGE" ADD CONSTRAINT "PK_MESSAGE" PRIMARY KEY (
	"MESSAGE_NO"
);

ALTER TABLE "SELLER" ADD CONSTRAINT "PK_SELLER" PRIMARY KEY (
	"MEMBER_NO"
);

ALTER TABLE "WISH" ADD CONSTRAINT "PK_WISH" PRIMARY KEY (
	"MEMBER_NO",
	"POST_NO"
);

ALTER TABLE "CATEGORY" ADD CONSTRAINT "PK_CATEGORY" PRIMARY KEY (
	"CATEGORY_NO"
);

ALTER TABLE "ALARM_TYPE" ADD CONSTRAINT "PK_ALARM_TYPE" PRIMARY KEY (
	"ALARM_TYPE_NO"
);

ALTER TABLE "STOCK" ADD CONSTRAINT "PK_STOCK" PRIMARY KEY (
	"Key"
);

ALTER TABLE "PRODUCT" ADD CONSTRAINT "PK_PRODUCT" PRIMARY KEY (
	"PRODUCT_NO"
);

ALTER TABLE "PRODUCT_IMG" ADD CONSTRAINT "PK_PRODUCT_IMG" PRIMARY KEY (
	"POST_IMG_NO"
);

ALTER TABLE "CATEGORY_SUB" ADD CONSTRAINT "PK_CATEGORY_SUB" PRIMARY KEY (
	"CATEGORY_SUB_NO"
);

ALTER TABLE "POST" ADD CONSTRAINT "FK_MEMBER_TO_POST_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "POST" ADD CONSTRAINT "FK_CATEGORY_TO_POST_1" FOREIGN KEY (
	"CATEGORY_NO"
)
REFERENCES "CATEGORY_SUB" (
	"CATEGORY_SUB_NO"
);

ALTER TABLE "POST_IMG" ADD CONSTRAINT "FK_POST_TO_POST_IMG_1" FOREIGN KEY (
	"POST_NO"
)
REFERENCES "POST" (
	"POST_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_MEMBER_TO_REVIEW_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_PRODUCT_TO_REVIEW_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);
ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_ORDER_TO_REVIEW_1" FOREIGN KEY (
	"ORDER_NO"
)
REFERENCES "ORDER" (
	"ORDER_NO"
);

ALTER TABLE "REVIEW_LIKE" ADD CONSTRAINT "FK_REVIEW_TO_REVIEW_LIKE_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "REVIEW_LIKE" ADD CONSTRAINT "FK_MEMBER_TO_REVIEW_LIKE_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "REVIEW_IMG" ADD CONSTRAINT "FK_REVIEW_TO_REVIEW_IMG_1" FOREIGN KEY (
	"REVIEW_NO"
)
REFERENCES "REVIEW" (
	"REVIEW_NO"
);

ALTER TABLE "ORDER" ADD CONSTRAINT "FK_PRODUCT_TO_ORDER_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "ORDER" ADD CONSTRAINT "FK_MEMBER_TO_ORDER_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "ORDER_CANCEL" ADD CONSTRAINT "FK_ORDER_TO_ORDER_CANCEL_1" FOREIGN KEY (
	"ORDER_NO"
)
REFERENCES "ORDER" (
	"ORDER_NO"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "FK_MEMBER_TO_BOARD_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "FK_BOARD_TYPE_TO_BOARD_1" FOREIGN KEY (
	"BOARD_TYPE_NO"
)
REFERENCES "BOARD_TYPE" (
	"BOARD_TYPE_NO"
);

ALTER TABLE "BOARD_IMG" ADD CONSTRAINT "FK_BOARD_TO_BOARD_IMG_1" FOREIGN KEY (
	"BOARD_NO"
)
REFERENCES "BOARD" (
	"BOARD_NO"
);

ALTER TABLE "BOARD_LIKE" ADD CONSTRAINT "FK_BOARD_TO_BOARD_LIKE_1" FOREIGN KEY (
	"BOARD_NO2"
)
REFERENCES "BOARD" (
	"BOARD_NO"
);

ALTER TABLE "BOARD_LIKE" ADD CONSTRAINT "FK_MEMBER_TO_BOARD_LIKE_1" FOREIGN KEY (
	"MEMBER_NO2"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_MEMBER_TO_COMMENT_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_BOARD_TO_COMMENT_1" FOREIGN KEY (
	"BOARD_NO"
)
REFERENCES "BOARD" (
	"BOARD_NO"
);

ALTER TABLE "ALARM" ADD CONSTRAINT "FK_ALARM_TYPE_TO_ALARM_1" FOREIGN KEY (
	"ALARM_TYPE_NO"
)
REFERENCES "ALARM_TYPE" (
	"ALARM_TYPE_NO"
);

ALTER TABLE "ALARM" ADD CONSTRAINT "FK_MEMBER_TO_ALARM_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "CHATTING ROOM" ADD CONSTRAINT "FK_MEMBER_TO_CHATTING ROOM_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "CHATTING ROOM" ADD CONSTRAINT "FK_MEMBER_TO_CHATTING ROOM_2" FOREIGN KEY (
	"MEMBER_NO2"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "MESSAGE" ADD CONSTRAINT "FK_CHATTING ROOM_TO_MESSAGE_1" FOREIGN KEY (
	"ROOM_NO"
)
REFERENCES "CHATTING ROOM" (
	"ROOM_NO"
);

ALTER TABLE "MESSAGE" ADD CONSTRAINT "FK_MEMBER_TO_MESSAGE_1" FOREIGN KEY (
	"SEND_MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "SELLER" ADD CONSTRAINT "FK_MEMBER_TO_SELLER_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "WISH" ADD CONSTRAINT "FK_MEMBER_TO_WISH_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "WISH" ADD CONSTRAINT "FK_RRODUCT_TO_WISH_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "STOCK" ADD CONSTRAINT "FK_POST_TO_STOCK_1" FOREIGN KEY (
	"POST_NO"
)
REFERENCES "POST" (
	"POST_NO"
);

ALTER TABLE "PRODUCT" ADD CONSTRAINT "FK_MEMBER_TO_PRODUCT_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "PRODUCT" ADD CONSTRAINT "FK_CATEGORY_TO_PRODUCT_1" FOREIGN KEY (
	"CATEGORY_NO"
)
REFERENCES "CATEGORY" (
	"CATEGORY_NO"
);

ALTER TABLE "PRODUCT_IMG" ADD CONSTRAINT "FK_PRODUCT_TO_PRODUCT_IMG_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "CATEGORY_SUB" ADD CONSTRAINT "FK_CATEGORY_TO_CATEGORY_SUB_1" FOREIGN KEY (
	"CATEGORY_NO"
)
REFERENCES "CATEGORY" (
	"CATEGORY_NO"
);

CREATE TABLE "ADDRESS" (
	"ADDRESS_NO"	NUMBER		NOT NULL,
	"MEMBER_ADDRESS"	VARCHAR2(500)		NOT NULL,
	"DEFAULT_FL"	CHAR(2)	DEFAULT 'N'	NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "ADDRESS"."ADDRESS_NO" IS '주소번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "ADDRESS"."MEMBER_ADDRESS" IS '회원주소';

COMMENT ON COLUMN "ADDRESS"."DEFAULT_FL" IS '기본 배송지 여부';

COMMENT ON COLUMN "ADDRESS"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

CREATE TABLE "CART" (
	"MEMBER_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_AMOUNT"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CART"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "CART"."PRODUCT_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "CART"."PRODUCT_AMOUNT" IS '추가한 상품수';

ALTER TABLE "ADDRESS" ADD CONSTRAINT "PK_ADDRESS" PRIMARY KEY (
	"ADDRESS_NO"
);

ALTER TABLE "CART" ADD CONSTRAINT "PK_CART" PRIMARY KEY (
	"MEMBER_NO",
	"PRODUCT_NO"
);

ALTER TABLE "ADDRESS" ADD CONSTRAINT "FK_MEMBER_TO_ADDRESS_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "CART" ADD CONSTRAINT "FK_MEMBER_TO_CART_1" FOREIGN KEY (
	"MEMBER_NO"
)
REFERENCES "MEMBER" (
	"MEMBER_NO"
);

ALTER TABLE "CART" ADD CONSTRAINT "FK_PRODUCT_TO_CART_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);




CREATE TABLE "ORDER_PRODUCT" (
	"ORDER_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_AMOUNT"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "ORDER_PRODUCT"."ORDER_NO" IS '주문 번호(SEQ_ORDER_NO)';

COMMENT ON COLUMN "ORDER_PRODUCT"."PRODUCT_NO" IS '판매글 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "ORDER_PRODUCT"."PRODUCT_AMOUNT" IS '상품 수량';

ALTER TABLE "ORDER_PRODUCT" ADD CONSTRAINT "PK_ORDER_PRODUCT" PRIMARY KEY (
	"ORDER_NO",
	"PRODUCT_NO"
);

ALTER TABLE "ORDER_PRODUCT" ADD CONSTRAINT "FK_ORDER_TO_ORDER_PRODUCT_1" FOREIGN KEY (
	"ORDER_NO"
)
REFERENCES "ORDER" (
	"ORDER_NO"
);

ALTER TABLE "ORDER_PRODUCT" ADD CONSTRAINT "FK_PRODUCT_TO_ORDER_PRODUCT_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);







-- 시퀀스 생성
CREATE SEQUENCE SEQ_REVIEW_NO NOCACHE;
CREATE SEQUENCE SEQ_REVIEW_IMG_NO NOCACHE;
CREATE SEQUENCE SEQ_ORDER_NO NOCACHE;
CREATE SEQUENCE SEQ_REPORT_NO NOCACHE;
CREATE SEQUENCE SEQ_COMMENT_NO NOCACHE;
CREATE SEQUENCE SEQ_BOARD_NO NOCACHE;
CREATE SEQUENCE SEQ_BOARD_TYPE_NO NOCACHE;
CREATE SEQUENCE SEQ_BOARD_IMG_NO NOCACHE;
CREATE SEQUENCE SEQ_ALARM_NO NOCACHE;
CREATE SEQUENCE SEQ_MESSAGE_NO NOCACHE;
CREATE SEQUENCE SEQ_ROOM_NO NOCACHE;
CREATE SEQUENCE SEQ_POST_NO NOCACHE;
CREATE SEQUENCE SEQ_POST_IMG_NO NOCACHE;
CREATE SEQUENCE SEQ_STOCK_NO NOCACHE;
CREATE SEQUENCE SEQ_PRODUCT_NO NOCACHE;
CREATE SEQUENCE SEQ_PRODUCT_IMG_NO NOCACHE;
CREATE SEQUENCE SEQ_MEMBER_NO NOCACHE;
CREATE SEQUENCE SEQ_ADDRESS_NO NOCACHE;
CREATE SEQUENCE SEQ_RETURN_NO NOCACHE;

