package edu.kh.farmfarm.report.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.report.model.dao.ReportDAO;
import edu.kh.farmfarm.report.model.vo.Report;

@Service
public class ReportServiceImpl implements ReportService{
	
	@Autowired
	private ReportDAO dao;


	// 신고하기
	@Override
	public int insertReport(Map<String, Object> map) {
		return dao.insertReport(map);
	}
}
