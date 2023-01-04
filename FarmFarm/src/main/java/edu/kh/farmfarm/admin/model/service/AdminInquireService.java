package edu.kh.farmfarm.admin.model.service;

import java.util.List;

import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

public interface AdminInquireService {

	/** 상담 목록 조회
	 * @return
	 */
	List<InquireRoom> selectInquireList();

	/** 상담 메세지 목록 조회
	 * @param inquireNo
	 * @return
	 */
	List<Message> selectMessageList(int inquireNo);

}
