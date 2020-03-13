    function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
    const url = "samples.json";
    d3.json(url).then(function(importedData) {
      //  console.log(importedData);
      data = importedData;

      // Use d3 to select the panel with id of `#sample-metadata`
      var sampleMetadata = d3.select("#sample-metadata");
      // // Use `.html("") to clear any existing metadata
      sampleMetadata.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      var metadataRaw = data.metadata;
      filtered = metadataRaw.filter(x => x.id == sample);
    
      filtered.forEach(function(x) {
        var row = sampleMetadata.append("lu");
        Object.entries(x).forEach(function([key, value]) {
        // Append a cell to the row for each value
        var cell = row.append("li");
        cell.text(`${key}: ${value}`);
        if (key = "wfreq") {
          var wfreq = value;
          var dataForGuage = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: value,
              title: { text: "World Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 10 },
              gauge: { axis: { range: [null, 10] } }
            }
          ];
          
          var layout = { width: 400, height: 400, margin: { t: 0, b: 0 } };
          console.log(wfreq);
          Plotly.newPlot('gauge', dataForGuage, layout);
        }
         // BONUS: Build the Gauge Chart
        
        });});
        });
        };
  
  function buildCharts(sample) {
    
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    const url = "samples.json";
    d3.json(url).then(function(importedData) {
      //  console.log(importedData);
      data = importedData;
  
      // @TODO: Build a Bubble Chart using the sample data
      var sampledataRaw = data.samples;
      // console.log(sampledataRaw);
      filtered = sampledataRaw.filter(x => x.id == sample);
      console.log(filtered)
      console.log(filtered[0]["otu_ids"])
              var trace1 = {
                x: filtered[0]["otu_ids"],
                y: filtered[0]["sample_values"],
                text: filtered[0]["otu_labels"],
                mode: 'markers',
                marker: {
                  color: filtered[0]["otu_ids"],
                  size: filtered[0]["sample_values"]
                }
              };
              
              var dataForBubble = [trace1];
              
              var layout = {
                showlegend: false,
                height: 600,
                width: 1200
              };
              
              
          Plotly.newPlot("bubble", dataForBubble, layout);
        // });
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      var Piedata = [{
        values: filtered[0]["sample_values"].slice(0,10) ,
        labels: filtered[0]["otu_ids"],
        type: 'pie',
        hovertext: filtered[0]["otu_labels"],
        hoverinfo: 'hovertext'
        
      }];
      
      var layout = {
        height: 600,
        width: 500
      };
      
      Plotly.newPlot('pie', Piedata, layout);
      
  });
  }
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  init();