function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)

            var samples = sampledata.samples
            var results = samples.filter(sampleObject => sampleObject.id == id)
            var result = results[0]
            var otu_ids = result.otu_ids
            var otu_labels = result.otu_labels
            var sample_values = result.sample_values

            var trace1 = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                  color: otu_ids,
                  size: sample_values,
                  colorscale: "Earth",
                }
              };
              
              var data = [trace1];
              
              var layout = {
                title: 'Belly-Button- Bacteria',
                showlegend: false
              };
              
              Plotly.newPlot('bubble', data, layout);
              var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

              var data = [{
                type: 'bar',
                x: sample_values.slice(0, 10).reverse(),
                y: yticks,
                orientation: 'h', 
                text: otu_labels.slice(0, 10).reverse()
              }];
              
              Plotly.newPlot('bar', data);
        
        });
    }

function Start(){
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
    var names = sampledata.names
    names.forEach((name) => {
        dropdown.append("option").text(name).property("value", name)
    })
    var firstSample = names[0]
    getPlots(firstSample)
    metaData(firstSample)
    })
}
function optionChanged(sample){
    getPlots(sample)
    metaData(sample)

}
function metaData(id){
    d3.json("samples.json").then(sampledata =>{
        console.log(sampledata)
    var metaData = sampledata.metadata
    var results = metaData.filter(sampleObject => sampleObject.id == id)
    var result = results[0]
    var metaDiv = d3.select("#sample-metadata")
    metaDiv.html("");
    Object.entries(result).forEach(([key, value]) => {
        metaDiv.append("h6").text(key+" : "+value)
    })
})

}
Start()



