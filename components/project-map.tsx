import { MapPin } from 'lucide-react';
import { mapProjects } from '@/lib/site-data';

export function ProjectMap() {
  return (
    <figure className="project-map">
      <div className="project-map-canvas">
        <img
          src="/images/projects/project-region.svg"
          alt="Map of the southeastern and eastern United States from Florida through Pennsylvania"
        />
        {mapProjects.map((project) => (
          <div
            className="project-map-marker"
            key={`${project.city}-${project.projectName}`}
            style={{ left: `${project.x}%`, top: `${project.y}%` }}
          >
            <span className="project-map-pin" aria-hidden="true">
              <MapPin />
            </span>
            <div className="project-map-popup">
              <strong>{project.city}</strong>
              <span>{project.projectName}</span>
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        Initial project-map framework. Additional locations can be added as
        project information is approved for publication.
      </figcaption>
    </figure>
  );
}
