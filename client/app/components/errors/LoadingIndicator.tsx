import { useNavigation, Link } from "@remix-run/react";

export default function LoadingIndicator() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <div className="min h-screen w-screen bg-primary  z-20 fixed bottom-0 left-0 top-0 right-0 flex flex-col justify-around items-center gap-8">
      <div className="flex flex-col gap-12 justify-center items-center text-text2" >

        <section className="flex flex-row items-center gap-2">
          <div className="h-10 w-auto">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block h-10 w-auto dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden h-10 w-auto dark:block"
            />
          </div>

          <p
            className="text-xl lg:text-3xl relative font-extrabold  text-text"
            style={{ fontFamily: "Space Grotesk" }}
          >
            ExpertForms
          </p>
        </section>



        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13c0 2.21.895 4.21 2.343 5.657L4.93 20.07A9.97 9.97 0 0 1 2 13C2 7.477 6.477 3 12 3s10 4.477 10 10a9.97 9.97 0 0 1-2.929 7.071l-1.414-1.414A8 8 0 1 0 4 13m4.707-4.707l4.5 4.5l-1.414 1.414l-4.5-4.5z"/></svg>


        <div className="flex flex-row items-center gap-2 text-text3"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
          <p className="text-sm">Just a moment...</p>
        </div>

        <div className="bg-warning  shadow-md   p-2 flex items-center space-x-2 text-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="none" d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z" /><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z" /></svg>
          <p className="text-xs">
            Thank you for your patience! The Showcase service is hosted on a free instance and might take up to a minute to start if it has been inactive. We apologize for any inconvenience caused.
          </p>
        </div>


      </div>
    </div>
  ) : null;
}

export function CatchBoundary() {
  return (
    <div className="h-screen flex items-center justify-center">
      <p>Error: Something went wrong during navigation.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back home
      </Link>
    </div>
  );
}
