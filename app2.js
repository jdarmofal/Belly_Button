d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  let metadata = data.metadata;
  console.log(metadata);

  let resultArray = metadata.filter(sample => sample.id);
  console.log(resultArray);
});

function buildMetadata(sample) {
  var url = `/metadata/${sample}`;
  
  
  d3.json(url).then(function(response) {
   
    d3.select("#sample-metadata").html("");
   
    Object.entries(response).forEach(([key, value]) => {
  
      d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
    });
  });
}; 

function buildCharts(sample) {
  var url = `/samples/${sample}`;
 
  d3.json(url).then(function(response) {
    
    var otu_ids = response["otu_ids"]; 
    var sample_otu_ids = otu_ids.slice(0, 10);
    var values = response["sample_values"];
    var sample_values = values.slice(0, 10);
    var text = response["otu_labels"]; 
   

    var trace1 = {
      labels: otu_ids,
      values: sample_values, 
      hovertext: text,
      type: 'pie'
    }; 
    var data1 = [trace1];
    var layout1 = {
      title: "BellyButton Diversity Pi Chart"
    };

    var trace2 = {
      x: otu_ids, 
      y: values, 
      mode: 'markers',
      marker: {
        size: values, 
        color: otu_ids, 
      },
      text: text, 
      type: 'scatter'
    };
    var data2 = [trace2];
    var layout2 = {
      title: 'BellyButton Diversity Bubble Chart',
      showlegend: false,
      height: 750,
      width: 750
    };

    // Pie Chart
    Plotly.newPlot("pie", data1, layout1);
    // Bubble Chart
    Plotly.newPlot("bubble", data2, layout2);
  });
}; 

function init() {
 
  var selector = d3.select("#selDataset");


  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

 
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {

  buildCharts(newSample);
  buildMetadata(newSample);
}


init();