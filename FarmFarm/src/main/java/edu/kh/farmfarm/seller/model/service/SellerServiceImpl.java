package edu.kh.farmfarm.seller.model.service;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.postDetail.model.vo.PostImg;
import edu.kh.farmfarm.seller.model.dao.SellerDAO;

@Service
public class SellerServiceImpl implements SellerService{

	@Autowired
	private SellerDAO dao;

	
	// 멤버 기본정보 조회
	@Override
	public Member selectMemberInfo(int memberNo) {
		return dao.selectMemberInfo(memberNo);
	}
		
	// 판매글 리스트 조회
	@Override
	public Map<String, Object> selectPostList(int cp, int memberNo) {
		
		int listCount = dao.getListCount(memberNo);
		
		Pagination pagination = new Pagination(listCount, cp, 10, 5);
		
		List<Post> postList = dao.selectPostList(pagination, memberNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("postList", postList);
		
		return map;
	}

	// 판매글 등록
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int enrollPost(Post post, List<MultipartFile> postImgList, String webPath, String folderPath) throws IOException {
			
		// XSS 처리
		post.setPostTitle(Util.XSSHandling(post.getPostTitle()));
		post.setPostContent(Util.XSSHandling(post.getPostContent()));
		// 개행처리
		post.setPostContent(Util.newLineHandling(post.getPostContent()));
		
		
		int postNo = dao.enrollPost(post);
		
		if(postNo>0) {
			List<PostImg> imgList = new ArrayList<PostImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<postImgList.size(); i++) {
				if(postImgList.get(i).getSize()>0) {
					PostImg img = new PostImg();
					
					String rename = Util.fileRename(postImgList.get(i).getOriginalFilename());
					renameList.add(rename);
					
					img.setPostImgAddress(webPath+rename);
					img.setPostImgOrder(i);
					img.setPostNo(postNo);
					
					imgList.add(img);
				}
				
			}
			
			if(!imgList.isEmpty()) {
				int result = dao.insertPostImgList(imgList);
				
				if(result==imgList.size()) {
					for(int i=0; i<imgList.size(); i++) {
						int index = imgList.get(i).getPostImgOrder();
						postImgList.get(index).transferTo(new File(folderPath+renameList.get(i)));
					}
				}
			}
		}
		
		return postNo;
	}

	
	// 판매완료처리
	@Override
	public int soldoutPost(int postNo) {
		return dao.soldoutPost(postNo);
	}

	// 상품삭제처리
	@Override
	public int deletePost(int postNo) {
		return dao.deletePost(postNo);
	}

	
	// 판매글 수정페이지로 이동
	@Override
	public Post selectPostDetail(int postNo) {
		return dao.selectPostDetail(postNo);
	}
	
	
	// 판매글 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int postUpdate(Post post, List<MultipartFile> postImgList, String webPath, String folderPath,
			String deleteList) throws Exception {
		
		// XSS 처리
		post.setPostTitle(Util.XSSHandling(post.getPostTitle()));
		post.setPostContent(Util.XSSHandling(post.getPostContent()));
		// 개행처리
		post.setPostContent(Util.newLineHandling(post.getPostContent()));
		
		
		int result = dao.updatePost(post);
		
		if(result>0) {
			if(!deleteList.equals("")) {
				String condition = "WHERE POST_NO = " + post.getPostNo()
									+ "AND POST_IMG_ORDER IN(" + deleteList + ")";
				
				result = dao.postImgDelete(condition);
			}
			
			List<PostImg> imgList = new ArrayList<PostImg>();
			List<String> renameList = new ArrayList<String>();
			
			for(int i=0; i<postImgList.size(); i++) {
				if(postImgList.get(i).getSize()>0) {
					PostImg img = new PostImg();
					
					String rename = Util.fileRename(postImgList.get(i).getOriginalFilename());
					renameList.add(rename);
					
					img.setPostImgAddress(webPath+rename);
					img.setPostImgOrder(i);
					img.setPostNo(post.getPostNo());
					
					imgList.add(img);
					result = dao.postImgUpdate(img);
					
					// result== 0 : 이미지는 있는데 기존에 없었던 경우
					if(result==0) {
						result = dao.postImgInsert(img);
					}
				}
			}
			if(!imgList.isEmpty()) {
				for(int i=0; i<imgList.size(); i++) {
					int index = imgList.get(i).getPostImgOrder();
					postImgList.get(index).transferTo(new File(folderPath+renameList.get(i)));
				}
			}
		}
		
		return result;
	}

	
	
	
	
	
	
	
}
