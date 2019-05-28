const xData = tf.tensor1d([
  0.2,
  0.23,
  0.4,
  0.35,
  0.4,
  0.45,
  0.5,
  0.55,
  0.6,
  0.68,
  0.7,
  0.76
]);
const yData = tf.tensor1d([
  -0.7,
  -0.4,
  -0.35,
  0.18,
  0.38,
  -0.1,
  0.2,
  -0.3,
  0.3,
  0.18,
  0.5,
  0.22
]);
const meanX = tf.mean(xData);
const meanY = tf.mean(yData);

var sse = tf.scalar(0);
var sst = tf.scalar(0);
var b0 = tf.scalar(0);
var b1 = tf.scalar(0);

function regressionLine() {
  const sumX = xData.sub(meanX);
  const sumY = yData.sub(meanY);
  const sxy = sumX.mul(sumY).sum();
  sxx = sumX.square().sum();

  b1 = sxy.div(sxx);
  b0 = meanY.sub(b1.mul(meanX));
}

function regressionFunction(x) {
  return b1.mul(x).add(b0);
}

function coefficienfOfDetermination() {
  sse = yData
    .sub(regressionFunction(xData))
    .square()
    .sum();

  sst = yData
    .sub(meanY)
    .square()
    .sum();

  const one = tf.scalar(1);

  return one.sub(sse.div(sst));
}

function sampleCorrelation() {
  const a = xData.sub(meanX);
  const b = yData.sub(meanY);
  const ab = a.mul(b).sum();
  const aa = a.square().sum();
  const bb = b.square().sum();

  return ab.div(aa.mul(bb).sqrt());
}

// Confidence interval for the regression slope
function confidenceIntervalForSlope(t) {
  const n = xData.shape[0];
  const mse = sse.div(tf.scalar(n - 2));

  const sxx = xData
    .sub(meanX)
    .square()
    .sum();

  const q = tf.scalar(t).mul(mse.div(sxx).sqrt());
  const c1 = b1.sub(q);
  const c2 = b1.add(q);

  c1.print();
  c2.print();
}

// Confidence interval for an individual observation
function predictionInterval(x, tScore) {
  const y = regressionFunction(x);

  const n = xData.shape[0];
  const sxx = xData
    .sub(meanX)
    .square()
    .sum();
  const one = tf.scalar(1);

  const s = sse.div(tf.scalar(n - 2)).sqrt();

  const b = x
    .sub(meanX)
    .square()
    .div(sxx);
  const sa = one.add(one.div(n)).add(b);

  const c1 = y.sub(tScore.mul(s).mul(sa.sqrt()));
  const c2 = y.add(tScore.mul(s).mul(sa.sqrt()));
  c1.print();
  c2.print();
}

// Confidence interval for the mean difference at x
function confidenceIntervalDifference(x, t) {
  const y = regressionFunction(x);
  const sxx = xData
    .sub(meanX)
    .square()
    .sum();
  const n = xData.shape[0];

  const s = sse.div(tf.scalar(n - 2)).sqrt();

  const b = x
    .sub(meanX)
    .square()
    .div(sxx);
  const a = tf.scalar(1 / n);
  const c = a.add(b).sqrt();
  const q = t.mul(s).mul(c);

  const c1 = y.sub(q);
  const c2 = y.add(q);
  c1.print();
  c2.print();
}
