function renderChart(id) {
    console.log(id);
    // get the data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        var trace = {
            x: samples.sample_values.slice(0, 10),
            y: samples.otu_ids.slice(0, 10),
            type:"bar",
            orientation: "h",
            text: samples.otu_labels.slice(0, 10),
            width: 100
        }

        var data = [trace]

        var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 10,
                b: 100
            }
        }

        Plotly.newPlot("bar", data, layout)
    });
}

function renderInfo(id) {
    d3.json("data/samples.json").then((data)=> {
        
        var metadata = data.metadata;

        console.log(id, metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfoPanel = d3.select("#sample-metadata");
        demographicInfoPanel.html("");

        Object.entries(result).forEach((key) => {
            if(key[0] !== "id") {
                demographicInfoPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            }
        });
    });
}

function optionChanged(id) {
    renderChart(id);
    renderInfo(id);
}

function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);
        });

        renderChart(data.names[0]);
        renderInfo(data.names[0]);
    });
}

init();
