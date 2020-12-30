import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-brand">
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                TRIMIX
              </Link>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
