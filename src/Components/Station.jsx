import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faRoute, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { generateGoogleMapsURL, formatDistance } from "../utils";

class Station extends React.Component {
  handleClick = e => {
    this.props.expandStation(this.props.data.id);
  };

  render() {
    return (
      <div className={`station ${this.props.isExpanded ? "selected" : ""}`} onClick={this.handleClick}>
        <div className="station--summary">
          <p className="station--name">{this.props.data.name}</p>
          <div className="station--info">
            <p>
              {formatDistance(this.props.data.distance)} <FontAwesomeIcon icon={faRoute} />
            </p>
            <p className={`${this.props.isCritical ? "critical" : ""}`}>
              {this.props.data.free_bikes}/{this.props.data.free_bikes + this.props.data.empty_slots} <FontAwesomeIcon icon={faBicycle} />
            </p>
          </div>
        </div>
        {this.props.isExpanded && (
          <div>
            <p className="station--address">
              <a
                href={generateGoogleMapsURL(this.props.data.latitude, this.props.data.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {this.props.data.extra.address} <FontAwesomeIcon icon={faMapMarkedAlt} />
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Station;
