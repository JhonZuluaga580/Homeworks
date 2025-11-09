import './CityPeopleList.css';

const CityPeopleList = ({ graph }) => {
  const cities = graph.getNodesByType('city');

  return (
    <div className="city-people-container">
      <h2>📍 Personas por Ciudad</h2>
      
      <div className="cities-grid">
        {cities.map(city => {
          const people = graph.getPeopleInCity(city.id);
          
          return (
            <div key={city.id} className="city-card">
              <div className="city-header">
                <h3>{city.data.name}</h3>
                <span className="people-count">{people.length} personas</span>
              </div>
              
              <div className="people-list">
                {people.length === 0 ? (
                  <p className="no-people">No hay personas registradas</p>
                ) : (
                  <ul>
                    {people.map(person => (
                      <li key={person.id} className="person-item">
                        <div className="person-avatar">
                          {person.data.name.charAt(0)}
                        </div>
                        <div className="person-info">
                          <span className="person-name">{person.data.name}</span>
                          <span className="person-age">{person.data.age} años</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityPeopleList;