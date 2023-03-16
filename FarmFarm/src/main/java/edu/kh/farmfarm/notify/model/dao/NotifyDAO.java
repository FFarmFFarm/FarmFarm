package edu.kh.farmfarm.notify.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.notify.model.vo.Notify;
import edu.kh.farmfarm.notify.model.vo.NotifyOrder;

@Repository
public class NotifyDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 알림을 DB에 저장
	 * @return
	 */
	public int insertNewNotify(Notify notify) {
		return sqlSession.insert("notifyMapper.insertNewNotify", notify);
	}


	/** 게시글의 작성자 번호를 찾는 서비스
	 * @param targetNo
	 * @return
	 */
	public int selectBoardWriterNo(int boardNo) {
		return sqlSession.selectOne("boardMapper.selectBoardWriterNo", boardNo);
	}
	
	/** 댓글의 작성자 번호를 찾는 서비스
	 * @param targetNo
	 * @return
	 */
	public int selectCommentWriterNo(int commentNo) {
		return sqlSession.selectOne("boardMapper.selectCommentWriterNo", commentNo);
	}

	
	/** 알림 목록 조회(for nav widget, 최신 6개까지만)
	 * @param memberNo
	 * @return
	 */
	public List<Notify> selectNotifyWidgetList(int memberNo) {
		return sqlSession.selectList("notifyMapper.selectNotifyWidgetList", memberNo);
	}
	
	/** 알림 목록 조회(for notify center)
	 * @param memberNo
	 * @return
	 */
	public List<Notify> selectNotifyList(int memberNo) {
		return sqlSession.selectList("notifyMapper.selectNotifyList", memberNo);
	}


	/** 알림 읽음 처리
	 * @param notifyNo
	 * @return
	 */
	public int updateNotify(int notifyNo) {
		return sqlSession.update("notifyMapper.updateNotify", notifyNo);
	}
	
	
	/** 알림 전부 읽음처리
	 * @param notifyNo
	 * @return
	 */
	public int updateNotifyAll(String memberNickname) {
		return sqlSession.update("notifyMapper.updateNotifyAll", memberNickname);
	}
	


	/** 알림 삭제 처리
	 * @param notifyNo
	 * @return
	 */
	public int deleteNotify(int notifyNo) {
		return sqlSession.delete("notifyMapper.deleteNotify", notifyNo);
	}


	/** type에 따른 title 조회
	 * @param notifyTypeNo
	 * @return
	 */
	public String selectNotifyTitle(int notifyTypeNo) {
		return sqlSession.selectOne("notifyMapper.selectNotifyTitle", notifyTypeNo);
	}


	/** 상품 주문 알림 발생을 위한 정보 요청
	 * @param orderNo
	 * @return
	 */
	public NotifyOrder selectTransaction(int orderNo) {
		return sqlSession.selectOne("notifyMapper.selectTransaction", orderNo);
	}


	/** 게시글 삭제 여부 확인
	 * @param boardNo
	 * @return
	 */
	public int isBoardDelete(int boardNo) {
		return sqlSession.selectOne("boardMapper.selectBoardDelete", boardNo);
	}


	
	
}
