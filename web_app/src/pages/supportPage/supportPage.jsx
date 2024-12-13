import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SettingsIcon from "@mui/icons-material/Settings";
import "./supportPage.scss";

const SupportPage = () => {
  const [faqState, setFaqState] = useState({});

  const toggleFaq = (faqIndex) => {
    setFaqState((prevState) => ({
      ...prevState,
      [faqIndex]: !prevState[faqIndex],
    }));
  };

  const faqs = [
    {
      question: "Question number 1",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Orci faucibus tincidunt at eget rhoncus morbi vestibulum. Turpis mauris et cursus vitae est faucibus a dictum ut.",
    },
    {
      question: "Question number 2",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Aliquam neque laoreet suspendisse interdum consectetur libero id. Egestas erat imperdiet sed euismod nisi porta.",
    },
    {
      question: "Question number 3",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Duis ultrices in odio euismod purus tempus. Risus in hendrerit gravida rutrum quisque non tellus.",
    },
  ];

  return (
    <>
      <div className="content_box">
        <div className="content_box_inner">
          <div className="body_support_page">
            <div className="purple_container_support">
              <h3>Support Resources & Articles</h3>
              <p>What Do You Need Help With ?</p>
              <div className="search_bar_support">
                <input type="text" placeholder="Search for the answer" />
              </div>
            </div>
            <h5>Help Topic</h5>
            <div className="help_topic">
              <div className="topic_container">
                <div className="topic_card_1">
                  <RocketLaunchIcon
                    style={{ fontSize: 50, color: "var(--purple)" }}
                  />
                  <div className="card_support_info">
                    <h6>Getting Started</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_2">
                  <PersonIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>My Account</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_3">
                  <SecurityIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>Copyright & Legal</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_4">
                  <PhoneAndroidIcon
                    style={{ fontSize: 50, color: "var(--purple)" }}
                  />
                  <div className="card_support_info">
                    <h6>Mobile App</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_5">
                  <PersonIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>Developers</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_6">
                  <SettingsIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>Server Setup</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_7">
                  <PhoneAndroidIcon
                    style={{ fontSize: 50, color: "var(--purple)" }}
                  />
                  <div className="card_support_info">
                    <h6>Mobile App</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_8">
                  <PersonIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>Developers</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
                <div className="topic_card_9">
                  <SettingsIcon style={{ fontSize: 50, color: "var(--purple)" }} />
                  <div className="card_support_info">
                    <h6>Server Setup</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Potenti urna arcu sem
                      in massa purus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="need_support">
              <div className="need_support_container">
                <h5>Need Support ?</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Nulla viverra consequat
                  augue nec interdum. Magna adipiscing sollicitudin non cras
                  ultricies. Nec viverra eleifend mollis viverra. Ut nam neque
                  gravida convallis nulla semper ante.
                </p>
                <button className="button_contact">Contact Support</button>
              </div>
            </div>
            <div className="questions_support_container">
              <div className="questions_container">
                <h5>Frequently asked questions</h5>
                <p>Everything you need to know about the product and billing.</p>
                <div className="questions_support">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq_item">
                      <div className="faq_header" onClick={() => toggleFaq(index)}>
                        <h6>{faq.question}</h6>
                        <KeyboardArrowDownIcon
                          style={{
                            color: "var(--purple)",
                            transform: faqState[index]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        />
                      </div>
                      {faqState[index] && (
                        <div className="faq_answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;