import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-black">
        <div className="w-[75%] m-auto">
          <h2 className="text-3xl p-8 leading-normal md:text-5xl font-medium mb-10 sm:mb-6 text-center">
            Resume Builder FAQ
          </h2>
          <div className="dark:bg-black py-8">
            {/* <h2 className="text-3xl leading-normal md:text-5xl font-medium mb-10 sm:mb-6 text-center"></h2> */}

            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>
                  How do I use this Resume Builder?
                </AccordionTrigger>
                <AccordionContent>
                  You can start by filling out the required fields, uploading
                  your details, and choosing a template. Once done, you can
                  preview and download your resume.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Is this resume builder free to use?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, it is completely free. You can create, edit, and download
                  your resume without any charges.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3">
                <AccordionTrigger>
                  Can I download my resume as a PDF?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Once you've customized your resume, click on the
                  "Download" button to save it as a PDF file.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4">
                <AccordionTrigger>
                  Can I use this resume for job applications?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our resumes are designed to be professional and
                  ATS-friendly, making them suitable for job applications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5">
                <AccordionTrigger>Is my data saved securely?</AccordionTrigger>
                <AccordionContent>
                  Yes, we prioritize your privacy. Your data is securely stored
                  and can be deleted anytime.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6">
                <AccordionTrigger>
                  Can I choose different templates?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer multiple templates. You can preview and switch
                  templates before downloading your resume.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7">
                <AccordionTrigger>
                  Can I edit my resume after saving it?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can return anytime, make changes, and download
                  the updated version.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
