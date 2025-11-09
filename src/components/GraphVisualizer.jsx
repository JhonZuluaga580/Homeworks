import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './GraphVisualizer.css';

const GraphVisualizer = ({ graph }) => {
  const svgRef = useRef();
  const data = graph.toD3GraphFormat();

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Limpiar SVG previo
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 1200;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Crear simulación de fuerzas
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Crear las líneas (links)
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#95a5a6')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Crear grupos para los nodos
    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => handleNodeClick(d));

    // Agregar formas a los nodos
    node.each(function(d) {
      const g = d3.select(this);
      
      if (d.type === 'person') {
        // Círculo para personas
        g.append('circle')
          .attr('r', 20)
          .attr('fill', '#3498db')
          .attr('stroke', '#2980b9')
          .attr('stroke-width', 3);
      } else {
        // Cuadrado para ciudades
        g.append('rect')
          .attr('x', -25)
          .attr('y', -25)
          .attr('width', 50)
          .attr('height', 50)
          .attr('fill', '#e74c3c')
          .attr('stroke', '#c0392b')
          .attr('stroke-width', 3)
          .attr('rx', 5);
      }
    });

    // Agregar texto a los nodos
    const text = node.append('text')
      .text(d => d.name.split('\n')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', 40)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2c3e50')
      .style('pointer-events', 'none');

    // Agregar subtítulo (edad para personas)
    node.filter(d => d.type === 'person')
      .append('text')
      .text(d => {
        const lines = d.name.split('\n');
        return lines[1] || '';
      })
      .attr('text-anchor', 'middle')
      .attr('dy', 54)
      .attr('font-size', '10px')
      .attr('fill', '#7f8c8d')
      .style('pointer-events', 'none');

    // Efecto hover
    node.on('mouseenter', function() {
      d3.select(this).select('circle, rect')
        .transition()
        .duration(200)
        .attr('r', function() {
          return d3.select(this).node().tagName === 'circle' ? 24 : null;
        })
        .attr('width', function() {
          return d3.select(this).node().tagName === 'rect' ? 60 : null;
        })
        .attr('height', function() {
          return d3.select(this).node().tagName === 'rect' ? 60 : null;
        })
        .attr('x', function() {
          return d3.select(this).node().tagName === 'rect' ? -30 : null;
        })
        .attr('y', function() {
          return d3.select(this).node().tagName === 'rect' ? -30 : null;
        });
    })
    .on('mouseleave', function() {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 20);
      
      d3.select(this).select('rect')
        .transition()
        .duration(200)
        .attr('width', 50)
        .attr('height', 50)
        .attr('x', -25)
        .attr('y', -25);
    });

    // Actualizar posiciones en cada tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Funciones de arrastre
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function handleNodeClick(d) {
      const graphNode = graph.getNode(d.id);
      console.log('\n🔍 Nodo seleccionado:', graphNode);
      
      if (graphNode.type === 'city') {
        const people = graph.getPeopleInCity(d.id);
        console.log(`\n📍 Personas en ${graphNode.data.name}:`);
        if (people.length === 0) {
          console.log('  No hay personas registradas');
        } else {
          people.forEach(person => {
            console.log(`  - ${person.data.name}, ${person.data.age} años`);
          });
        }
      } else if (graphNode.type === 'person') {
        const city = graph.getCityOfPerson(d.id);
        console.log(`\n👤 ${graphNode.data.name} (${graphNode.data.age} años)`);
        console.log(`📍 Vive en: ${city ? city.data.name : 'Ciudad no encontrada'}`);
        
        // Mostrar amigos
        const connections = graph.getConnections(d.id);
        const friends = connections
          .map(id => graph.getNode(id))
          .filter(n => n && n.type === 'person');
        
        if (friends.length > 0) {
          console.log('👥 Amigos:');
          friends.forEach(friend => {
            console.log(`  - ${friend.data.name}`);
          });
        }
      }
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data, graph]);

  return (
    <div className="graph-visualizer">
      <div className="graph-legend">
        <h3>Leyenda:</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-circle person"></div>
            <span>Personas</span>
          </div>
          <div className="legend-item">
            <div className="legend-square city"></div>
            <span>Ciudades</span>
          </div>
        </div>
        <p className="legend-note">💡 Haz clic en los nodos para ver información en la consola</p>
        <p className="legend-note">🖱️ Arrastra los nodos para reorganizar el grafo</p>
      </div>

      <div className="graph-container">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;