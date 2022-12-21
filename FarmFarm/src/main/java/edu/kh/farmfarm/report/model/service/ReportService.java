package edu.kh.farmfarm.report.model.service;

import edu.kh.farmfarm.report.model.vo.Report;

public interface ReportService {

	
	/** 신고하기
	 * @param report
	 * @return result
	 */
	int insertReport(Report report);

}
