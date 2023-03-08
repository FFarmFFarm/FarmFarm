package edu.kh.farmfarm.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.admin.model.dao.AdminReportDAO;
import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.common.Pagination;

@Service
public class AdminReportServiceImpl implements AdminReportService{
	
	@Autowired
	private AdminReportDAO dao;
	
	
	// 미처리 신고 조회
	@Override
	public Map<String, Object> selectNewReport(String sortFilter, int cp) {
		
		/* 페이지네이션 */
		// 1. 전체 개수 가져오기 (신고 중복 제거)
		int reportListCount = dao.reportListCount(sortFilter);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(reportListCount, cp, 15);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 미처리 신고 조회
		List<Admin> newReportList = dao.selectNewReport(sortFilter, pagination);
		
		
		// 신고 중복 포함된 미처리 신고 전체 개수 
		int reportAllListCount = dao.reportAllListCount();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("reportListCount", reportListCount);
		map.put("newReportList", newReportList);
		map.put("pagination", pagination);
		map.put("reportAllListCount", reportAllListCount);
		
		return map;
	}
		

	
	// 미처리 신고 상세 조회
	@Override
	public Admin selectNewReportDetail(int reportNo) {
		return dao.selectNewReportDetail(reportNo);
	}
	
	
	// 신고 누적 기록 
@	Override
	public Map<String, Object> selectReportAccumulate(String reportType, int memberNo, int contentNo, String allNew) {
		return dao.selectReportAccumulate(reportType, memberNo, contentNo, allNew);
	}	
	
	
	// 전체 신고 기록	
	@Override
	public Map<String, Object> selectReportAllList(Map<String, Object> paramMap, int cp) {

		// 1. 전체 페이지네이션 개수 가져오기
		// reportAllListCount: 미처리신고 전체 개수(중복포함)
		// reportAllCount : 전체 신고 개수(중복X, 페이지네이션용)
		int reportAllCount = dao.reportAllCount(paramMap);
		
		// 2. 가져온 개수와 현재 페이지를 이용하여 페이지네이션 객체 발생
		Pagination pagination = new Pagination(reportAllCount, cp, 15);
		
		// 3. 페이지네이션 객체를 생성해 목록 불러오기
		// 전체 신고 조회
		List<Admin> reportAllList = dao.selectReportAllList(paramMap, pagination);
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("reportAllCount", reportAllCount);
		map.put("pagination", pagination);
		map.put("reportAllList", reportAllList);
		
		return map;
	}
	
	
	// 전체 신고 기록 - 상세 내역
	@Override
	public Admin selectReportDetail(int reportNo) {
		return dao.selectReportDetail(reportNo);
	}
	

}
