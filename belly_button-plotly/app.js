function getPlot(id) {
    
    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        // get only top 10 sample values to plot and reverse for the plotly
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // get only top 10 values for the otu ids and convert to data type to string
        var idValues = (samples.otu_ids.slice(0, 10));
        var idOtu = idValues.toString();

        // get the top 10 labels for the plot

        var labels = samples.otu_labels.slice(0, 10);

        console.log(sampleValues)
        console.log(idValues)

        
        // create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
                tickvals: `OTU ${idOtu}`
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 100
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);

        //console.log(`ID: ${samples.otu_ids}`)
        
        // create the trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values
            },
            text: labels

        };

        // set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"}
        };

        // create the data variable 
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout);    
    });
}

// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(id, metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicPanel = d3.select("#sample-metadata");
        
        // empty the panel each time before getting new id info
        demographicPanel.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            if(key[0] !== "id") {
                demographicPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            }
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);
        });

        // call the functions to display data for the initial plot 
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();
