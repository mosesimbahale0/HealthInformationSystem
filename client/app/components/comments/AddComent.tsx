import { useFetcher } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import {
    checkCapabilities,
    createSession,
    promptModel,
} from "~/utils/aiApi";
import SuggestionsModal from "~/components/SuggestionsModal";

interface SuccessResponse {
    success: true;
    comment: any;
}

interface ErrorResponse {
    success: false;
    error: string;
}


type ApiResponse = SuccessResponse | ErrorResponse;

export default function AddComment({
    postId,
    coolName,
}: {
    postId: string;
    coolName: string;
}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef<HTMLFormElement>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isAvailable, setIsAvailable] = useState<string | null>(null);
    const [moderationResult, setModerationResult] = useState<string>("");
    const [isModerationVisible, setIsModerationVisible] = useState(false);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const checkGemini = async () => {
            try {
                const capabilities = await checkCapabilities();
                setIsAvailable(
                    capabilities.available === "readily" ? "Available" : "Unavailable"
                );
            } catch (error) {
                console.error("Error checking Gemini availability:", error);
                setIsAvailable("Error");
            }
        };

        checkGemini();
    }, []);

    const handleModeration = async (): Promise<boolean> => {
        if (isAvailable !== "Available") {
            setModerationResult("Gemini Nano is not available for moderation.");
            setIsModerationVisible(true);
            return false;
        }

        try {
            setModerationResult("Moderation in progress...");
            setIsModerationVisible(true);

            const session = await createSession({
                systemPrompt: "Respond only in English.",
            });

            const prompt = `Check this content: "${content}". Respond only in English with "Yes the content is harmful or inappropriate" if the content is harmful or inappropriate, or "No it is acceptable" if it is acceptable.`;
            const result = await promptModel(session, prompt);

            if (result === "Yes") {
                setModerationResult("Content flagged as inappropriate.");
                return false;
            } else if (result === "No") {
                setModerationResult("Content is acceptable.");
                return true;
            } else {
                setModerationResult(
                    "Unable to determine moderation status. Please refine the input."
                );
                return false;
            }
        } catch (error: any) {
            const errorMessage = error.message.includes("unsupported language")
                ? "Error: The model attempted to use an unsupported language. Please ensure input is clear."
                : "An error occurred during moderation.";
            setModerationResult(errorMessage);
            setIsModerationVisible(true);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isContentAcceptable = await handleModeration();
        if (!isContentAcceptable) {
            alert("Comment not submitted. Content flagged as inappropriate.");
            return;
        }

        fetcher.submit(
            {
                postId,
                sender: coolName,
                text: content,
            },
            { method: "post", action: `/post/${postId}` }
        );
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            const apiResponse = fetcher.data as ApiResponse;

            if (apiResponse.success) {
                formRef.current?.reset();
                setContent("");
                setIsSuccess(true);
                setErrorMessage(null);
                setTimeout(() => setIsSuccess(false), 2000);
            } else if (apiResponse.error) {
                setErrorMessage(apiResponse.error);
                setIsSuccess(false);
            }
        }
    }, [fetcher.state, fetcher.data]);

    const initials = coolName
        ? coolName
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .join("")
        : "A";

    return (
        <div>
            <SuggestionsModal />


            <form
                ref={formRef}
                method="post"
                onSubmit={handleSubmit}
                className="flex flex-row flex-wrap gap-2 items-center text-text mt-2"
            >
                <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-lg text-text">
                    <p className="text-xl">{initials}</p>
                </div>

                <div className="flex flex-col">
                    <textarea
                        name="text"
                        placeholder={`Add your comment, ${coolName}`}
                        className="p-2 border-b border-accent w-full bg-background focus:outline-none focus:border-b-2 min-h-14 max-h-14 h-14 text-xs placeholder-text-text3"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex flex-row gap-2 items-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-complementary p-4 rounded-full text-text text-sm"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Comment"}
                    </button>
                </div>
            </form>



            {isModerationVisible && (
                <div
                    className="p-6 px-8 fixed bottom-2 right-2 bg-background shadow-2xl text-success flex flex-row gap-2 justify-between items-center text-xs"
                    role="alert"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z" /></svg>

                    <div>
                        Proactive  Moderation
                        <div className="text-text">{moderationResult}</div>
                    </div>
                    <button
                        onClick={() => setIsModerationVisible(false)}
                        className="  focus:outline-none bg-tertiary hover:bg-complementary w-8 h-8 rounded-full absolute top-1 right-1 flex items-center justify-center text-text"
                        aria-label="Dismiss moderation result"
                    >
                        X
                    </button>
                </div>
            )}

            {isSuccess && (
                <div
                    className="p-6 fixed bottom-24 right-2 bg-background shadow-2xl text-success flex flex-row gap-2 justify-between items-center"
                    role="alert"
                >
                    <div className="flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 13l5 5l9-11" /></svg>
                        <p className="text-xs">Comment added successfully!</p>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div
                    className="p-6 fixed bottom-24 right-2 bg-background shadow-2xl text-success flex flex-row gap-2 justify-between items-center"
                    role="alert"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10" /></svg>
                    <p className="text-xs">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}


// import { useFetcher } from "@remix-run/react";
// import { useState, useRef, useEffect } from "react";
// import {
//     checkCapabilities,
//     createSession,
//     promptModel,
// } from "~/utils/attempt2Api";

// // import CopyToClipbooard from "~/components/CopyToClipboard";
// import SuggestionsModal from "~/components/SuggestionsModal";

// // Success, Errors types def
// interface SuccessResponse {
//     success: true;
//     comment: any;
// }

// interface ErrorResponse {
//     success: false;
//     error: string;
// }

// type ApiResponse = SuccessResponse | ErrorResponse;

// export default function AddComment({
//     postId,
//     coolName,
// }: {
//     postId: string;
//     coolName: string;
// }) {


//     // MODERATION
//     // ----------------------------------------------------------------------------------------------
//     const [isAvailable, setIsAvailable] = useState<string | null>(null);
//     const [moderationResult, setModerationResult] = useState<string>("");
//     const [content, setContent] = useState<string>("");

//     useEffect(() => {
//         const checkGemini = async () => {
//             try {
//                 const capabilities = await checkCapabilities();
//                 console.log("Gemini Nano capabilities:", capabilities);
//                 setIsAvailable(
//                     capabilities.available === "readily" ? "Available" : "Unavailable"
//                 );
//             } catch (error) {
//                 console.error("Error checking Gemini availability:", error);
//                 setIsAvailable("Error");
//             }
//         };

//         checkGemini();
//     }, []);

//     const handleModeration = async () => {
//         if (isAvailable !== "Available") {
//             setModerationResult("Gemini Nano is not available for moderation.");
//             return;
//         }

//         try {
//             setModerationResult("Moderation in progress...");
//             const session = await createSession({
//                 systemPrompt: "Respond only in English.",
//             });

//             const prompt = `Check this content: "${content}". Respond only in English with "Yes the content is harmful or inappropriate" if the content is harmful or inappropriate, or "No it is acceptable" if it is acceptable.`;
//             const result = await promptModel(session, prompt);

//             // Map the model's response to moderation results
//             if (result === "Yes") {
//                 setModerationResult("Content flagged as inappropriate.");
//             } else if (result === "No") {
//                 setModerationResult("Content is acceptable.");
//             } else {
//                 setModerationResult(
//                     "Unable to determine moderation status. Please refine the input."
//                 );
//             }
//         } catch (error: any) {
//             if (error.message.includes("unsupported language")) {
//                 setModerationResult(
//                     "Error: The model attempted to use an unsupported language. Please ensure input is clear."
//                 );
//             } else {
//                 setModerationResult("An error occurred during moderation.");
//             }
//         }
//     };
//     // -------------------------------------------------------------------------------------------






//     // const fetcher = useFetcher();
//     // const isSubmitting = fetcher.state === "submitting";
//     // const formRef = useRef<HTMLFormElement>(null);
//     // const [isSuccess, setIsSuccess] = useState(false);
//     // const [errorMessage, setErrorMessage] = useState<string | null>(null);

//     // // Handle response from action
//     // useEffect(() => {
//     //     if (fetcher.state === "idle" && fetcher.data) {
//     //         if (fetcher.data.success) {
//     //             formRef.current?.reset(); // Clear the form
//     //             setIsSuccess(true); // Show success message
//     //             setErrorMessage(null); // Clear any previous error
//     //             // Hide success message after a few seconds
//     //             setTimeout(() => setIsSuccess(false), 2000);
//     //         } else if (fetcher.data.error) {
//     //             setErrorMessage(fetcher.data.error); // Display error message
//     //             setIsSuccess(false);
//     //         }
//     //     }
//     // }, [fetcher.state, fetcher.data]);


//     //  Only submit if Content flagged as inappropriate
//     const fetcher = useFetcher();
//     const isSubmitting = fetcher.state === "submitting";
//     const formRef = useRef<HTMLFormElement>(null);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [isModerated, setIsModerated] = useState(false);


//     // Handle response from action
//     useEffect(() => {
//         if (fetcher.state === "idle" && fetcher.data) {
//             const apiResponse = fetcher.data as ApiResponse;
//             if (apiResponse.success) {
//                 formRef.current?.reset(); // Clear the form
//                 setIsSuccess(true); // Show success message
//                 setErrorMessage(null); // Clear any previous error
//                 // Hide success message after a few seconds
//                 setTimeout(() => setIsSuccess(false), 2000);
//             } else if (apiResponse.error) {
//                 setErrorMessage(apiResponse.error); // Display error message
//                 setIsSuccess(false);
//             }
//         }
//     }, [fetcher.state, fetcher.data]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (moderationResult !== "Content is acceptable") {
//             alert("Comment not submitted. Content flagged as inappropriate.");
//             return;
//         }
//         await fetcher.submit();
//     };




//     // Get Name and make Initials
//     const name = coolName;
//     const initials = name
//         ? name
//             .split(" ")
//             .map((n) => n[0].toUpperCase())
//             .join("")
//         : "A";

//     return (
//         <div>
//             <SuggestionsModal />

//             <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Enter content to moderate"
//                 className="bg-background w-full h-32 p-2 mt-4  border-b border-complementary hover:border-b-2 active:border-b-2  active:border-accent hover:border-accent focus:outline-none resize-y"
//             />
//             <button
//                 onClick={handleModeration}
//                 className=" bg-accent  hover:bg-complementary text-text   py-2 px-6 flex flex-row gap-2 justify-center items-center"
//             >
//                 Submit for Moderation
//             </button>
//             {moderationResult && (
//                 <p className="mt-4">
//                     <strong>Moderation Result:</strong> {moderationResult}
//                 </p>
//             )}

//             {/* <fetcher.Form
//                 ref={formRef}
//                 method="post"
//                 className="flex flex-row flex-wrap gap-2 items-center text-text"
//             >
//                 <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-lg text-text">
//                     <p className="text-xl">{initials}</p>
//                 </div>

//                 <input type="hidden" name="postId" value={postId} />
//                 <input type="hidden" name="sender" value={coolName} />

//                 <div className="flex flex-col">
//                     <textarea
//                         name="text"
//                         placeholder={`Add your comment, ${coolName}`} // Concatenates static text with coolName
//                         className="p-2 border-b border-accent w-full bg-background focus:outline-none focus:border-b-2 min-h-14 max-h-14 h-14 text-xs placeholder-text-text3"
//                         required
//                     ></textarea>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="bg-accent hover:bg-complementary p-4  rounded-full text-text text-sm"
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit Comment"}
//                     </button>
//                 </div>
//             </fetcher.Form> */}

//             <form
//                 ref={formRef}
//                 method="post"
//                 onSubmit={handleSubmit}
//                 className="flex flex-row flex-wrap gap-2 items-center text-text"
//             >
//                 <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-lg text-text">
//                     <p className="text-xl">{initials}</p>
//                 </div>

//                 <input type="hidden" name="postId" value={postId} />
//                 <input type="hidden" name="sender" value={coolName} />

//                 <div className="flex flex-col">
//                     <textarea
//                         name="text"
//                         placeholder={`Add your comment, ${coolName}`}
//                         className="p-2 border-b border-accent w-full bg-background focus:outline-none focus:border-b-2 min-h-14 max-h-14 h-14 text-xs placeholder-text-text3"
//                         required
//                     ></textarea>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="bg-accent hover:bg-complementary p-4  rounded-full text-text text-sm"
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit Comment"}
//                     </button>
//                 </div>
//             </form>


//             {/* Show success message */}
//             {isSuccess && (
//                 <div className="fixed bottom-2 left-2 bg-background shadow-2xl text-success p-4 ">
//                     <p className=" text-xs">Comment added successfully!</p>
//                 </div>
//             )}

//             {/* Show error message */}

//             <div className="fixed bottom-2 left-2 bg-danger text-text p-2 ">
//                 {errorMessage && <p className="text-xs">{errorMessage}</p>}
//             </div>
//         </div>
//     );
// }
