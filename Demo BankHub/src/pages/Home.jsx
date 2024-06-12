import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { baseURL } from "../constants";
import { FaArrowCircleRight } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import landingImg from "../assets/landing-img.png";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedicrect] = useState(false);
  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/token`)
      .then((response) => {
        // setSource(response.data);
        const a = document.createElement("a");
        a.href = response.data;
        a.click();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.addEventListener("message", (e) => {
    console.log("have message");
    if (e.origin == "http://localhost:5173") {
      // const link = e.data.content.content;
      // setSource(link);
    }
  });
  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const publicToken = urlParams.get("publicToken");
    if (publicToken) {
      setIsRedicrect(true);
      axios
        .post(`${baseURL}/token`, {
          publicToken: publicToken,
        })
        .then(() => {
          const a = document.createElement("a");
          a.href = "/detail";
          a.click();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      setIsRedicrect(false)
    }
  }, []);
  return (
    <div className="w-screen h-screen flex flex-row items-center bg-[url('https://img.freepik.com/free-vector/abstract-simple-background_53876-99863.jpg?t=st=1718158494~exp=1718162094~hmac=01f9cb40ab5f09ab06ee197ec6de6afc7d2b85076602e141448fbf4fd2d8e2a6&w=2000')]">
      {isRedirect ? (
        <div className="text-center flex-1 text-coral-red font-palanquin font-bold text-3xl leading-normal">Redirecting...</div>
      ) : (
        <>
          <div className="flex-1 flex flex-col items-start justify-center bg-white/20 backdrop-blur-md ml-20 max-xl:ml-10 p-10 rounded-xl">
            <div className="font-montserrat font-medium text-slate-gray text-lg">
              Open Banking Bootcamp Demo
            </div>
            <div className="font-palanquin font-bold text-coral-red text-8xl leading-none">
              Connect to your bank account
            </div>
            <div className="font-montserrat font-medium text-black leading-normal text-lg mt-2">
              Let BankHub help you to be rich..
            </div>
            <div className="mt-6">
              {isLoading ? (
                <div className="animate-spin">
                  <AiOutlineLoading3Quarters
                    fill="#ff6452"
                    className="w-[40px] h-[40px]"
                  />
                </div>
              ) : (
                <Button
                  clickHandler={handleClick}
                  label={"Connect"}
                  icon={<FaArrowCircleRight />}
                />
              )}
            </div>
          </div>
          <div className="flex-1 w-1/2 animate-fadeIn">
            <img src={landingImg} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
