package edu.kh.farmfarm.admin.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.common.Pagination;

@Repository
public class AdminReportDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 미처리 신고 개수 (중복제거) _힌 아이디당 한 번씩 조회
	 * @param sortFilter
	 * @return reportListCount
	 */
	public int reportListCount(String sortFilter) {
		return sqlSession.selectOne("adminReportMapper.reportListCount", sortFilter);
	}

	
	
	/** 미처리 신고 개수 (중복포함) _ 한 아이디가 신고된 모든 개수 조회
	 * @return reportAllListCount
	 */
	public int reportAllListCount() {
		return sqlSession.selectOne("adminMapper.askReportStat");  // 대시보드 미처리 신고내역 통계와 같음.
	}

	
	

	/** 미처리 신고 조회
	 * @param sortFilter
	 * @param pagination
	 * @return newReportList
	 */
	public List<Admin> selectNewReport(String sortFilter, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * 15;  
		RowBounds rowBounds = new RowBounds(offset, 15);
		
		return sqlSession.selectList("adminReportMapper.selectNewReport", sortFilter, rowBounds);
	}



	/** 미처리 신고 상세 조회
	 * @param hiddenNo
	 * @return newReportDetail
	 */
	public Admin selectNewReportDetail(int reportNo) {
		return sqlSession.selectOne("adminReportMapper.selectNewReportDetail", reportNo);
	}



	/** 누적 신고 기록 조회
	 * @param reportType
	 * @param memberNo
	 * @param contentNo
	 * @return map
	 */
	public Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo, String allNew) {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("memberNo", memberNo);
		paramMap.put("reportType", reportType);
		paramMap.put("contentNo", contentNo);
		paramMap.put("allNew", allNew);
		
		List<Admin> accumMemberList = new ArrayList<Admin>();
		List<Admin> accumContentList = new ArrayList<Admin>();
		
		if(reportType != null) {
			if(reportType.equals("M")) {
				accumMemberList = sqlSession.selectList("adminReportMapper.accumMemberList", paramMap);
				
			} else {
				accumContentList = sqlSession.selectList("adminReportMapper.accumContentList", paramMap);
			}
		}
		
		 Map<String, Object> map = new HashMap<String, Object>();
		 map.put("accumMemberList", accumMemberList);
		 map.put("accumContentList", accumContentList);
		
		return map;
	}



	/** 전체 신고 기록 조회
	 * @param typeFilter
	 * @param pagination
	 * @return map
	 */
	public List<Admin> selectReportAllList(Map<String, Object> paramMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * 15;
		RowBounds rowBounds = new RowBounds(offset, 15);
		
		return sqlSession.selectList("adminReportMapper.selectReportAllList", paramMap, rowBounds);
	}



	/** 전체 신고 기록 개수 (페이지네이션용, RANKING=1 적용)
	 * @return reportAllCount
	 */
	public int reportAllCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminReportMapper.reportAllCount", paramMap);
	}



	/** 전체 신고 기록_상세 조회
	 * @param hiddenReportNo
	 * @return reportDetail
	 */
	public Admin selectReportDetail(int reportNo) {
		return sqlSession.selectOne("adminReportMapper.selectReportDetail", reportNo);
	}


}
