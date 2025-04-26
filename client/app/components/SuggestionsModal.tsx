import { Dialog, DialogPanel, DialogTitle, } from "@headlessui/react";
import { useState } from "react";

interface SampleText {
    harmful: string[];
    acceptable: string[];
}

const harmfulTexts: SampleText = {
    harmful: [
        "Those [racial slur] Chrome developers are idiots.",
        "You're a moron for writing this article.",
        "You're so hot, I bet you'd love to see my Chrome history.",
        "Vaccines cause more harm than good; it's all a government conspiracy.",
        "I'm going to kill the next person who uses Chrome.",
    ],
    acceptable: [
        "This is a great article! I learned a lot about AI in Chrome.",
        "The AI-powered features in Chrome are really impressive.",
        "I can't wait to see what other AI features Chrome will introduce in the future.",
        "This article provides a clear and concise explanation of Chrome's AI capabilities.",
        "I'm excited to start using these new AI tools to improve my browsing experience.",
    ],
};

export default function SuggestionsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState<string>("");

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess("Copied!");
            // Browser notify
            //Optional notification using Notification API
            // if (Notification.permission === "granted") {
            //     new Notification("Text Copied!", { body: text });
            // } else if (Notification.permission !== "denied") {
            //     Notification.requestPermission().then((permission) => {
            //         if (permission === "granted") {
            //             new Notification("Text Copied!", { body: text });
            //         }
            //     });
            // }

            // Browser.show localhost says
            setIsOpen(false);
            // Browser alert
            // alert("Text Copied!");
            // // Close modal on success copy


            setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
        } catch (error) {
            console.error("Failed to copy text:", error);
            setCopySuccess("Failed to copy");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className=" bg-tertiary  hover:bg-complementary text-text   py-2 px-6 flex flex-row gap-2 justify-center items-center"
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26" /></svg>

                <p className="text-sm"> Suggestions</p>
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm   z-50"
                aria-hidden="true"
            >
                <DialogPanel className="bg-tertiary text-text  shadow-2xl max-w-4xl mx-auto p-6 relative">

                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-danger  text-text font-bold py-2 px-4  absolute top-2 right-2 "
                    >
                        x
                    </button>

                    <DialogTitle className="text-2xl font-medium text-text">
                        Content Examples
                    </DialogTitle>


                    <p className="mt-2 text-sm text-text">
                        Below are examples of harmful and acceptable content. Click "Copy" to copy a specific example.
                    </p>




                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {/* Harmful Content Column */}
                        <div>
                            <h2 className="text-md text-danger mb-2">Harmful Content</h2>
                            <div className="space-y-2 bg-primary divide-y divide-tertiary">
                                {harmfulTexts.harmful.map((text, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center pl-2"
                                    >
                                        <p className="text-text2 text-xs">{text}</p>
                                        <button
                                            onClick={() => handleCopy(text)}
                                            className="px-2 py-4 bg-danger text-text hover:bg-danger text-xs"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Acceptable Content Column */}
                        <div>
                            <h2 className="text-md text-accent mb-2">Acceptable Content</h2>
                            <div className="space-y-2 bg-primary divide-y divide-tertiary">
                                {harmfulTexts.acceptable.map((text, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center pl-2"
                                    >
                                        <p className="text-text2 text-xs">{text}</p>
                                        <button
                                            onClick={() => handleCopy(text)}
                                            className="px-2 py-4 bg-accent text-text hover:bg-complementary text-xs"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>




                    <div className="fixed bottom-0 right-0">
                        {copySuccess && (
                            <p className="mt-4 text-accent text-center text-sm">{copySuccess}</p>
                        )}
                    </div>

                </DialogPanel>
            </Dialog>
        </>
    );
}
