var xData = tf.tensor1d([0]);
var yData = tf.tensor1d([0]);

var meanX = tf.scalar(0);
var meanY = tf.scalar(0);
var sse = tf.scalar(0);
var sst = tf.scalar(0);
var b0 = tf.scalar(0);
var b1 = tf.scalar(0);

function getData() {
  const xs = document.getElementById("xData").value.split(",");
  const ys = document.getElementById("yData").value.split(",");

  if (xs.length === 0 || ys.length === 0) {
    return;
  }
  var parsedX = [];
  var parsedY = [];

  xs.forEach(function(x) {
    parsedX.push(parseFloat(x));
  });

  ys.forEach(function(y) {
    parsedY.push(parseFloat(y));
  });

  xData = tf.tensor1d(parsedX);
  yData = tf.tensor1d(parsedY);
}

function regressionLine() {
  getData();

  meanX = tf.mean(xData);
  meanY = tf.mean(yData);

  tf.tidy(() => {
    const sumX = xData.sub(meanX);
    const sumY = yData.sub(meanY);
    const sxy = sumX.mul(sumY).sum();

    sxx = tf.keep(sumX.square().sum());
    b1 = tf.keep(sxy.div(sxx));
    b0 = tf.keep(meanY.sub(b1.mul(meanX)));
  });

  showButtons();
  outsideTensors("first");
}

function regressionFunction(x) {
  return b1.mul(x).add(b0);
}

function coefficienfOfDetermination() {
  tf.tidy(() => {
    const x = regressionFunction(xData);
    sse = tf.keep(
      yData
        .sub(x)
        .square()
        .sum()
    );

    sst = tf.keep(
      yData
        .sub(meanY)
        .square()
        .sum()
    );

    const one = tf.scalar(1);
    const cod = one.sub(sse.div(sst)).dataSync();

    displayCoefficientOfDetermination(cod);
  });
}

function sampleCorrelation() {
  tf.tidy(() => {
    const a = xData.sub(meanX);
    const b = yData.sub(meanY);
    const ab = a.mul(b).sum();
    const aa = a.square().sum();
    const bb = b.square().sum();

    const x = ab.div(aa.mul(bb).sqrt()).dataSync();

    displaySampleCorrelation(x);
  });
}

// Confidence interval for the regression slope
function confidenceIntervalForSlope() {
  const tScore = document.getElementById("tscore-confidenceIntervalSlope")
    .value;

  tf.tidy(() => {
    const t = tf.scalar(parseFloat(tScore));
    const n = xData.shape[0];
    const mse = sse.div(tf.scalar(n - 2));

    const sxx = xData
      .sub(meanX)
      .square()
      .sum();

    const q = t.mul(mse.div(sxx).sqrt());
    const c1 = b1.sub(q).dataSync();
    const c2 = b1.add(q).dataSync();

    displayConfidenceIntervalForRegressionSlope(c1, c2);
  });
}

// Confidence interval for an individual observation
function predictionInterval() {
  const xInput = document.getElementById("x-predictionInterval").value;
  const t = document.getElementById("tscore-predictionInterval").value;

  tf.tidy(() => {
    const tScore = tf.scalar(parseFloat(t));
    const x = tf.scalar(parseFloat(xInput));
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

    const c1 = y.sub(tScore.mul(s).mul(sa.sqrt())).dataSync();
    const c2 = y.add(tScore.mul(s).mul(sa.sqrt())).dataSync();
    displayConfidenceIntervalForPredictionInterval(c1, c2);
  });
}

// Confidence interval for the mean difference at x
function confidenceIntervalDifference() {
  const xInput = document.getElementById("x-confidenceIntervalDifference")
    .value;
  const tScore = document.getElementById("tscore-confidenceIntervalDifference")
    .value;

  tf.tidy(() => {
    const x = tf.scalar(parseFloat(xInput));
    const t = tf.scalar(parseFloat(tScore));
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

    const c1 = y.sub(q).dataSync();
    const c2 = y.add(q).dataSync();

    displayConfidenceIntervalDifference(c1, c2);
  });
}

function insideTensors(label) {
  console.log(label, "numTensors (inside tidy): " + tf.memory().numTensors);
}

function outsideTensors(label) {
  console.log(label, "numTensors (outside tidy): " + tf.memory().numTensors);
}
