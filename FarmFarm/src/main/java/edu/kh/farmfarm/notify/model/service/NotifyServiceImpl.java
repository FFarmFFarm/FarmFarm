package edu.kh.farmfarm.notify.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonElement;

import edu.kh.farmfarm.notify.model.dao.NotifyDAO;
import edu.kh.farmfarm.notify.model.vo.Notify;
import edu.kh.farmfarm.notify.model.vo.NotifyOrder;

@Service
public class NotifyServiceImpl implements NotifyService {
	
	@Autowired
	private NotifyDAO dao;
	
	
	// 알림을 DB에 저장하는 서비스
	@Override
	@Transactional(rollbackFor =  Exception.class)
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
	
	// 알림 목록 조회(for notify center)
	@Override
	public List<Notify> selectNotifyList(int memberNo) {
		return dao.selectNotifyList(memberNo);
	}
	
	// 알림 읽음 처리(update)
	@Override
	@Transactional(rollbackFor =  Exception.class)
	public int updateNotify(int notifyNo) {
		return dao.updateNotify(notifyNo);
	}
	
	// 알림 전부 읽음 처리(UPDATE)
	@Override
	public int updateNotifyAll(String memberNickname) {
		return dao.updateNotifyAll(memberNickname);
	}

	// 알림 삭제 처리(delete)
	@Override
	@Transactional(rollbackFor =  Exception.class)
	public int deleteNotify(int notifyNo) {
		return dao.deleteNotify(notifyNo);
	}

	// type에 따른 title
	@Override
	public String selectNotifyTitle(int notifyTypeNo) {
		return dao.selectNotifyTitle(notifyTypeNo);
	}

	// 상품 주문 알림 발생을 위한 정보 요청
	@Override
	public List<NotifyOrder> selectTransaction(int orderNo) {
		return dao.selectTransaction(orderNo);
	}


}
