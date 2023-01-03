package edu.kh.farmfarm.inquire.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

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

	/** 안읽은 메세지 수 조회
	 * @param memberNo
	 * @return
	 */
	int unreadCheck(int memberNo);
	
	

}
