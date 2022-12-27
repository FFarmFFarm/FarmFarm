package edu.kh.farmfarm.chat.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.chat.model.dao.ChatWidgetDAO;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;

@Service
public class ChatWidgetServiceImpl implements ChatWidgetService {
	
	@Autowired
	private ChatWidgetDAO dao;

	@Override
	public List<ChatRoom> getMyChatWidget(int myMemberNo) {
		return dao.getMyChatWidget(myMemberNo);
	}
	
}
