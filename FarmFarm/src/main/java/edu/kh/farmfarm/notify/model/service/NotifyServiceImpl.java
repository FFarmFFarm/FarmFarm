package edu.kh.farmfarm.notify.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.notify.model.dao.NotifyDAO;
import edu.kh.farmfarm.notify.model.vo.Notify;

@Service
public class NotifyServiceImpl implements NotifyService {
	
	@Autowired
	private NotifyDAO dao;
	
	
	// 알림을 DB에 저장하는 서비스
	@Override
	public int insertNewNotify(Notify alarm) {
		return dao.insertNewNotify(alarm);
	}

	// 게시글 또는 댓글의 작성자를 찾아주는 서비스
	@Override
	public int selectTargetNo(String type, int inputNo) {
		int result = -1;
		
		if(type.equals("board")) { // 게시글인 경우 게시글의 작성자 번호를 찾는 dao 실행
			int boardNo = inputNo;
			result = dao.selectBoardWriterNo(boardNo);
		} 
		
		if(type.equals("comment")) { // 댓글인 경우 댓글의 작성자 번호를 찾는 dao 실행
			int commentNo = inputNo;
			result = dao.selectCommentWriterNo(commentNo);
		}
		
		return result;
	}

	// 알림 목록 조회(for nav widget, 최신 6개까지만)
	@Override
	public List<Notify> selectNotifyWidgetList(int memberNo) {
		return dao.selectNotifyWidgetList(memberNo);
	}
}
