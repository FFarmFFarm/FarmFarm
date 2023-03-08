package edu.kh.farmfarm.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.admin.model.vo.Admin;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.seller.model.vo.Seller;

@Repository
public class AdminSellerAuthDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	

	/** 판매자 수
	 * @param preSellerFilter
	 * @return sellerListCount
	 */
	public int sellerListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminSellerMapper.sellerListCount", paramMap);
	}



	/** 판매자 조회 (인증대기 포함)  +정렬
	 * @param preSellerFilter
	 * @param pagination
	 * @return sellerList
	 */
	public List<Admin> selectSeller(Map<String, Object> paramMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();  // limit = 10
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("adminSellerMapper.selectSeller", paramMap, rowBounds);
	}



	/** 판매자 인증신청서 상세 조회
	 * @param hiddenNo
	 * @return authPaper
	 */
	public Admin selectAuthPaper(int memberNo) {
		return sqlSession.selectOne("adminSellerMapper.selectAuthPaper", memberNo);
	}



	/** 판매자 인증 승인
	 * @param hiddenNo
	 * @return result
	 */
	public int sellerApprove(int memberNo) {
		return sqlSession.update("adminSellerMapper.sellerApprove", memberNo);
	}



	/** 판매자 인증 처리 일자 수정
	 * @param hiddenNo
	 * @return result
	 */
	public int updateAuthDate(int memberNo) {
		return sqlSession.update("adminSellerMapper.updateAuthDate", memberNo);
	}


	
	/** 판매자 인증 보류
	 * @param hiddenNo
	 * @return
	 */
	public int sellerDeny(int memberNo, String denyReason) {
		
		// 판매자 인증 보류
		int result = sqlSession.update("adminSellerMapper.sellerDeny", memberNo);
		
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("memberNo", memberNo);
		param.put("denyReason", denyReason);
		
		
		// 보류 되면 사유 삽입
		if(result > 0) {
			
			// 사유가 입력되어 있는지 확인
			int checkDenyReason = sqlSession.selectOne("adminSellerMapper.checkDenyReason", memberNo);

			
			if(checkDenyReason > 0) {
				
				// 있으면 update
				sqlSession.update("adminSellerMapper.updateDenyReason", param);
				
			} else {
				
				// 없으면 insert
				sqlSession.insert("adminSellerMapper.insertDenyReason", param);
			}
		}
		
		return result;
	}

	
	// 판매자 인증 보류 사유 가져오기
	public String selectDenyReason(int memberNo) {
		return sqlSession.selectOne("adminSellerMapper.selectDenyReason", memberNo);
	}

	

	/** 판매자 인증사진 업데이트
	 * @param farmImg
	 * @return result
	 */
	public int updateSellerImage(Seller farmImage) {
		return sqlSession.update("adminSellerMapper.updateSellerImage", farmImage);
	}
	
}
