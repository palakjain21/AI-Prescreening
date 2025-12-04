import * as React from "react";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { cn } from "../utils";

// Check Icon for Qualified tab
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// X Icon for Disqualified tab
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EndingMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  faqs?: FAQItem[];
  selectedTab?: "qualified" | "disqualified";
}

const EndingMessage = React.forwardRef<HTMLDivElement, EndingMessageProps>(
  ({ className, message, faqs, selectedTab = "qualified", ...props }, ref) => {
    const defaultMessage = "Thank you for your interest in an exciting career opportunity at Senseloaf. Let's spend the next few minutes getting to know one another to see if there's a current potential fit. Ready to get started?";
    
    const defaultFAQs: FAQItem[] = [
      {
        question: "What happens next?",
        answer: "Your profile will be reviewed and we'll notify you about the next stage."
      },
      {
        question: "When will I hear back?",
        answer: "Within 24-48 hours."
      },
      {
        question: "Will there be another interview?",
        answer: "You may be invited for a technical round or a conversation with the hiring manager."
      }
    ];

    const displayMessage = message || defaultMessage;
    const displayFAQs = faqs || defaultFAQs;
    const isQualified = selectedTab === "qualified";

    return (
      <Card variant="ending" ref={ref} className={cn(className)} {...props}>
        <div className="space-y-6 text-left">
          {/* Badge */}
          <Badge variant="qualified">
            Ending Message
          </Badge>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-gray-200">
            <button
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                isQualified
                  ? "text-green-700 border-green-600"
                  : "text-gray-500 border-transparent"
              )}
              disabled
            >
              <CheckIcon className={cn("h-4 w-4", isQualified ? "text-green-700" : "text-gray-500")} />
              Qualified
            </button>
            <button
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                !isQualified
                  ? "text-red-700 border-red-600"
                  : "text-gray-500 border-transparent"
              )}
              disabled
            >
              <XIcon className={cn("h-4 w-4", !isQualified ? "text-red-700" : "text-gray-500")} />
              Disqualified
            </button>
          </div>

          {/* Message Text */}
          <p className="text-gray-900 text-base leading-relaxed text-left">
            {displayMessage}
          </p>

          {/* FAQ Section */}
          {displayFAQs.length > 0 && (
            <div className="space-y-4 text-left">
              <h3 className="text-sm font-medium text-gray-500 text-left">FAQ's (Optional)</h3>
              <div className="space-y-4 text-left">
                {displayFAQs.map((faq, index) => (
                  <div key={index} className="space-y-1 text-left">
                    <h4 className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

EndingMessage.displayName = "EndingMessage";

export { EndingMessage };

