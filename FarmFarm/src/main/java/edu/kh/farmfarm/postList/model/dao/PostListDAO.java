package edu.kh.farmfarm.postList.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.category.model.vo.CategorySub;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.SearchItem;
import edu.kh.farmfarm.postDetail.model.vo.Post;

@Repository
public class PostListDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 상위 카테고리 목록 가져오기
	 * @return
	 */
	public List<Category> getTopCategoryList() {
		return sqlSession.selectList("categoryMapper.getCategoryList_top");
	}
	
	/** 과일 목록 가져오기
	 * @return
	 */
	public List<CategorySub> getFruitCategoryList() {
		return sqlSession.selectList("categoryMapper.getCategoryList_fruit");
	}
	
	/** 채소 목록 가져오기
	 * @return
	 */
	public List<CategorySub> getVegetableCategoryList() {
		return sqlSession.selectList("categoryMapper.getCategoryList_vegetable");
	}

	/** 기타 목록 가져오기
	 * @return
	 */
	public List<CategorySub> getEctCategoryList() {
		return sqlSession.selectList("categoryMapper.getCategoryList_ect");
	}
	
	/** 모든 상품 목록 가져오기
	 * @return
	 */
	public List<Post> getPostListAll(Pagination pagination, String keyword, String sort) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		searchItem.setSort(sort);
		System.out.println("sort : " + searchItem.getSort());
		
		
		return sqlSession.selectList("postListMapper.getPostList_all", searchItem, rowBounds);
	}
	
	/** 모든 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountAll() {
		return sqlSession.selectOne("postListMapper.getCount_all");
	}

	/** 선택된 카테고리의 상품 목록 가져오기
	 * @param category
	 * @return
	 */
	public List<Post> getPostListChecked(Pagination pagination, String keyword, int category, String sort) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		searchItem.setCategory(category);
		searchItem.setSort(sort);
		System.out.println("sort : " + searchItem.getSort());
		
		return sqlSession.selectList("postListMapper.getPostList_checked", searchItem, rowBounds);
		
	}
	
	/** 선택된 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountChecked(int category) {
		return sqlSession.selectOne("postListMapper.getCount_checked", category);
	}
	
	
}
