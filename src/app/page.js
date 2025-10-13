"use client";

import Image from "next/image";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { useState } from "react";
import LoginModal from "./components/LoginModal";

export default function Page() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main>
      {/* ✅ NAVBAR */}
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image
              src="/assets/logo.png"
              alt="Summarist logo"
              width={200}
              height={50}
              className="nav__img"
            />
          </figure>

          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </li>
            <li className="nav__list">About</li>
            <li className="nav__list">Contact</li>
            <li className="nav__list">Help</li>
          </ul>
        </div>
      </nav>

      {/* ✅ HERO / LANDING */}
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <h1 className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </h1>
                <p className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </p>
                <button
                  className="btn home__cta--btn"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </button>
              </div>

              <figure className="landing__image--mask">
                <Image
                  src="/assets/hero-image.png"
                  alt="Hero"
                  width={400}
                  height={400}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section id="features" className="container">
        <div className="row">
          <div className="section__title">Understand books in few minutes</div>
          <div className="features__wrapper">
            <div className="features">
              <div className="features__icon">
                <AiFillFileText />
              </div>
              <div className="features__title">Read or listen</div>
              <div className="features__sub--title">
                Save time by getting the core ideas from the best books.
              </div>
            </div>

            <div className="features">
              <div className="features__icon">
                <AiFillBulb />
              </div>
              <div className="features__title">Find your next read</div>
              <div className="features__sub--title">
                Explore book lists and personalized recommendations.
              </div>
            </div>

            <div className="features">
              <div className="features__icon">
                <AiFillAudio />
              </div>
              <div className="features__title">Briefcasts</div>
              <div className="features__sub--title">
                Gain valuable insights from briefcasts.
              </div>
            </div>
          </div>

          {/* ✅ STATS ROW 1 */}
          <div className="statistics__wrapper">
            <div className="statistics__content--header">
              <div className="statistics__heading">Enhance your knowledge</div>
              <div className="statistics__heading">Achieve greater success</div>
              <div className="statistics__heading">Improve your health</div>
              <div className="statistics__heading">
                Develop better parenting skills
              </div>
              <div className="statistics__heading statistics__heading--active">
                Increase happiness
              </div>
              <div className="statistics__heading">
                Be the best version of yourself!
              </div>
            </div>

            <div className="statistics__content--details">
              <div className="statistics__data">
                <div className="statistics__data--number">93%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>significantly increase</b> reading
                  frequency.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">96%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">90%</div>
                <div className="statistics__data--title">
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>

          {/* ✅ STATS ROW 2 */}
          <div className="statistics__wrapper">
            <div className="statistics__content--details statistics__content--details-second">
              <div className="statistics__data">
                <div className="statistics__data--number">91%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>report feeling more productive</b>{" "}
                  after incorporating the service into their daily routine.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">94%</div>
                <div className="statistics__data--title">
                  of Summarist members have <b>noticed an improvement</b> in
                  comprehension and retention.
                </div>
              </div>
              <div className="statistics__data">
                <div className="statistics__data--number">88%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>feel more informed</b> about current
                  events and trends.
                </div>
              </div>
            </div>

            <div className="statistics__content--header statistics__content--header-second">
              <div className="statistics__heading">Expand your learning</div>
              <div className="statistics__heading">Accomplish your goals</div>
              <div className="statistics__heading">
                Strengthen your vitality
              </div>
              <div className="statistics__heading">
                Become a better caregiver
              </div>
              <div className="statistics__heading statistics__heading--active">
                Improve your mood
              </div>
              <div className="statistics__heading">Maximize your abilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ REVIEWS SECTION */}
      <section id="reviews">
        <div className="row container">
          <div className="section__title">What our members say</div>
          <div className="reviews__wrapper">
            {[
              {
                name: "Hanna M.",
                text: "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
              },
              {
                name: "David B.",
                text: "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive.",
              },
              {
                name: "Nathan S.",
                text: "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative.",
              },
              {
                name: "Ryan R.",
                text: "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview.",
              },
            ].map((review, i) => (
              <div key={i} className="review">
                <div className="review__header">
                  <div className="review__name">{review.name}</div>
                  <div className="review__stars">
                    <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                    <BsStarFill />
                  </div>
                </div>
                <div className="review__body">{review.text}</div>
              </div>
            ))}
          </div>

          <div className="reviews__btn--wrapper">
            <button
              className="btn home__cta--btn"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* ✅ NUMBERS SECTION */}
      <section id="numbers">
        <div className="container row">
          <div className="section__title">Start growing with Summarist now</div>
          <div className="numbers__wrapper">
            <div className="numbers">
              <div className="numbers__icon">
                <BiCrown />
              </div>
              <div className="numbers__title">3 Million</div>
              <div className="numbers__sub--title">
                Downloads on all platforms
              </div>
            </div>
            <div className="numbers">
              <div className="numbers__icon numbers__star--icon">
                <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                <BsStarHalf />
              </div>
              <div className="numbers__title">4.5 Stars</div>
              <div className="numbers__sub--title">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div className="numbers">
              <div className="numbers__icon">
                <RiLeafLine />
              </div>
              <div className="numbers__title">97%</div>
              <div className="numbers__sub--title">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer id="footer">
        <div className="container row">
          <div className="footer__top--wrapper">
            {[
              {
                title: "Actions",
                links: [
                  "Summarist Magazine",
                  "Cancel Subscription",
                  "Help",
                  "Contact us",
                ],
              },
              {
                title: "Useful Links",
                links: [
                  "Pricing",
                  "Summarist Business",
                  "Gift Cards",
                  "Authors & Publishers",
                ],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Partners", "Code of Conduct"],
              },
              {
                title: "Other",
                links: [
                  "Sitemap",
                  "Legal Notice",
                  "Terms of Service",
                  "Privacy Policies",
                ],
              },
            ].map((block, i) => (
              <div key={i} className="footer__block">
                <div className="footer__link--title">{block.title}</div>
                {block.links.map((link, j) => (
                  <div key={j} className="footer__link--wrapper">
                    <a className="footer__link">{link}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="footer__copyright--wrapper">
            <div className="footer__copyright">Copyright © 2025 Summarist.</div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}
