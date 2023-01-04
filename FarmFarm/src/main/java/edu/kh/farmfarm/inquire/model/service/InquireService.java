package edu.kh.farmfarm.inquire.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;
import edu.kh.farmfarm.member.model.VO.Member;

public interface InquireService{

	/** 채팅방이 존재하는 지 확인
	 * @param map
	 * @return
	 */
	int checkInquireRoom(Map<String, Integer> map);

	/** 상담방 생성
	 * @param map
	 * @return
	 */
	int createInquireRoom(Map<String, Integer> map);

	/** 상담방 상세 조회
	 * @param inquireNo
	 * @return
	 */
	List<Message> selectInquire(int inquireNo);
	
	int updateMessageRead(Map<String, Object> paramMap);

	/** 안읽은 메세지 수 조회
	 * @param memberNo
	 * @return
	 */
	int unreadCheck(int memberNo);

	/** 메세지 삽입
	 * @param msg
	 * @return
	 */
	int insertMessage(Message msg);

	/** 상담방에 있는 멤버 번호 조회
	 * @param msg
	 * @return
	 */
	InquireRoom memberNoList(Message msg);

	
	/** 전송된 사진을 서버에 전달
	 * @param webPath
	 * @param filePath
	 * @param messageImg
	 * @return
	 */
	String inquireImgUpload(String webPath, String filePath, MultipartFile messageImg) throws Exception;

	/** 메세지 하나 조회
	 * @param messageNo
	 * @return
	 */
	Message selectMessage(int messageNo);
	
	

}
