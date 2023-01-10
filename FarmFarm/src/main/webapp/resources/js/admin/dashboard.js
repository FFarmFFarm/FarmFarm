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
      console.log(signUpDateArr);

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


      let orderWeekArr= [];

      for(let i=0; i<graphMap.orderWeekList.length; i++) {
        orderWeekArr[i] = graphMap.orderWeekList[i].orderWeek;
      }

      let orderSumArr = [];

      for(let i=0; i<graphMap.orderWeekList.length; i++){
        orderSumArr[i] = graphMap.orderWeekList[i].orderSum;
      }

      let productNameArr = [];

      console.log(graphMap.orderWeekList);

      for(let i=0; i<graphMap.productRankingList.length; i++){
        productNameArr[i] = graphMap.productRankingList[i].productName;
      }

      let productSumArr = [];

      for(let i=0; i<graphMap.productRankingList.length; i++) {
        productSumArr[i] = graphMap.productRankingList[i].productSum;
      }

      console.log(graphMap.productRankingList);
      console.log(productNameArr);
      console.log(productSumArr);
// 
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
                    // max: 40,   //y축 값
                    fontColor: 'rgba(43, 140, 68)',
                    fontSize: 10
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


      // 이번주 총 매출액
      new Chart(document.getElementById('salesChart'), {
        type: 'bar',
        data: {
          labels: orderWeekArr,  // x축
          datasets:[{
             //데이터
              data: orderSumArr,
              // fill: false,
              backgroundColor: ["#cff09e", "#CFF0C2", "#a8dba8", "#A8DBC3","#79bd9a", "#79BDB2","#3b8686"]
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
                    // max: 40,   //y축 값
                    fontColor: 'rgba(43, 140, 68)',
                    fontSize: 10
                  },
                  gridLines: {
                    drawBorder: false//축과 데이터의 경계선 표시 여부
                     
                    }
              }],
              xAxes: [{
                ticks:{
                  fontColor: 'rgba(43, 140, 68)',
                  fontSize: 10
                },
                gridLines: {
                  drawBorder: false//축과 데이터의 경계선 표시 여부
                    
                  }
              }]
            },
            animation:false,
          showValue: {
            fontStyle: 'Helvetica', //Default Arial
            fontSize: 20
            
          }
        }
      });

      Chart.plugins.register({
        afterDraw: function (chart, easing) {
          if (chart.config.options.showValue2) {
              var ctx = chart.chart.ctx;
              // var fontSize = chart.config.options.showValue.fontSize || "3";
              // var fontStyle = chart.config.options.showValue.fontStyle || "normal";
              // ctx.font =  fontSize + "px " + fontStyle;
              ctx.textAlign = chart.config.options.showValue2.textAlign || "start";
              ctx.textBaseline = chart.config.options.showValue2.textAlign || "top";
              var fontSize = 13;
              var fontStyle = 'normal';
              var fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        
              chart.config.data.datasets.forEach(function (dataset, i) {
                  ctx.fillStyle = dataset.fontColor || chart.config.options.showValue2.textColor || "#bbb";
                  dataset.data.forEach(function (data, j) {
                     if(dataset.hideValue != true){
                        var txt = Math.round(data*100)/100;
                        var xCoordinate = dataset._meta[chart.id].data[j]._model.x;
                        var yCoordinate = dataset._meta[chart.id].data[j]._model.y;
                        var yCoordinateResult;
                        var xCoordinateResult;
                        xCoordinateResult =  xCoordinate + 10
      
                        if(dataset.type == 'line'){
                          yCoordinateResult = yCoordinate + 10 > chart.scales[chart.options.scales.xAxes[0].id].top ? chart.scales[chart.options.scales.xAxes[0].id].top :  yCoordinate + 10;
                        } else{
                          yCoordinateResult = yCoordinate - 10;
                        }
                        ctx.fillText(txt, xCoordinateResult, yCoordinateResult);
                      }
                   });
                });
              }
            }
          });




      // 판매 상위 삼품 top 5
      new Chart(document.getElementById('rankingChart'), {
        type: 'horizontalBar',
        data: {
          labels: productNameArr,  // y축
          datasets:[{
             //데이터
              data: productSumArr, // x축
              fill: false,
              axis: 'x',
              backgroundColor: ["#cff09e", "#a8dba8", "#79bd9a", "#3b8686", "#3C7470"],  
              z:-2      
          }]
        },
        options: {
          responsive: false,
          indexAxis: 'x',
          legend:{ 
            display: false      // 라벨 없애기
          },
          scales: {
            yAxes: [{
              gridLines: {
                drawBorder: false,//축과 데이터의 경계선 표시 여부
                  display: false
                },
                ticks:{
                  z: 2,
                  // mirror:true,
                  beginAtZero: true,
                  fontColor: 'rgba(43, 140, 68)',
                  fontSize: 12,
                  // padding: -550
                }
              }],
              xAxes: [{
                gridLines: {
                  drawBorder: false//축과 데이터의 경계선 표시 여부
                },
                ticks:{
                max: 1000000,
                display: false,
                fontColor: 'rgba(43, 140, 68)',
                fontSize: 10
              },
              gridLines: {
                color: 'white'
                // color: 'rgba(43, 140, 68)'
              }
            }]
          },
          animation:false,
          showValue2: {
            fontStyle: 'Helvetica', //Default Arial
            fontSize: 10,
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