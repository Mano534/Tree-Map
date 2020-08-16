let value,
MovieSales , 
    KickstarterPledges , 
    VideoGameSales , 
    KickstarterPledgesUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json',
    MovieSalesUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
    VideoGameSalesUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

let AllInFunction = ()=>{

    console.log(MovieSales)



    let h = 800;
    let w = 1050;
    let padding = 40;






    let svg =  d3.select('.main')
        .attr("width",w)
        .attr("height",h)
        .style('background-color','#fff')



    let treemapLAyout = d3.treemap();
        treemapLAyout.size([w,h])
        // .paddingInner(1)


    let root = d3.hierarchy(MovieSales)
        .sum(ele=>{return ele["value"]})
        .sort((node1,node2)=>{return node2.value - node1.value})





    treemapLAyout(root);


    let leaf = svg.selectAll('g.til')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform',d=>`translate(${d.x0},${d.y0})`)


    let tile = leaf.append('rect')
        .attr('class',"tile")
        .attr('fill',function(d){
            if(d.parent){
                if(d.data.category === "Action")return 'red'
                if(d.data.category === "Drama")return 'purple'
                if(d.data.category === "Adventure")return 'yellow'
                if(d.data.category === "Family")return 'green'
                if(d.data.category === "Animation")return 'grey'
                if(d.data.category === "Comedy")return 'orange'
                if(d.data.category=== "Biography")return "#00f"
            }
        })
        .attr('data-name',d=>d.data.name)
        .attr("data-category",d=>d.data.category)
        .attr("data-value",d=>d.value)
        .attr('width',d=>(-d.x0+d.x1))
        .attr('height',d=>(-d.y0+d.y1))
        .attr("x",0)
        .attr("y",0)
        .on('mouseover',function(d){
            document.getElementById('tooltip').innerHTML = `<p>Name : ${d.data.name}</p><p>Category : ${d.data.category}</p><p>value : ${d.value}</p>` ;
            document.getElementById('tooltip').setAttribute('data-value',d.value);
             document.getElementById('tooltip').style.visibility = "visible";
            document.addEventListener('mousemove',function(e){
                console.log(e)
                document.getElementById('tooltip').style.top = e.y+'px' ;
                document.getElementById('tooltip').style.left = e.x+10+'px' ;
        })})
        .on('mouseout',function(d){
    
            document.getElementById('tooltip').style.visibility = "hidden";
            // this.style.border = "none"
    
        })
    





    let text = leaf.append('text')
        .text(d=>`${d.data.category}`)
        .attr("x",5)
        .attr("y",d=> 20)
        .attr('class','here')

    let text2 = leaf.append('text')
        .attr("x",5)
        .attr("y",d=> 30)
        .text(d=>`${d.data.name}`)
        .attr('class','there')









        let legend = d3.select('#legend')
        .attr('width',400)
        .attr('height',300)













}

    // console.log(educationValue[0].fips)
d3.json(MovieSalesUrl)
    .then((data3,erro)=>{
        if(erro) return console.log(err)
    MovieSales = data3;
    AllInFunction();
    // console.log(educationValue[0].fips)
})
