d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let metadata = data.metadata;
  console.log(metadata);

  let resultArray = metadata.filter(sample => sample.id);
  console.log(resultArray);
});

