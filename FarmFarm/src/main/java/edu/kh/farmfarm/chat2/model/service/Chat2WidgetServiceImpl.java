package edu.kh.farmfarm.chat2.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.chat2.model.dao.Chat2WidgetDAO;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

@Service
public class Chat2WidgetServiceImpl implements Chat2WidgetService {
	
	@Autowired
	private Chat2WidgetDAO dao;

	// 내 채팅방 목록 조회(SELECT, LIMIT 6)
	@Override
	public List<Chat2Room> selectChatWidgetList(int memberNo) {
		return dao.selectChatWidgetList(memberNo);
	}	
}
