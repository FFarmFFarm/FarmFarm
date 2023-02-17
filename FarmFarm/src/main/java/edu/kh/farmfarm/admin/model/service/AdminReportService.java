package edu.kh.farmfarm.admin.model.service;

import java.util.Map;

import edu.kh.farmfarm.admin.model.vo.Admin;

public interface AdminReportService {

	/** 미처리 신고 조회
	 * @param sortFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectNewReport(String sortFilter, int cp);


	/** 미처리 신고 상세 조회(모달)
	 * @param hiddenNo
	 * @return newReportDetail
	 */
	Admin selectNewReportDetail(int hiddenReportNo);



	/** 신고 누적 기록 조회(모달)
	 * @param reportType
	 * @param memberNo
	 * @param contentNo
	 * @return map
	 */
	Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo, String allNew);


	/** 전체 신고 내역 조회
	 * @param typeFilter
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectReportAllList(Map<String, Object> paramMap, int c);


	/** 전체 신고 상세 조회
	 * @param hiddenReportNo
	 * @return reportDetail
	 */
	Admin selectReportDetail(int hiddenReportNo);


}
