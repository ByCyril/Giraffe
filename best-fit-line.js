// let x_vals = [0, 100, 200, 300, 400, 500];
// let y_vals = [0, 1.68, 4.23, 5.78, 6.0, 6.55];
// 105,100 100,125 150,145 200,140 300,150 305,155 400,140 405,200 400,211 550,250

let x_vals = [];
let y_vals = [];

let x_normal = [];
let y_normal = [];

let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  createCanvas(1000, 1000);

  input = createInput();
  input.position(20, 65);

  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, labels) {
  return pred
    .sub(labels)
    .square()
    .mean();
}

function predict(x) {
  const xs = tf.tensor1d(x);
  const ys = xs.mul(m).add(b);
  let slope = m.dataSync();
  let y = b.dataSync();

  document.getElementById("eq").innerHTML = "y = " + slope[0] + "x + " + y[0];

  return ys;
}

function createGraph() {
  const points = input.value().split(" ");

  points.forEach(function(point) {
    let px = parseFloat(point.split(",")[0]);
    let py = parseFloat(point.split(",")[1]);
    let x_norm = map(px, 0, width, 0, width);
    let y_norm = map(py, 0, height, height, 0);

    let x = map(x_norm, 0, width, 0, 1);
    let y = map(y_norm, 0, height, 1, 0);

    x_vals.push(x);
    y_vals.push(y);
  });
}

function draw() {
  tf.tidy(() => {
    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(() => loss(predict(x_vals), ys));
    }
  });

  background(0);

  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], 0, 1, 0, width);
    let py = map(y_vals[i], 0, 1, height, 0);

    stroke(255);
    strokeWeight(10);
    point(px, py);
  }

  tf.tidy(() => {
    const lineX = [0, 1];
    const ys = predict(lineX);

    let x1 = map(lineX[0], 0, 1, 0, width);
    let x2 = map(lineX[1], 0, 1, 0, width);

    lineY = ys.dataSync();

    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);

    stroke(0, 0, 255);
    strokeWeight(2);

    line(x1, y1, x2, y2);
  });
}
