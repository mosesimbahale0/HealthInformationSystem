import ThemeToggle from "~/components/theme/ThemeToggle";


export default function Footer() {
  return (
    <>
    <section className="bg-primary">
      <div className="bg-primary  border-t border-tertiary text-center p-4 text-sm text-text  flex flex-row flex-wrap justify-between items-center gap-2 container mx-auto">
        <div className="flex flex-row flex-wrap lg:justify-center items-center gap-4">
          <a
            href="https://www.linkedin.com/in/affable-inc-135493315"
            target="_blank"
            className="bg-secondary hover:bg-accent  hover:text-text  text-text2 rounded-full flex  flex-row items-center justify-center   p-3 text-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5.086 9.711h3.002v9.031H5.086zm1.501-1.233h-.02a1.565 1.565 0 1 1 .04-3.12a1.565 1.565 0 1 1-.02 3.12m12.325 10.264H15.91v-4.83c0-1.215-.434-2.043-1.52-2.043a1.64 1.64 0 0 0-1.54 1.098a2 2 0 0 0-.1.732v5.043h-3c0-.003.04-8.184 0-9.03h3.002v1.28a2.98 2.98 0 0 1 2.705-1.493c1.975 0 3.456 1.291 3.456 4.065v5.178z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20.468 2H3.532a1.45 1.45 0 0 0-1.47 1.433v17.135c.011.8.669 1.442 1.47 1.432h16.936a1.45 1.45 0 0 0 1.47-1.432V3.433A1.45 1.45 0 0 0 20.467 2zM8.088 18.742H5.086V9.711h3.002zM6.833 8.48a2 2 0 0 1-.246-.002h-.02a1.565 1.565 0 1 1 .04-3.12a1.565 1.565 0 0 1 .226 3.122m12.079 10.262H15.91v-4.83c0-1.215-.434-2.043-1.52-2.043a1.64 1.64 0 0 0-1.54 1.098a2.1 2.1 0 0 0-.1.732v5.043h-3c0-.003.04-8.184 0-9.03h3.002v1.28a2.98 2.98 0 0 1 2.705-1.493c1.975 0 3.456 1.291 3.456 4.065v5.178z"
              />
            </svg>
          </a>



          <a
            href="https://x.com/affableinc"
            target="_blank"
            className="bg-secondary hover:bg-accent  hover:text-text  text-text2 rounded-full flex  flex-row items-center justify-center   p-3 text-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"
              />
            </svg>
          </a>





          <a
            href="https://x.com/affableinc"
            target="_blank"
            className="bg-secondary hover:bg-accent  hover:text-text  text-text2 rounded-full flex  flex-row items-center justify-center   p-3 text-sm "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568" /><path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22" /></g></svg>

          </a>





          <div className=" flex flex-row flex-wrap gap-2  ">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-row lg:justify-center  flex-wrap gap-2">
          <span>&copy; {new Date().getUTCFullYear()} Copyright | </span>
          <p className="">HealthInformationSystem</p>
          <span className=""> | All Rights Reserved</span>
        </div>
      </div>
      </section>
    </>
  );
}
