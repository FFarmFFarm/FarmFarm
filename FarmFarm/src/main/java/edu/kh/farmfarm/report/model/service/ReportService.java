package edu.kh.farmfarm.report.model.service;

import java.util.Map;

public interface ReportService {

	/** 신고하기
	 * @param map
	 * @return result
	 */
	int insertReport(Map<String, Object> map);

	

	

}
