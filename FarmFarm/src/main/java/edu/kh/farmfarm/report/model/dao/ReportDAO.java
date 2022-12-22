package edu.kh.farmfarm.report.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.report.model.vo.Report;

@Repository
public class ReportDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 신고하기
	 * @param report
	 * @return result
	 */
	public int insertReport(Report report) {
		return sqlSession.insert("reportMapper.insertReport", report);
	}
	

}
