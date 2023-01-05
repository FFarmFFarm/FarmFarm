package edu.kh.farmfarm.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.farmfarm.board.model.service.BoardListService;
import edu.kh.farmfarm.mypage.model.service.MyPageService;
import edu.kh.farmfarm.postDetail.model.service.PostDetailService;
import edu.kh.farmfarm.productDetail.model.service.ProductDetailService;

//	하루 한번 이미지 삭제하는 스케줄러
@Component
public class ImageDeleteScheduling {

	@Autowired // DI
	private BoardListService boardListService;
	
	@Autowired // DI
	private MyPageService myPageService;
	
	@Autowired // DI
	private ProductDetailService productService;
	
	@Autowired // DI
	private PostDetailService postService;
	
	@Autowired
	private ServletContext application; // applcation scope 객체
	
	// 로그를 출력하는 객체 얻어오기
	private Logger logger = LoggerFactory.getLogger(ImageDeleteScheduling.class);

	

//	회원 프로필 이미지
	@Scheduled(cron = "0 0 4 * * * ")
	public void deleteprofileImgFile() {
		
		List<String> dbList = myPageService.selectProfileImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/myPage/profile");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("마이페이지 프로필 이미지 삭제 스케줄링 완료");
	}
	
	
	
	
//	회원 배경 이미지
	@Scheduled(cron = "0 0 4 * * * ")
	public void deleteBgImgFile() {
		
		List<String> dbList = myPageService.selectBgImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/myPage/background");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("마이페이지 배경이미지 삭제 스케줄링 완료");
	}
	
	
	
	 
//	팜팜 상품 이미지
	@Scheduled(cron = "0 0 4 * * * ")
	public void deleteProductImgFile() {
		
		List<String> dbList = productService.selectProductImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/product/detail");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("팜팜 상품 이미지 삭제 스케줄링 완료");
	}
		
	
	
	
//	판매자 상품 이미지
	@Scheduled(cron = "0 0 4 * * * ")
	public void deletePostImgFile() {
		
		List<String> dbList = postService.selectPostImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/post/postDetail");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("판매자 상품 이미지 삭제 스케줄링 완료");
	}
			
	
	
// 리뷰 이미지
	@Scheduled(cron = "0 0 4 * * * ")
	public void deleteReviewImgFile() {
		
		List<String> dbList = myPageService.selectReviewImageList();
		
		System.out.println(dbList);
		
		String folderPath = application.getRealPath("/resources/images/product/review");
		
		File[] arr = new File(folderPath).listFiles();
		
		List<File> fileList = Arrays.asList(arr);
		
		if(!fileList.isEmpty()) {
			for(File file: fileList) {
				
				String fileName = file.getName();
				
				if(dbList.indexOf(fileName) == -1) {
					logger.info(fileName + "삭제" );
					
					file.delete();
				}
				
			}
		}
		
		logger.info("리뷰 이미지 삭제 스케줄링 완료");
	}
	
	
	
//	와글와글 게시판 이미지
	@Scheduled(cron = "0 0 4 * * *")
	public void deleteImageFile() {
//		System.out.println("0초마다 출력");
		
		// 1. DB에서 BOARD_IMG 테이블의 모든 이미지 변경명을 조회
		List<String> dbList = boardListService.selectBoardImageList();
		
		// 2. Server에 저장된 모든 이미지 파일 조회
		String folderPath = application.getRealPath("/resources/images/board");
		
		// 지정된 경로에 존재하는 파일 목록을 배열로 반환
		File[] arr = new File(folderPath).listFiles();
		
		// 배열 -> List로 변환
		List<File> fileList = Arrays.asList(arr);
		
		
		// 3. 둘을 비교하여 Server 이미지 목록 중 DB에 없는 이미지를 삭제
		
		if(!fileList.isEmpty()) { // 서버에 파일이 있다면
			
			for(File file : fileList) {
				// file.toString(); // 파일이 저장된 경로 반환
				// 문자열.substring(인덱스) : 지정된 인덱스 부터 끝까지 잘라서 반환
				
				String fileName 
//				 = file.toString().substring( file.toString().lastIndexOf("\\") + 1 );
				 = file.getName();
				
				
				// 파일명.jpg
				
				// dbList에서 fileName과 일치하는 파일명이 없다면
				// == 서버에는 있는데 DB에 없는 파일
				if(dbList.indexOf(fileName) == -1) {
					//System.out.println(fileName + " 삭제");
					
					// trace, debug , info, warn, error, fatal
					logger.info(fileName + " 삭제");
					
					file.delete(); // 서버 파일 삭제
				}
			}
		}
		
		logger.info("게시판 이미지 파일 삭제 스케쥴링 완료");
	}
}


