const signUpGraph = document.getElementById('signUpGraph');
const orderGraph = document.getElementById('orderGraph');

document.getElementById('iconRight').addEventListener('click', () => {
  orderGraph.classList.add('move-to-left');
  signUpGraph.style.display = 'none';
  orderGraph.style.display = 'flex';
})

document.getElementById('iconLeft').addEventListener('click', () => {
  signUpGraph.classList.add('move-to-right');
  signUpGraph.style.display = 'flex';
  orderGraph.style.display = 'none';
})



//  chartjs
// 회원가입 수

// 날짜별 회원가입자 수
function showGraph(){
  $.ajax({
    url: '/dashboard/signUpGraph',
    type: 'GET',
    dataType: 'JSON',
    success: (graphMap) => {

      let signUpDateArr = [];

      for(let i=0; i<graphMap.signUpGraphList.length; i++) {
        signUpDateArr[i] = graphMap.signUpGraphList[i].signUpDate;
      }

      let signUpCountArr = [];

      for(let i=0; i<graphMap.signUpGraphList.length; i++){
        signUpCountArr[i] = graphMap.signUpGraphList[i].signUpCount;
      }


      let orderDateArr = [];

      for(let i=0; i<graphMap.orderGraphList.length; i++) {
        orderDateArr[i] = graphMap.orderGraphList[i].orderDate;
      }


      let orderCountArr = [];

      for(let i=0; i<graphMap.orderGraphList.length; i++) {
        orderCountArr[i] = graphMap.orderGraphList[i].orderCount;
      }

      // 가입자 수
      new Chart(document.getElementById('signUpChart'), {
        type: 'bar',
        data: {
          labels: signUpDateArr,  // x축
          datasets:[{
             //데이터
              data: signUpCountArr,
              // backgroundColor:'#2b8c44'
              backgroundColor: 'rgba(43, 140, 68)'
          }]
        },
          options: {
            responsive: false,
            legend:{ 
              display: false      // 라벨 없애기
            },
            scales: {
              yAxes: [{
                  ticks:{
                    beginAtZero: true,
                    max: 50,   //y축 값
                    fontColor: 'rgba(43, 140, 68)',
                    fontSize: 10
                  },
                  gridLines: {
                    // color: 'rgba(43, 140, 68 ,0.5)'
                  }
              }],
              xAxes: [{
                ticks:{
                  fontColor: 'rgba(43, 140, 68)',
                  fontSize: 10
                },
                gridLines: {
                  color: 'white'
                  // color: 'rgba(43, 140, 68 ,0.5)'
                }
              }]
            }
        }
      });


      // 주문수 차트
      new Chart(document.getElementById('orderChart'), {
        type: 'line',
        data: {
          labels: orderDateArr,  // x축
          datasets:[{
             //데이터
              data: orderCountArr,
              fill: false,
              backgroundColor: 'rgba(43, 140, 68)',
              borderColor: 'rgba(43, 140, 68)',
              borderWidth: 1
          }]
        },
          options: {
            responsive: false,
            legend:{ 
              display: false      // 라벨 없애기
            },
            scales: {
              yAxes: [{
                  ticks:{
                    beginAtZero: true,
                    // stepSize
                    max: 40,   //y축 값
                    fontColor: 'rgba(43, 140, 68)',
                    fontSize: 10
                  },
                  gridLines: {
                    // color: 'rgba(43, 140, 68)'
                  }
              }],
              xAxes: [{
                ticks:{
                  fontColor: 'rgba(43, 140, 68)',
                  fontSize: 10
                },
                gridLines: {
                  color: 'white'
                  // color: 'rgba(43, 140, 68)'
                }
              }]
            }
        }
      });
      console.log("성공");
    },
    error: () => { console.log("그래프 불러오기 실패");}
  })
}
 


// todo: 함수실행
(() => {
  showGraph();

})()