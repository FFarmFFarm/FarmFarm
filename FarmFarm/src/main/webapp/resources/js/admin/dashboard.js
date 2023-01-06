
document.getElementById('graph1').classList.add('fade');



//  chartjs
// 회원가입 수

// 날짜별 회원가입자 수
function signUpGraph(){
  $.ajax({
    url: '/dashboard/signUpGraph',
    type: 'GET',
    dataType: 'JSON',
    success: (signUpGraphList) => {

      let signUpDateArr = [];

      for(let i=0; i<signUpGraphList.length; i++) {
        signUpDateArr[i] = signUpGraphList[i].signUpDate;
      }

      let signUpCountArr = [];

      for(let i=0; i<signUpGraphList.length; i++){
        signUpCountArr[i] = signUpGraphList[i].signUpCount;
      }


      new Chart(document.getElementById('signUpChart'), {
        type: 'bar',
        data: {
          labels: signUpDateArr,  // x축
          datasets:[{
             //데이터
             label: 'signup',
              data: signUpCountArr,
              backgroundColor:'#2b8c44'
          }]
        },
        data: {
          labels: signUpDateArr,  // x축
          datasets:[{
             //데이터
              data: signUpCountArr,
              backgroundColor:'#2b8c44'
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
                    max: 50   //y축 값
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
 






  //todo: 값 갖고오기
  // 원그래프 : 구매자, 판매자 비율


  // 라인: 매출



  // 라인: 회원가입 수
      // new Chart(
      //   document.getElementById('orderChart'),
      //   {
      //     type: 'bar',
      //     options: {
      //       animation: false,
      //       plugins: {
      //         legend: {
      //           display: false
      //         },
      //         tooltip: {
      //           enabled: false
      //         }
      //       }
      //     },
      //     data: {
      //       labels: data.map(sighUpGraphList => sighUpGraphList.signUpDate),
      //       datasets: [
      //         {
      //           label: '가입자 수',
      //           data: data.map(sighUpGraphList => sighUpGraphList.singUpCount)
      //         }
      //       ]
      //     }
      //   }
      // );




// 함수실행
(() => {
  signUpGraph();




})()