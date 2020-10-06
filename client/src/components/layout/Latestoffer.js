import React, { useState } from "react";

const Latestoffer = () => {
  const [email, setemail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div>
      <div class="latest-wrapper lf-padding">
        <div
          class="latest-area latest-height d-flex align-items-center"
          //   data-background="assets/img/collection/latest-offer.png"
          style={{
            backgroundImage: " url('assets/img/collection/latest-offer.png')",
          }}
        >
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-xl-5 col-lg-5 col-md-6 offset-xl-1 offset-lg-1">
                <div class="latest-caption">
                  <h2>
                    Get Our
                    <br />
                    Latest Offers News
                  </h2>
                  <p>Subscribe news latter</p>
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-6 ">
                <div class="latest-subscribe">
                  {console.log(email)}
                  <form onSubmit={(e) => onSubmit(e)}>
                    <input
                      type="email"
                      placeholder="Your email here"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />

                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="man-shape">
            {/* <img src="assets/img/collection/latest-man.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latestoffer;
