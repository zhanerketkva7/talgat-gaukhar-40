import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Check,
  MapPin,
  Music,
  Pause,
  Send,
  X,
} from "lucide-react";
import "./index.css";

const EVENT_DATE = new Date("2026-11-06T19:00:00+05:00");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbygLYTTNDp5aePrwJD95jA2o1cAEccu0P9BMlxUzSZraXocM1MPk3pj09fL7BC08LcBhA/exec";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function handleRSVP() {
    if (!name.trim() || !attendance || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();

      formData.append("name", name.trim());

      formData.append(
        "attendance",
        attendance === "yes"
          ? "Иә, қатысамын"
          : "Өкінішке қарай, келе алмаймын"
      );

      formData.append(
        "guests",
        attendance === "yes" ? String(guests) : "0"
      );

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setSubmitted(true);

      setName("");
      setAttendance("");
      setGuests(1);
    } catch (error) {
      console.error("RSVP error:", error);

      alert(
        "Жауапты жіберу кезінде қате орын алды. Қайтадан көріңіз."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app">
      <button
        className="music-button"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label="Музыка"
      >
        {isPlaying ? <Pause size={17} /> : <Music size={17} />}
      </button>

      <nav className="top-nav">
        <a href="#invitation">Шақыру</a>
        <a href="#date">Күні</a>
        <a href="#venue">Мекенжай</a>
        <a href="#rsvp">RSVP</a>
      </nav>

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-line hero-line-left" />
        <div className="hero-line hero-line-right" />

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
              },
            },
          }}
        >
          <motion.p className="hero-small" variants={fadeUp}>
            МЕРЕЙТОЙ
          </motion.p>

          <motion.div className="number-wrap" variants={fadeUp}>
            <span className="number">40</span>
          </motion.div>

          <motion.div className="hero-names" variants={fadeUp}>
            <span>Талғат</span>
            <span className="ampersand">&</span>
            <span>Гаухар</span>
          </motion.div>

          <motion.div className="hero-divider" variants={fadeUp} />

          <motion.p className="hero-date" variants={fadeUp}>
            06.11.2026
          </motion.p>
        </motion.div>

        <motion.a
          href="#invitation"
          className="scroll-down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Төмен қарай сырғытыңыз</span>
          <ChevronDown size={18} />
        </motion.a>
      </section>

      <main>
        <section id="invitation" className="invitation section-light">
          <motion.div
            className="content-narrow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="eyebrow">ШАҚЫРУ</span>

            <h2>
              Ардақты ағайын,
              <br />
              қадірлі туған-туыс,
              <br />
              дос-жаран!
            </h2>

            <div className="gold-line" />

            <p className="lead">
              Сіздерді Талғат пен Гаухардың 40 жас мерейтойына
              арналған ақ дастарханымыздың қадірлі қонағы болуға
              шақырамыз!
            </p>

            <p>
              Бұл ерекше кешті сіздермен бірге атап өтсек,
              қуанышымыз еселене түсер еді.
            </p>

            <p className="invitation-ending">
              Сіздерді асыға күтеміз!
            </p>
          </motion.div>
        </section>

        <section id="date" className="date-section">
          <div className="date-decor date-decor-left" />
          <div className="date-decor date-decor-right" />

          <motion.div
            className="date-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="eyebrow">МЕРЕЙТОЙЫМЫЗДЫҢ КҮНІ</span>

            <div className="big-date">
              <span>06</span>

              <div>
                <strong>ҚАРАША</strong>
                <small>2026</small>
              </div>
            </div>

            <div className="date-icon">
              <CalendarDays size={20} />
            </div>

            <p className="day">Жұма</p>
          </motion.div>
        </section>

        <section className="countdown-section">
          <motion.div
            className="countdown-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="eyebrow">КҮТУ</span>

            <h2>Кездесуге санаулы күн қалды</h2>

            <div className="countdown">
              <CountdownItem
                value={timeLeft.days}
                label="КҮН"
              />

              <span className="count-separator">:</span>

              <CountdownItem
                value={timeLeft.hours}
                label="САҒАТ"
              />

              <span className="count-separator">:</span>

              <CountdownItem
                value={timeLeft.minutes}
                label="МИНУТ"
              />

              <span className="count-separator">:</span>

              <CountdownItem
                value={timeLeft.seconds}
                label="СЕКУНД"
              />
            </div>
          </motion.div>
        </section>

        <section id="venue" className="venue section-light">
          <motion.div
            className="venue-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <div className="venue-icon">
              <MapPin size={25} />
            </div>

            <span className="eyebrow">
              ТОЙЫМЫЗДЫҢ МЕКЕНЖАЙЫ
            </span>

            <h2>Мейрамхана атауы</h2>

            <p>Астана қаласы</p>

            <a
              className="map-button"
              href="https://2gis.kz"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} />
              Картадан көру
            </a>
          </motion.div>
        </section>

        <section id="rsvp" className="rsvp-section">
          <motion.div
            className="rsvp-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="eyebrow">RSVP</span>

            {!submitted ? (
              <>
                <h2>Қуанышымызға ортақ боласыз ба?</h2>

                <p className="rsvp-description">
                  Кешімізге қатысатыныңызды алдын ала
                  хабарлауыңызды сұраймыз.
                </p>

                <div className="form">
                  <label>
                    <span>Есіміңіз</span>

                    <input
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Аты-жөніңіз"
                    />
                  </label>

                  <div className="form-label">
                    Мерейтойға қатысасыз ба?
                  </div>

                  <div className="attendance-options">
                    <button
                      type="button"
                      className={
                        attendance === "yes"
                          ? "choice active"
                          : "choice"
                      }
                      onClick={() =>
                        setAttendance("yes")
                      }
                    >
                      <Check size={18} />
                      Иә, міндетті түрде келемін
                    </button>

                    <button
                      type="button"
                      className={
                        attendance === "no"
                          ? "choice active"
                          : "choice"
                      }
                      onClick={() =>
                        setAttendance("no")
                      }
                    >
                      <X size={18} />
                      Өкінішке қарай, келе алмаймын
                    </button>
                  </div>

                  {attendance === "yes" && (
                    <motion.label
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                    >
                      <span>
                        Сізбен бірге қанша адам келеді?
                      </span>

                      <select
                        value={guests}
                        onChange={(e) =>
                          setGuests(
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value={1}>
                          Тек өзім
                        </option>

                        <option value={2}>
                          2 адам
                        </option>

                        <option value={3}>
                          3 адам
                        </option>

                        <option value={4}>
                          4 адам
                        </option>

                        <option value={5}>
                          5 адам
                        </option>
                      </select>
                    </motion.label>
                  )}

                  <button
                    type="button"
                    className="submit-button"
                    onClick={handleRSVP}
                    disabled={
                      !name.trim() ||
                      !attendance ||
                      isSubmitting
                    }
                  >
                    <Send size={17} />

                    {isSubmitting
                      ? "Жіберілуде..."
                      : "Жауапты жіберу"}
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                className="success"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                <div className="success-icon">
                  <Check size={30} />
                </div>

                <h2>Рақмет!</h2>

                <p>
                  Жауабыңыз қабылданды.
                  <br />
                  Сізді асыға күтеміз!
                </p>

                <button
                  type="button"
                  className="again-button"
                  onClick={() =>
                    setSubmitted(false)
                  }
                >
                  Жауапты өзгерту
                </button>
              </motion.div>
            )}
          </motion.div>
        </section>

        <section className="final-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="final-number">40</span>

            <div className="final-line" />

            <h2>
              Кешіміздің сәні де,
              <br />
              мәні де — сіздермен бірге!
            </h2>

            <p>Талғат & Гаухар</p>

            <span className="final-date">
              06.11.2026
            </span>
          </motion.div>
        </section>
      </main>

      <footer>
        <div>Талғат & Гаухар</div>
        <div>06.11.2026</div>
      </footer>
    </div>
  );
}

function CountdownItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="count-item">
      <strong>
        {String(value).padStart(2, "0")}
      </strong>

      <span>{label}</span>
    </div>
  );
}

function getTimeLeft() {
  const difference =
    EVENT_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

export default App;