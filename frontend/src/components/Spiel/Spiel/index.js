import React from 'react';
import './spiel.css';

function SpielComponent() {
  return (
    <div className="spiel-wrap">

      <div className="spiel-hero">
        <h1>About this project</h1>
        <p>The goal is to attempt to make the legal system fully transparent.  Currently it is just the opposite.  Possibly purposefully so.</p>
      </div>

      <div className="spiel-section">
        <h2>Where the data comes from</h2>
        <p>
          This site is very much a MVP built from a scrape done roughly five months ago of{' '}
          <a href="https://content-static.app.com/datauniverse/caspio/bundle/NJ_convictions.html" target="_blank" rel="noreferrer">
            DataUniverse's NJ convictions dataset
          </a>{' '}
          - They claimed to have every criminal conviction in New Jersey from 2016 to 2022. Having only 186k entries I doubt that.  As you can see, that page has conveniently been deleted.  It was basically an exercise learning to use Selenium.
        </p>
        <p>
          The dataset gave myself enough to run meaningful statistical analyses. Some basic comparisons
          with Gabel (NJ's public court portal),  show the numbers are so far congruent but nowhere close to statistically confirming it. Compounding this is the simple fact that dataUniverse decided to abbreviate most of the crime names and in some cases there seems to be duplicates with similar crime names. Scraping gabel will help confirm the statute numbers and end this thorny issue.
        </p>
      </div>

      <div className="spiel-section">
        <h2>The problem we're trying to solve</h2>
        <p>
          Without bulk access to the underlying data, the only path to more complete information is{' '}
          <a href="https://portal.njcourts.gov/webe41/ExternalPGPA/" target="_blank" rel="noreferrer">
            NJ Courts Public Access (Gabel)
          </a>{' '}
          — which sits behind captcha hell. Even for now semi-experienced Selenium users like myself, bulk scraping this crap is genuinely difficult.  Possibly illegal too. Who knows?
        </p>
        <div className="spiel-callout">
          <p>
            This is an open call. If you have experience with captcha-solving ideas for bulk scraping,
            or know of an official NJ state CSV dataset I might have missed — I'd love to hear from you.
            Legal guidance is also welcome AND STRONGLY NEEDED.  I am in the hairy area where web development ends and law begins.
          </p>
        </div>
      </div>

      <div className="spiel-section">
        <h2>What we could learn</h2>
        <p>Gabel contains information our original scrape didnt bother to include. 95% plus of criminal arrests end with a plea deal.  Scraping Gabel lets us compare the indictment / arrest records with the plea.  With it, we could answer questions like:</p>
        <ul className="spiel-questions">
          <li>Do public defenders produce statistically worse outcomes than private attorneys?</li>
          <li>What defense attorney is best fighting x crime?</li>  
           <li> Which prosecutors are more harsh for y crime compared to others? </li>
          <li>Are there measurable racial disparities in sentencing?</li>
          <li>Do outcomes vary significantly by county?</li>
          <li>Can we detect the effect of mitigating and aggravating factors on sentences?</li>
          <li>are some crimes over or under prosecuted in particular counties?</li>
        </ul>
        <p>
          This builds on the judge and county comparisons for the final sentence that we have here.  This information is of direct value to defendants, victims, attorneys, and any citizen
          who cares about how justice is administered.
        </p>
      </div>

      <div className="spiel-section">
        <h2>A note on privacy</h2>
        <p>
          All defendant and victim names have been scrubbed from our datasets. DataUniverse was semi careless
          with this — it's probably for the best it is deleted.  I dont want someone to know your name if your case has been sealed or you were a rape victim.  It is difficult enough navigating life as it is.
        </p>
      </div>

      <div className="spiel-section">
        <h2>The bigger picture</h2>
        <p>
          With modest effort and funding, every state's criminal and civil court statistical data could be put online
          and made searchable. What we're doing in New Jersey is a proof of concept for what public legal
          transparency can look like.
        </p>
      </div>

      <div className="spiel-tagline">A transparent legal system is a human right.  We fought a war over this crap.</div>

      

    </div>
  );
}

export default SpielComponent;
