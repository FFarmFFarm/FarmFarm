package edu.kh.farmfarm.inquire.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.inquire.model.dao.InquireDAO;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

@Service
public class InquireServiceImpl implements InquireService {
	
	@Autowired
	private InquireDAO dao;
	
	/** 상담방이 존재하는지 확인
	 *
	 */
	@Override
	public int checkInquireRoom(Map<String, Integer> map) {
		return dao.checkInquireRoom(map);
	}

	
	/** 상담 방 생성
	 *
	 */
	@Override
	public int createInquireRoom(Map<String, Integer> map) {
		int inquireNo = dao.createInquireRoom(map);
		
		if(inquireNo > 0) {
			dao.insertFirstMessage(map);
		}
		
		return inquireNo;
	}
	
	
	/** 상담방 상세 조회
	 *
	 */
	@Override
	public List<Message> selectInquire(int inquireNo) {
		
		List<Message> messageList = dao.selectInquire(inquireNo);
		
		if(messageList.size() > 0) {
			dao.messageRead(inquireNo);
		}
		
		return messageList;
	}
	
	@Override
	public int unreadCheck(int memberNo) {
		return dao.unreadCheck(memberNo);
	}
}
