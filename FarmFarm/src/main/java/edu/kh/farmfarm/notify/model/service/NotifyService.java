package edu.kh.farmfarm.notify.model.service;

import java.util.List;
import java.util.Map;

import com.google.gson.JsonElement;

import edu.kh.farmfarm.notify.model.vo.Notify;
import edu.kh.farmfarm.notify.model.vo.NotifyOrder;

public interface NotifyService {

	
	/** 알림을 DB에 저장하는 서비스
	 * @param notify
	 * @return
	 */
	int insertNewNotify(Notify notify);

	/** 게시글 또는 댓글의 작성자를 찾는 서비스
	 * @param type
	 * @param targetNo
	 * @return
	 */
	int selectTargetNo(String type, int inputNo);

	/** 알림 목록 조회(for nav widget, 최신 6개까지만)
	 * @param memberNo
	 * @return
	 */
	List<Notify> selectNotifyWidgetList(int memberNo);
	
	/** 알림 목록 조회(for notify center)
	 * @param memberNo
	 * @return
	 */
	List<Notify> selectNotifyList(int memberNo);

	/** 알림 읽음 처리(update)
	 * @param notifyNo
	 * @return
	 */
	int updateNotify(int notifyNo);
	

	/** 알림 전부 읽음처리(UPDATE)
	 * @param notifyNo
	 * @return
	 */
	int updateNotifyAll(String memberNickname);

	/** 알림 삭제 처리(delete)
	 * @param notifyNo
	 * @return
	 */
	int deleteNotify(int notifyNo);

	/** type에 따른 title
	 * @param notifyTypeNo
	 * @return
	 */
	String selectNotifyTitle(int notifyTypeNo);

	/** 상품 주문 알림 발생을 위한 정보 요청
	 * @param orderNo
	 * @return
	 */
	List<NotifyOrder> selectTransaction(int orderNo);

	
	
}	
