const boardSearch = document.querySelector(".board-search");

if(boardSearch != null){

    const showBoardList = (cp, sort, query, key)=>{

        // board-list-title의 원래 모양을 저장
        const boardListTitle = document.querySelector(".board-List-title");

        $.ajax({
            url : "/boards/list/"+boardTypeNo,
            data : {"boardTypeNo" : boardTypeNo,
                    "cp" : cp,
                    "query" : query,
                    "sort" : sort,
                    "key" : key
                    },
            dataType : "JSON",
            success : boardMap=>{

                const boardList = boardMap.boardList;
                const pagination = boardMap.pagination;
                const query = boardMap.query;
                const sort = boardMap.sort;

                let sURL;

                sURL = "&key="+key+"&query="+query+"&sort="+sort;

                // 리스트들을 감싸고 있는거 없애주기
                const boardListTop = document.querySelector(".board-list-top");
                boardListTop.innerHTML = "";

                // ul태그 부분을 만들기
                const boardListArea = document.createElement("ul");
                boardListArea.classList.add("board-list-area")
            
                if(boardList.length == 0){
                    const emptyList = document.createElement("div");
                    emptyList.classList.add("empty-list");
                    emptyList.innerText="등록된 게시글이 없습니다. 첫 게시물의 주인공이 되어보세요!";
                    boardListArea.append(emptyList);
                }else{
                    for(let board of boardList){
                        const li = document.createElement("li");

                        const boardNo = document.createElement("span");
                        boardNo.classList.add("board-no");
                        boardNo.innerText = board.boardNo;

                        const boardTitle = document.createElement("span");
                        boardTitle.classList.add("board-title");
                        const goBoard = document.createElement("a");
                        goBoard.classList.add("goBoard");
                        goBoard.innerHTML = board.boardTitle+"&nbsp;("+board.commentCount+")";
                        boardTitle.append(goBoard);
                        
                        const boardWriter = document.createElement("span");
                        boardWriter.classList.add("board-writer");
                        boardWriter.setAttribute("id", board.memberNo);
                        boardWriter.innerText = board.memberNickname;
                        
                        const boardDate = document.createElement("span");
                        boardDate.classList.add("board-date");
                        boardDate.innerText = board.boardDate;
                        
                        const boardView = document.createElement("span");
                        boardView.classList.add("board-view");
                        boardView.innerText = board.boardView;
                        
                        boardListArea.append(li);
                        
                        if(authority != 1){
                            goBoard.setAttribute("href", "/boards/"+boardTypeNo+"/"+board.boardNo+"?cp="+pagination.currentPage+sURL);
                        }else{
                            goBoard.addEventListener("click", ()=>{
                                messageModalOpen("판매자는 게시글 조회가 불가능합니다.");
                            })
                        }

                        li.append(boardNo, boardTitle, boardWriter, boardDate, boardView);
                    }
                }

                // 페이지네이션 부분
                const boardWriteBottom = document.createElement("div");
                boardWriteBottom.classList.add("board-write-bottom");

                const boardPagination = document.createElement("ul");
                boardPagination.classList.add("board-pagination");

                // 첫 페이지
                const firstLi = document.createElement("li");
                firstLi.setAttribute("id", 1);
                firstLi.classList.add("pageLi");
                const firstA = document.createElement("a");
                firstA.setAttribute("href", "/boards/"+boardTypeNo+"?cp=1"+sURL);
                firstA.innerHTML = "&lt;&lt;";
                firstLi.append(firstA);
                
                // 이전 목록 마지막 번호이동
                const prevLi = document.createElement("li");
                prevLi.setAttribute("id", pagination.prevPage);
                prevLi.classList.add("pageLi");
                const prevA = document.createElement("a");
                prevA.setAttribute("href", "/boards/"+boardTypeNo+"?cp="+pagination.prevPage+sURL);
                prevA.innerHTML = "&lt;";
                prevLi.append(prevA);
                
                // 다음 시작 페이지 이동동
                const nextLi = document.createElement("li");
                nextLi.setAttribute("id", pagination.nextPage);
                nextLi.classList.add("pageLi");
                const nextA = document.createElement("a");
                nextA.setAttribute("href", "/boards/"+boardTypeNo+"?cp="+pagination.nextPage+sURL);
                nextA.innerHTML = "&gt;";
                nextLi.append(nextA);
                
                // 끝 페이지로 이동
                const maxLi = document.createElement("li");
                maxLi.setAttribute("id", pagination.maxPage);
                maxLi.classList.add("pageLi");
                const maxA = document.createElement("a");
                maxA.setAttribute("href", "/boards/"+boardTypeNo+"?cp="+pagination.maxPage+sURL);
                maxA.innerHTML = "&gt;&gt;";
                maxLi.append(maxA);
                
                // 숫자가 나올 부분
                
                boardPagination.append(firstLi, prevLi, nextLi, maxLi);
                
                for(let i = pagination.startPage; i<=pagination.endPage; i++){
                    const pageNumLi = document.createElement("li");
                    pageNumLi.classList.add("pageLi");
                    const pageNumA = document.createElement("a");
                    if(i == pagination.currentPage){
                        pageNumLi.setAttribute("id", pagination.currentPage);
                        pageNumA.classList.add("current");
                        pageNumA.innerText=i;
                        pageNumLi.append(pageNumA);
                        
                    }else{
                        pageNumLi.setAttribute("id", i);
                        pageNumA.setAttribute("href", "/boards/"+boardTypeNo+"?cp="+i+sURL)
                        pageNumA.innerText=i;
                        pageNumLi.append(pageNumA);
                    }
                    nextLi.before(pageNumLi);
                }
                
                if(loginYN != "" && authority != 1){
                    const writeA = document.createElement("a");
                    writeA.classList.add("board-write");
                    writeA.setAttribute("href", "/boards/"+boardTypeNo+"/writing");
                    writeA.innerText="글쓰기";
                    boardWriteBottom.append(boardPagination, writeA);
                    
                }else{
                    boardWriteBottom.append(boardPagination);

                }
                boardListTop.append(boardListTitle, boardListArea, boardWriteBottom);
                console.log("통신 성공");

                const goBoard = document.getElementsByClassName("goBoard");
                for(let go of goBoard){
                    go.addEventListener("click", e=>{
                        if(loginYN == ""){
                            loginConfirmOpen();
                            e.preventDefault();
                        }
                    })
                }

                const boardWriter = document.getElementsByClassName("board-writer");
                if(boardWriter.length > 0){ 
            
                    // Modal 관련 요소 얻어오기
                    const modal = document.querySelector(".modal");
                    const modalClose = document.getElementById("modal-close");
                    const modalImage = document.getElementById("modal-text");
            
                    if(loginYN != ""){
            
                        for(let th of boardWriter){
                            if(th.innerText != "관리자"){ /* 여기 추가했습니다. */
                                th.addEventListener("click", () => {
                                    modal.classList.toggle("show");
                                    modalImage.setAttribute("src", th.getAttribute("src"));
                                    selectMember(th.id);
                                });
                            }
                        }
                    
                    // x버튼 동작
                    modalClose.addEventListener("click", () => {
                        // hide 클래스를 추가해서 0.5초 동안 투명해지는 애니메이션 수행
                        modal.classList.toggle("hide");
                        // 0.5초 후에 show, hide 클래스를 모두 제거
                        setTimeout(() => {
                            modal.classList.remove("show", "hide");
                        }, 500);
                    });
            
                    }
                }

                
                // 페이지 선택 시
                const pageLis = document.querySelectorAll(".pageLi > a");
                for(let a of pageLis){
                    a.addEventListener("click", (e)=>{
                        
                        const cp = a.parentElement.id;

                        if(sort == 'view'){
                            const boardSort = document.querySelector(".board-sort");
                            boardSort.innerHTML = "조회수 ";
                            showBoardList(cp, sort, query, key);
                        }
                        if(sort == 'like'){
                            const boardSort = document.querySelector(".board-sort");
                            boardSort.innerHTML = "좋아요 ";
                            showBoardList(cp, sort, query, key);
                        }
                        if(sort == 'new'){
                            const boardSort = document.querySelector(".board-sort");
                            boardSort.innerHTML = "최신순 ";
                            showBoardList(cp, sort, query, key);
                        }

                        e.preventDefault();
                        
                    })

                }
                urlChange(cp, sort, key, query);
            },
            error : ()=>{
                alert("리스트 조회 ajax 통신 실패");
            }
        })

    }

    ///////////////////////////////////////////////////
        if(location.search != ""){

            showBoardList(cp, sort, query, key);
        }
        ///////////////////////////////////////////////////


    // 와글와글 게시판 이름 바꿔주기 + 현재 게시판 알려주기
    const boardTitle = document.querySelector(".board-top-title");
    const boardAdd = location.pathname;
    const type1 = document.getElementById("type1");
    const type2 = document.getElementById("type2");
    const type3 = document.getElementById("type3");
    if(boardAdd == '/boards/1'){
        boardTitle.innerHTML = "와글와글 자유게시판";
        type1.classList.add("nowType");
        type2.classList.remove("nowType");
        type3.classList.remove("nowType");
    }
    if(boardAdd == '/boards/2'){
        boardTitle.innerHTML="와글와글 팁";
        type1.classList.remove("nowType");
        type2.classList.add("nowType");
        type3.classList.remove("nowType");
    }
    if(boardAdd == '/boards/3'){
        boardTitle.innerHTML="와글와글 질문";
        type1.classList.remove("nowType");
        type2.classList.remove("nowType");
        type3.classList.add("nowType");
    }



    // 검색 시 검색어 유지시키기
    (()=>{
        const inputQuery = document.getElementById("inputQuery");
        const option = document.querySelectorAll("#search-key > option");
        
        if(inputQuery != null){
            const params = new URL(location.href).searchParams
            
            const key = params.get("key");
            const query = params.get("query");

            inputQuery.value = query;

            for(let op of option){

                // option의 value와 key가 일치할 때
                if(op.value == key){
                    op.selected = true;
                }
            }

        }
    })();

    // 로그인 안된 회원은 게시글 조회 안되게 이벤트 설정.
    const goBoard = document.getElementsByClassName("goBoard");
    for(let go of goBoard){
        go.addEventListener("click", e=>{
            if(loginYN == ""){
                loginConfirmOpen();
                e.preventDefault();
            }
        })
    }


    // 정렬을 누르면 밑에 정렬 항목이 뜨게 함.
    const boardNowSort = document.querySelector(".board-now-sort");
    const boardSelectSort = document.querySelector(".board-select-sort");
    boardNowSort.addEventListener("click", ()=>{
        boardSelectSort.classList.toggle("toggle");
    });
    boardSelectSort.addEventListener("click", ()=>{
        boardSelectSort.classList.toggle("toggle");
    })



    // 정렬 선택 시 
    const params = new URL(location.href).searchParams;
    let addsort = params.get("sort");

    // 정렬관련
    const boardSort = document.querySelector(".board-sort");
    const tempSort = document.getElementById("tempSort");

    if(addsort != ""){
        if(addsort == 'view'){
            const boardSort = document.querySelector(".board-sort");
            sort == 'view';
            boardSort.innerHTML = "조회수 ";
        }
        if(addsort == 'like'){
            const boardSort = document.querySelector(".board-sort");
            sort == 'like';
            boardSort.innerHTML = "좋아요 ";
        }
        if(addsort == 'new'){
            const boardSort = document.querySelector(".board-sort");
            sort == 'new';
            boardSort.innerHTML = "최신순 ";
        }
    }else{
        if(sort == 'view'){
            tempSort.setAttribute("value", "view");
            const boardSort = document.querySelector(".board-sort");
            boardSort.innerHTML = "조회수 ";
        }
        if(sort == 'like'){
            tempSort.setAttribute("value", "like");
            const boardSort = document.querySelector(".board-sort");
            boardSort.innerHTML = "좋아요 ";
        }
        if(sort == 'new'){
            tempSort.setAttribute("value", "new");
            const boardSort = document.querySelector(".board-sort");
            boardSort.innerHTML = "최신순 ";
        }
        
    }


    document.getElementById("new").addEventListener("click", ()=>{
        sort = "new";
        boardSort.innerHTML = "최신순 &nbsp;";
        showBoardList(cp, sort, query, key);
    })
    document.getElementById("view").addEventListener("click", ()=>{
        sort = "view";
        boardSort.innerHTML = "조회수 &nbsp;";
        showBoardList(cp, sort, query, key);
    })
    document.getElementById("like").addEventListener("click", ()=>{
        sort = "like";
        boardSort.innerHTML = "좋아요 &nbsp;";
        showBoardList(cp, sort, query, key);
    })


    // 페이지 선택 시
    const pageLis = document.querySelectorAll(".pageLi > a");
    for(let a of pageLis){
        a.addEventListener("click", (e)=>{

            const cp = a.parentElement.id;
            
            if(sort == 'view'){
                const boardSort = document.querySelector(".board-sort");
                boardSort.innerHTML = "조회수 ";
                showBoardList(cp, sort, query, key);
            }
            if(sort == 'like'){
                const boardSort = document.querySelector(".board-sort");
                boardSort.innerHTML = "좋아요 ";
                showBoardList(cp, sort, query, key);
            }
            if(sort == 'new'){
                const boardSort = document.querySelector(".board-sort");
                boardSort.innerHTML = "최신순 ";
                showBoardList(cp, sort, query, key);
            }

            showBoardList(cp, sort, query, key);

        })
    };


    // 주소 변경
    const urlChange = (cp, sort, key, query)=>{

        const state = {'cp':cp, 'sort':sort, 'key':key, 'query':query}
        const title = '';

        const reUrl = "/boards/"+boardTypeNo+"?cp="+cp+"&key="+key+"&query="+query+"&sort="+sort;

        history.pushState(state, title, reUrl);
    }

    // 판매자가 게시글 클릭 시 메세지 모달 띄우기
    if(authority == 1){
        goBoard = document.getElementsByClassName("goBoard");
        for(let go of goBoard){
            go.addEventListener("click", ()=>{
                messageModalOpen("판매자는 게시글 조회가 불가능합니다.");
        
            })
        }
    }
}