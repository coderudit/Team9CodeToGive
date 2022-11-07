import React from "react";
import styles from "../styles/HomePage.module.css";
import NavigationBar from "./NavigationBar/Navbar";
import Footer from "./Footer/Footer";

const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <div>
        <div className={styles.banner}>
          <div className={styles.twoSection}></div>
          <div className={styles.twoSection}>
            <h1>MS Connect: Connecting Like Minds</h1>
            <p>
              Facilitating a platform for like minded people to connect and share ideas
            </p>
          </div>
        </div>

        {/* <div className={styles.colorBanner}>
          <h1 className={styles.title}>What we offer</h1>
          <div className={styles.threeRow}>
            <div className={styles.threeSection}>
              <h2 className={styles.title}>Peer Support</h2>
              <p> Join us for online counseling, peer support and more</p>
            </div>

            <div className={styles.threeSection}>
              <h2 className={styles.title}>Simple Interface</h2>
              <p>Easy to use interface. Press the button and we do the rest</p>
            </div>

            <div className={styles.threeSection}>
              <h2 className={styles.title}>Professional Appointments</h2>
              <p>Join us for consulation with trained emotional welness experts</p>
            </div>
          </div>
        </div>

        <div className={styles.banner2}>
          <div className={styles.missionStatement}>
            <h1 className={styles.title}>Our Mission</h1>
            <p>Connecting, facilitating, supporting</p>
          </div>
        </div> */}

        {/* <div className={styles.banner2}>
          <h1 className={styles.title}>Start today!</h1>
          <div>
            <div className={styles.selectTopicButtonContainer}>
              <a className={styles.selectTopicButton} href="/login">
                Login
              </a>
            </div>
          </div>
        </div> */}
      </div>
      )
      <Footer />
    </>
  );
};

export default Homepage;
