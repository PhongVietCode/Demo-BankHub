import { useState } from "react";
import axios from "axios";
import { baseURL } from "../constants";
import Button from "../components/Button";
import RecordCard from "../components/RecordCard";
import EmptyImg from "../assets/empty.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ErrorImg from "../assets/error.png";
import { FaArrowLeft } from "react-icons/fa";
const Detail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/token/detail`)
      .then((response) => {
        setIsLoading(false);
        setData(response.data["transactions"]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const goHomePage = () => {
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  };
  return (
    // https://img.freepik.com/free-vector/abstract-simple-background_53876-99863.jpg?t=st=1718158494~exp=1718162094~hmac=01f9cb40ab5f09ab06ee197ec6de6afc7d2b85076602e141448fbf4fd2d8e2a6&w=2000
    // https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product-plain-studio-background_1258-63900.jpg?t=st=1718157916~exp=1718161516~hmac=bf25529fbee69d0a2453466d27749efcc255febd43330816b70b9f451767b414&w=2000
    // https://img.freepik.com/free-vector/abstract-maze-style-background_1048-16640.jpg?t=st=1718158351~exp=1718161951~hmac=da378936366064a9c456fd33536c4e70e7b6293051236858ebfe76c4d8cbd097&w=1480
    <section className="w-screen h-screen flex space-between flex-row items-center bg-[url('https://img.freepik.com/free-vector/abstract-simple-background_53876-99863.jpg?t=st=1718158494~exp=1718162094~hmac=01f9cb40ab5f09ab06ee197ec6de6afc7d2b85076602e141448fbf4fd2d8e2a6&w=2000')] bg-cover">
      <div
        className="absolute z-10 top-0 flex justify-center items-center m-10 gap-4 backdrop-blur-sm bg-white/10 p-3 rounded-xl cursor-pointer shadow-lg hover:shadow-xl"
        onClick={goHomePage}
      >
        <FaArrowLeft fill="#78ABA8" className="w-[20px] h-[20px]" />
        <div className="font-palanquin text-xl text-slate-gray font-medium">Home</div>
      </div>
      <div className="flex-1 h-screen flex flex-col justify-center items-center">
        <div className=" w-[70%] aspect-video flex flex-col justify-center items-end p-10 backdrop-blur-sm bg-white/20 rounded-xl">
          <div className="text-8xl font-montserrat font-bold text-[#98a3a9] leading-normal">
            Details
          </div>
          <div>
            {isLoading ? (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters
                  fill="#ff6452"
                  className="w-[40px] h-[40px]"
                />
              </div>
            ) : (
              <Button clickHandler={clickHandler} label={"Fetch all records"} />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 max-h-screen justify-center items-center">
        {data?.length == 0 ? (
          <div className="w-full bg-white/20 backdrop-blur-sm">
            <img src={EmptyImg} alt="No record" />
          </div>
        ) : isLoading ? (
          <div className="animate-spin">
            <AiOutlineLoading3Quarters
              fill="#ff6452"
              className="w-[40px] h-[40px]"
            />
          </div>
        ) : data == undefined ? (
          <div className="font-montserrat text-3xl font-bold flex flex-col items-center">
            <img src={ErrorImg} alt="Error img" />
            <span className="text-slate-gray font-montserrat text-sm">
              Try again later
            </span>
          </div>
        ) : (
          data?.map((item, index) => <RecordCard key={index} {...item} />)
        )}
      </div>
    </section>
  );
};

export default Detail;
