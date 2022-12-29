package edu.kh.farmfarm.productList.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.category.model.vo.CategorySub;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.SearchItem;
import edu.kh.farmfarm.productDetail.model.vo.Product;

@Repository
public class ProductListDAO {
	
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
	public List<Product> getProductListAll(Pagination pagination, String keyword, String sort, String stockOutFl) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		searchItem.setSort(sort);
		searchItem.setStockOutFl(stockOutFl);
		System.out.println("keyword : " + searchItem.getKeyword());
		
		
		return sqlSession.selectList("productListMapper.getProductList_all", searchItem, rowBounds);
	}
	
	/** 모든 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountAll(String keyword, String stockOutFl) {
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		searchItem.setStockOutFl(stockOutFl);
		
		return sqlSession.selectOne("productListMapper.getCount_all", searchItem);
	}

	/** 선택된 카테고리의 상품 목록 가져오기
	 * @param category
	 * @return
	 */
	public List<Product> getProductListChecked(Pagination pagination, String keyword, int category, String sort, String stockOutFl) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		
		System.out.println("keyword : " + searchItem.getKeyword());
		
		
		searchItem.setCategory(category);
		searchItem.setSort(sort);
		searchItem.setStockOutFl(stockOutFl);
		
		return sqlSession.selectList("productListMapper.getProductList_checked", searchItem, rowBounds);
		
	}
	
	/** 선택된 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountChecked(String keyword, int category, String stockOutFl) {
		
		// 검색어 객체 생성
		SearchItem searchItem = new SearchItem();
		searchItem.setKeyword(keyword);
		searchItem.setCategory(category);
		searchItem.setStockOutFl(stockOutFl);
		
		return sqlSession.selectOne("productListMapper.getCount_checked", searchItem);
	}


	
	
	
	
}
