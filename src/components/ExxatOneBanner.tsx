export default function ExxatOneBanner() {
  return (
    <section className="exxat-one-promo" aria-label="Exxat One">
      <h2 className="exxat-one-promo-brand">
        Exxat <span>One</span>
      </h2>
      <div className="exxat-one-promo-row">
        <div className="exxat-one-promo-copy">
          <p className="exxat-one-promo-title">Finding placements made easier.</p>
          <p className="exxat-one-promo-sub">
            Availabilities published by top clinical sites are just one click away.
          </p>
        </div>
        <button type="button" className="exxat-one-promo-btn exxat-one-promo-btn-solid">
          Explore Now
        </button>
      </div>
      <div className="exxat-one-promo-row">
        <div className="exxat-one-promo-copy">
          <p className="exxat-one-promo-title">
            Exxat <span>One</span>
            {" \u2194 "}
            Exxat <span>Prism</span>
          </p>
          <p className="exxat-one-promo-sub">
            Simplify your workflow - Link sites/locations from Exxat One and add confirmed
            schedules to Exxat Prism.
          </p>
        </div>
        <button type="button" className="exxat-one-promo-btn exxat-one-promo-btn-outline">
          Process Now
        </button>
      </div>
    </section>
  );
}
