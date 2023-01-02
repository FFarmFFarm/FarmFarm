package edu.kh.farmfarm.notify.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.farmfarm.notify.model.vo.Notify;

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
}	
