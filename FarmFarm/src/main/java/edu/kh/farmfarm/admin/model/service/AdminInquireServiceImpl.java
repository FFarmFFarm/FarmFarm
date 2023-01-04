package edu.kh.farmfarm.admin.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminDAO;
import edu.kh.farmfarm.admin.model.dao.AdminInquireDAO;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

@Service
public class AdminInquireServiceImpl implements AdminInquireService{
	
	@Autowired
	private AdminInquireDAO dao;
	
	/** 상담방 목록 조회
	 *
	 */
	@Override
	public List<InquireRoom> selectInquireList() {
		return dao.selectInquireList();
	}
	
	/** 상담방 메세지 목록 조회
	 *
	 */
	@Override
	public List<Message> selectMessageList(int inquireNo) {
		return dao.selectMessageList(inquireNo);
	}

}
