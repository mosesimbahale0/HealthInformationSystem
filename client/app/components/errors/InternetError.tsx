
import { Link } from "react-router-dom";

export default function InternetError() {


  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-8 items-center justify-center p-8">
      <div className="  flex flex-row  gap-1 justify-center items-center ">
        <div className="  flex flex-row  gap-2 justify-center items-center outline-none">
          <img alt="logo" src="/assets/logo2.png" className="h-20 w-20" />
        </div>
      </div>



      <p>We apologize for this error</p>



      <div className="text-danger flex flex-row justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 16 16"><path fill="currentColor" d="m6.517 12.271l1.254-1.254Q7.883 11 8 11a1.5 1.5 0 1 1-1.483 1.271m2.945-2.944l.74-.74c.361.208.694.467.987.772a.5.5 0 0 1-.721.693a3.4 3.4 0 0 0-1.006-.725m2.162-2.163l.716-.715q.463.349.87.772a.5.5 0 1 1-.722.692a6.3 6.3 0 0 0-.864-.749M7.061 6.07A6.2 6.2 0 0 0 3.54 7.885a.5.5 0 0 1-.717-.697a7.2 7.2 0 0 1 5.309-2.187zm6.672-1.014l.71-.71q.411.346.786.736a.5.5 0 0 1-.721.692a9 9 0 0 0-.775-.718m-3.807-1.85A9 9 0 0 0 8 3a9 9 0 0 0-6.469 2.734a.5.5 0 1 1-.717-.697A10 10 0 0 1 8 2c.944 0 1.868.131 2.75.382zM8 13a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m-5.424 1a.5.5 0 0 1-.707-.707L14.146 1.146a.5.5 0 0 1 .708.708z" /></svg>
      </div>



      <p className="text-sm ">
        Please try refreshing the page, If the problem persists, please contact
        support
      </p>

      <p className="  text-xs">Error loading this Section!</p>

      <p className="text-xs text-gray-600">Details : Please check your internet connection and try again</p>

      <div className="flex flex-row gap-2">
        <Link
          to="/home"
          className=" bg-white shadow-xl hover:bg-complementary px-10 py-4 rounded-full hover:text-white group inline-flex text-sm"
        >
          Home{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
        <Link
          to="/support"
          className=" bg-accent hover:bg-complementary px-10 py-4 rounded-full text-white group inline-flex text-sm"
        >
          Contact support
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
