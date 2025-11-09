import styles from './CityPeopleList.module.scss';

const CityPeopleList = ({ graph }) => {
  const cities = graph.getNodesByType('city');

  return (
    <div className={styles.cityPeopleContainer}>
      <h2>📍 Personas por Ciudad</h2>
      
      <div className={styles.citiesGrid}>
        {cities.map(city => {
          const people = graph.getPeopleInCity(city.id);
          
          return (
            <div key={city.id} className={styles.cityCard}>
              <div className={styles.cityHeader}>
                <h3>{city.data.name}</h3>
                <span className={styles.peopleCount}>
                  {people.length} {people.length === 1 ? 'persona' : 'personas'}
                </span>
              </div>
              
              <div className={styles.peopleList}>
                {people.length === 0 ? (
                  <p className={styles.noPeople}>No hay personas registradas</p>
                ) : (<ul>
                    {people.map(person => (
                      <li key={person.id} className={styles.personItem}>
                        <div className={styles.personAvatar}>
                          {person.data.name.charAt(0)}
                        </div>
                        <div className={styles.personInfo}>
                          <span className={styles.personName}>{person.data.name}</span>
                          <span className={styles.personAge}>{person.data.age} años</span>
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