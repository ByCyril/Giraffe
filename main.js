const data = tf.tensor([
  [1000.0, 1500.0, 1200.0, 1800.0, 1600.0, 1100.0, 1000.0, 1250.0],
  [1500.0, 1800.0, 2000.0, 1200.0, 2000.0, 1700.0, 1800.0, 1900.0],
  [900.0, 1000.0, 1200.0, 1500.0, 1200.0, 1550.0, 1000.0, 1100.0]
]);

function degreesOfFreedom() {
  const shape = data.shape;
  const i = shape[0];
  const j = shape[1];

  const one = i - 1;
  const two = i * (j - 1);
  const three = i * j - 1;
  return { df1: one, df2: two, df3: three, I: i, J: j };
}

function sumOfSquares() {
  df = degreesOfFreedom();
  const ij = tf.scalar(df.I * df.J, "float32");
  const j = tf.scalar(df.J, "float32");

  cm = tf
    .sum(data)
    .square()
    .div(ij);

  sstr = tf
    .sum(data, 1)
    .square()
    .div(j)
    .sum()
    .sub(cm);

  sst = data
    .square()
    .sum()
    .sub(cm);

  sse = sst.sub(sstr);
  mstr = sstr.div(tf.scalar(df.I - 1));
  mse = sse.div(tf.scalar(df.I * (df.J - 1)));

  f = mstr.div(mse);

  displayResults(
    sstr.dataSync()[0],
    sse.dataSync()[0],
    sst.dataSync()[0],
    mstr.dataSync()[0],
    mse.dataSync()[0],
    f.dataSync()[0],
    df
  );
}

function displayResults(sstr, sse, sst, mstr, mse, f, df) {
  console.log(df);
  document.getElementById("df1").innerHTML = df.df1;
  document.getElementById("df2").innerHTML = df.df2;
  document.getElementById("df3").innerHTML = df.df3;
  document.getElementById("SSTr").innerHTML = sstr;
  document.getElementById("SSE").innerHTML = sse;
  document.getElementById("SST").innerHTML = sst;
  document.getElementById("MSTr").innerHTML = mstr;
  document.getElementById("MSE").innerHTML = mse;
  document.getElementById("f").innerHTML = f;
}

// sumOfSquares();
