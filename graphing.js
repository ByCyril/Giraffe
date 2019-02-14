var ctx = document.getElementById("myChart").getContext("2d");

var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 8
        },
        type: "linear",
        position: "bottom"
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 16
        }
      }
    ]
  }
};

function graph() {
  let points = document.getElementById("data").value.split(" ");
  let data = [];
  points.forEach(point => {
    let parsedPoint = point.split(",");
    let x = parseFloat(parsedPoint[0]);
    let y = parseFloat(parsedPoint[1]);
    console.log(x, y);
    let obj = { x: x, y: y };
    data.push(obj);
  });

  createGraph(data);
}

function createGraph(data) {
  var myChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Giraffe",
          data: data,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"]
        }
      ]
    },
    options: chartOptions
  });
}

// 2,2 3,3 4,4 5,5 6,6 7,7
