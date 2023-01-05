package edu.kh.farmfarm.inquire.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.inquire.model.dao.InquireDAO;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;
import edu.kh.farmfarm.member.model.VO.Member;

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
			
		}
		
		return messageList;
	}
	
	
	/** 메세지 읽음처리
	 *
	 */
	@Override
	public int updateMessageRead(Map<String, Object> paramMap) {
		return dao.updateMessageRead(paramMap);
	}	
	
	
	/** 읽지않은 메세지 체크
	 *
	 */
	@Override
	public int unreadCheck(int memberNo) {
		return dao.unreadCheck(memberNo);
	}
	
	/** 메세지 삽입
	 *
	 */
	@Override
	public int insertMessage(Message msg) {
		
		if(msg.getImgFl().equals("N")) {
			msg.setMessageContent(Util.XSSHandling(msg.getMessageContent()));
		}
		
		return dao.insertMessage(msg);
	}
	
	/** 상담방에 있는 회원 번호 조회
	 *
	 */
	@Override
	public InquireRoom memberNoList(Message msg) {
		return dao.memberNoList(msg);
	}
	
	/** 전송된 사진을 서버에 저장
	 * @throws Exception 
	 * @throws  
	 *
	 */
	@Override
	public String inquireImgUpload(String webPath, String filePath, MultipartFile messageImg) throws Exception {
		
		String temp = null;
		
		String rename = null;
		
		if(messageImg.getSize() != 0) {
			
			rename = Util.fileRename(messageImg.getOriginalFilename());
			
			temp = webPath + rename;
			
		}
		

		if(rename != null) {
			
			messageImg.transferTo(new File(filePath+rename));
			
		} else {
			
			throw new Exception("파일 업로드 실패");
		}
		
		return temp;
	}
	
	@Override
	public Message selectMessage(int messageNo) {
		return dao.selectMessage(messageNo);
	}
}
