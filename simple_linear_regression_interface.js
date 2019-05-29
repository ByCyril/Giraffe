const elements = [
  "coefficienfOfDetermination",
  "sampleCorrelation",
  "confidenceIntervalSlope",
  "predictioninterval",
  "confidenceIntervalDifference"
];
function displayCoefficientOfDetermination(x) {
  document.getElementById("coefficienfOfDetermination-label").innerHTML =
    "Coefficient of Determination: " + x;
}

function displaySampleCorrelation(x) {
  document.getElementById("sampleCorrelation-label").innerHTML =
    "Sample Correlation: " + x;
}

function displayConfidenceIntervalForRegressionSlope(lower, upper) {
  document.getElementById("confidenceIntervalSlope-label").innerHTML =
    "Confidence Interval for Regression Slope: (" + lower + ", " + upper + ")";
}

function displayConfidenceIntervalForPredictionInterval(lower, upper) {
  document.getElementById("predictionInterval-label").innerHTML =
    "Confidence Interval for Prediction: (" + lower + ", " + upper + ")";
}

function displayConfidenceIntervalDifference(lower, upper) {
  document.getElementById("confidenceIntervalDifference-label").innerHTML =
    "Confidence Interval for Difference: (" + lower + ", " + upper + ")";
}

function dummyData() {
  x = "0.2, 0.23, 0.4, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.68, 0.7, 0.76";
  y = "-0.7, -0.4, -0.35, 0.18, 0.38, -0.1, 0.2, -0.3, 0.3, 0.18, 0.5, 0.22";
  document.getElementById("xData").value = x;
  document.getElementById("yData").value = y;
}

function hideButtons() {
  elements.forEach(function(id) {
    var x = document.getElementById(id);

    if (x.style.visibility === "") {
      x.style.visibility = "hidden";
    } else {
      x.style.visibility = "visible";
    }
  });
}

function showButtons() {
  elements.forEach(function(id) {
    document.getElementById(id).style.visibility = "visible";
  });
}

hideButtons();
dummyData();
