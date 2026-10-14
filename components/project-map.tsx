import { mapLocations } from '@/lib/site-data';

const mapStates = ['Florida', 'Alabama', 'Mississippi', 'Georgia', 'South Carolina'];
const stateLabels = [
  { name: 'Mississippi', x: 17, y: 16 },
  { name: 'Alabama', x: 40, y: 24 },
  { name: 'Georgia', x: 70, y: 18 },
  { name: 'South Carolina', x: 84, y: 10 },
  { name: 'Florida', x: 83, y: 74 },
];

export function ProjectMap() {
  return (
    <figure className="project-map">
      <div className="project-map-canvas">
        <div className="project-map-stage">
          <img
            src="/images/projects/project-region-southeast.svg"
            alt="Map of project locations across Florida, Alabama, Mississippi, Georgia, and South Carolina"
          />
          {stateLabels.map((state) => (
            <span
              className="project-map-state-label"
              key={state.name}
              style={{ left: `${state.x}%`, top: `${state.y}%` }}
              aria-hidden="true"
            >
              {state.name}
            </span>
          ))}
          {mapLocations.map((location) => (
            <button
              type="button"
              className="project-map-marker"
              id={`map-${location.id}`}
              key={location.id}
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              aria-label={`${location.name}, ${location.state}`}
              data-edge={location.x > 80 ? 'right' : undefined}
              data-popup={location.y < 20 ? 'below' : undefined}
            >
              <span className="project-map-pin" aria-hidden="true" />
              <span className="project-map-popup" aria-hidden="true">
                <strong>{location.name}</strong>
                <span>{location.state}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <figcaption>
        Select a dot or a location below to see its name. Positions are
        approximate; county locations use a central point.
      </figcaption>
      <div className="project-map-locations" aria-label="Map locations by state">
        {mapStates.map((state) => (
          <div className="project-map-location-group" key={state}>
            <h3>{state}</h3>
            <ul>
              {mapLocations.filter((location) => location.state === state).map((location) => (
                <li key={location.id}>
                  <a href={`#map-${location.id}`}>{location.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
