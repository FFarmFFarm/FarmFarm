package edu.kh.farmfarm.productList.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.category.model.vo.Category;
import edu.kh.farmfarm.category.model.vo.CategorySub;
import edu.kh.farmfarm.common.Pagination;
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
	public List<Product> getProductListAll(Pagination pagination) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productListMapper.getProductList_all", null, rowBounds);
	}
	
	/** 모든 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountAll() {
		return sqlSession.selectOne("productListMapper.getCount_all");
	}

	/** 선택된 카테고리의 상품 목록 가져오기
	 * @param category
	 * @return
	 */
	public List<Product> getProductListChecked(Pagination pagination, int category) {
		
		int offset = ( pagination.getCurrentPage() - 1 ) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("productListMapper.getProductList_checked", category, rowBounds);
		
	}
	
	/** 선택된 상품 목록의 개수를 가져오기
	 * @return
	 */
	public int getCountChecked(int category) {
		return sqlSession.selectOne("productListMapper.getCount_checked", category);
	}


	
	
	
	
}
