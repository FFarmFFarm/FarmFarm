package edu.kh.farmfarm.notify.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.notify.model.vo.Notify;

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
	
	
}
