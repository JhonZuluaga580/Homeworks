import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './GraphVisualizer.module.scss';

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
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Definir gradientes
    const defs = svg.append('defs');

    // Gradiente para personas
    const personGradient = defs.append('linearGradient')
      .attr('id', 'person-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    
    personGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#5dade2');
    
    personGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2980b9');

    // Gradiente para ciudades
    const cityGradient = defs.append('linearGradient')
      .attr('id', 'city-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    
    cityGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#ec7063');
    
    cityGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#c0392b');

    // Crear las líneas (links)
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#95a5a6')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', '5,5')
      .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))');

    // Animación de las líneas
    link.each(function() {
      d3.select(this)
        .attr('stroke-dashoffset', 10)
        .transition()
        .duration(20000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', function repeat() {
          d3.select(this)
            .transition()
            .duration(20000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -20)
            .on('end', repeat);
        });
    });

    // Crear grupos para los nodos
    const node = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => handleNodeClick(d))
      .style('cursor', 'pointer');

    // Agregar formas a los nodos
    node.each(function(d) {
      const g = d3.select(this);
      
      if (d.type === 'person') {
        // Círculo externo (halo)
        g.append('circle')
          .attr('r', 25)
          .attr('fill', 'rgba(52, 152, 219, 0.2)')
          .attr('class', 'node-halo');
        
        // Círculo principal para personas
        g.append('circle')
          .attr('r', 20)
          .attr('fill', 'url(#person-gradient)')
          .attr('stroke', '#2980b9')
          .attr('stroke-width', 3)
          .attr('class', 'node-shape');
      } else {
        // Cuadrado externo (halo)
        g.append('rect')
          .attr('x', -30)
          .attr('y', -30)
          .attr('width', 60)
          .attr('height', 60)
          .attr('fill', 'rgba(231, 76, 60, 0.2)')
          .attr('rx', 8)
          .attr('class', 'node-halo');
        
        // Cuadrado principal para ciudades
        g.append('rect')
          .attr('x', -25)
          .attr('y', -25)
          .attr('width', 50)
          .attr('height', 50)
          .attr('fill', 'url(#city-gradient)')
          .attr('stroke', '#c0392b')
          .attr('stroke-width', 3)
          .attr('rx', 5)
          .attr('class', 'node-shape');
      }
    });

    // Agregar iconos a los nodos
    node.append('text')
      .text(d => d.type === 'person' ? '👤' : '🏙️')
      .attr('text-anchor', 'middle')
      .attr('dy', 7)
      .attr('font-size', '18px')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Agregar texto a los nodos (nombre)
    const text = node.append('text')
      .text(d => d.name.split('\n')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', 45)
      .attr('font-size', '13px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2c3e50')
      .style('pointer-events', 'none')
      .style('text-shadow', '1px 1px 2px rgba(255,255,255,0.8)');

    // Agregar subtítulo (edad para personas)
    node.filter(d => d.type === 'person')
      .append('text')
      .text(d => {
        const lines = d.name.split('\n');
        return lines[1] || '';
      })
      .attr('text-anchor', 'middle')
      .attr('dy', 60)
      .attr('font-size', '11px')
      .attr('fill', '#7f8c8d')
      .style('pointer-events', 'none')
      .style('text-shadow', '1px 1px 2px rgba(255,255,255,0.8)');

    // Efecto hover
    node.on('mouseenter', function(event, d) {
      // Resaltar nodo
      d3.select(this).select('.node-shape')
        .transition()
        .duration(200)
        .attr('r', d.type === 'person' ? 24 : null)
        .attr('width', d.type === 'city' ? 60 : null)
        .attr('height', d.type === 'city' ? 60 : null)
        .attr('x', d.type === 'city' ? -30 : null)
        .attr('y', d.type === 'city' ? -30 : null)
        .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))');
      
      // Animar halo
      d3.select(this).select('.node-halo')
        .transition()
        .duration(200)
        .attr('r', d.type === 'person' ? 30 : null)
        .attr('width', d.type === 'city' ? 70 : null)
        .attr('height', d.type === 'city' ? 70 : null)
        .attr('x', d.type === 'city' ? -35 : null)
        .attr('y', d.type === 'city' ? -35 : null);

      // Resaltar conexiones
      link
        .style('stroke', l => (l.source === d || l.target === d) ? '#2ecc71' : '#95a5a6')
        .style('stroke-width', l => (l.source === d || l.target === d) ? 3 : 2)
        .style('stroke-opacity', l => (l.source === d || l.target === d) ? 1 : 0.3);
    })
    .on('mouseleave', function(event, d) {
      // Restaurar nodo
      d3.select(this).select('.node-shape')
        .transition()
        .duration(200)
        .attr('r', d.type === 'person' ? 20 : null)
        .attr('width', d.type === 'city' ? 50 : null)
        .attr('height', d.type === 'city' ? 50 : null)
        .attr('x', d.type === 'city' ? -25 : null)
        .attr('y', d.type === 'city' ? -25 : null)
        .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
      
      // Restaurar halo
      d3.select(this).select('.node-halo')
        .transition()
        .duration(200)
        .attr('r', d.type === 'person' ? 25 : null)
        .attr('width', d.type === 'city' ? 60 : null)
        .attr('height', d.type === 'city' ? 60 : null)
        .attr('x', d.type === 'city' ? -30 : null)
        .attr('y', d.type === 'city' ? -30 : null);

      // Restaurar conexiones
      link
        .style('stroke', '#95a5a6')
        .style('stroke-width', 2)
        .style('stroke-opacity', 0.6);
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

  // Calcular estadísticas
  const stats = {
    totalPeople: graph.getNodesByType('person').length,
    totalCities: graph.getNodesByType('city').length,
    totalConnections: data.links.length
  };

  return (
    <div className={styles.graphVisualizer}>
      <div className={styles.graphLegend}>
        <h3>Leyenda del Grafo</h3>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendCircle} ${styles.person}`}></div>
            <span>Personas</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendSquare} ${styles.city}`}></div>
            <span>Ciudades</span>
          </div>
        </div>
        <p className={styles.legendNote} data-emoji="💡">
          Haz clic en los nodos para ver información en la consola
        </p>
        <p className={styles.legendNote} data-emoji="🖱️">
          Arrastra los nodos para reorganizar el grafo
        </p>
        
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h4>Personas</h4>
            <p>{stats.totalPeople}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Ciudades</h4>
            <p>{stats.totalCities}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Conexiones</h4>
            <p>{stats.totalConnections}</p>
          </div>
        </div>
      </div>

      <div className={styles.graphContainer}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;