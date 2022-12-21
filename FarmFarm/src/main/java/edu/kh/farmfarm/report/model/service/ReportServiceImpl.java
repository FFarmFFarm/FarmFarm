package edu.kh.farmfarm.report.model.service;

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
	public int insertReport(Report report) {
		return dao.insertReport(report);
	}

}
