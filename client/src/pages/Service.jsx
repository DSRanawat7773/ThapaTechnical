import React from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  // Debugging tip: Log the services data
  console.log("Services data:", services);

  if (!services || !Array.isArray(services)) {
    // Render a loading or fallback UI if services is not an array or is undefined
    return <div>Loading...</div>;
  }

  return (
    <section className="section-services">
      <div className="container">
        {/* Corrected class name */}
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { price, service, provider, description } = curElem;

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services info"
                  width="200"
                />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>Rs.{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
