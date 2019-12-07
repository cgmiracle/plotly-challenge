// read the data file to get necessary data for the plots
d3.json("data/samples.json").then((data) => {
    console.log(data);

    var values = data.samples;
    console.log(values);

    // grab id, ethnicity, gender, age, location, bb type and wfreq information
    var metaData = data.metadata;
    console.log(metaData);

    var id = metaData.map(d => d.id);
    console.log(id);

    var ethnicity = metaData.map(d => d.ethnicity);
    console.log(ethnicity);

    var gender = metaData.map(d => d.gender);
    console.log(gender);

    var age = metaData.map(d => d.age);
    console.log(age);

    var bbType = metaData.map(d => d.bbtype);
    console.log(bbType)

    var wFreq = metaData.map( d => d.wfreq);
    console.log(wFreq);

    // grab the sample values from the values array
    var sample_values = values.map(d => d.sample_values);
    console.log(sample_values);

    // select top 10 sample_values
    var top_otus = sample_values.map(d => d.slice(0,10));
    console.log(top_otus);
    
    // grab the ids from the values array
    var otu_ids = values.map( d => d.otu_ids);
    console.log(otu_ids);

    // get top 10 otu ids
    var top_ids = otu_ids.map( d => d.slice(0,10));
    console.log(top_ids);

    // grab the labels from the values array
    var otu_labels = values.map( d => d.otu_labels);
    console.log(otu_labels);

    // get top 10 otu lables
    var top_labels = otu_labels.map( d => d.slice(0,10));
    console.log(top_labels)

    
    // create the trace variable for the plot
    var trace = {
        x: top_otus[0],
        y: top_ids[0],
        type:"bar",
        orientation:"h",
        //text: top_labels[0] 
    };

    var data = [trace];

    var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100
          }
    }


    Plotly.newPlot("bar", data, layout);

});   

var option = d3.select("#selDataset").append("option")

        

 var list = d3.select("#sample-metadata").append("ul")
      list.append("li").text("AGE:")
      list.append("li").text("BBTYPE:")
      list.append("li").text("ETHNICITY:")
      list.append("li").text("GENDER:")
      list.append("li").text("LOCATION:")
      list.append("li").text("WFREQ:")
      list.append("li").text("sample:")







// select the dropdown and create an event handler 
// d3.select("#selDataset").on("change", getData);

// // Create the getData function
// function getData(){
//     var dropdownMenu= d3.select("#selDataset")
//     var inputId = dropdownMenu.property("values");

//     var new_id = []
    
//     if (inputId == otu_ids){

//         new_id = otu_ids;
//     }

//     updatePlotly(new_id)    
// }

// function updatePlotly(d){
//     Plotly.restlye("bar", "x", [x])
// }
